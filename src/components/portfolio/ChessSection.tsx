import { useEffect, useMemo, useRef, useState } from 'react'

type Piece = string | null

type Coord = {
  row: number
  col: number
}

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

const pieceSymbols: Record<string, string> = {
  K: '♔',
  Q: '♕',
  R: '♖',
  B: '♗',
  N: '♘',
  P: '♙',
  k: '♚',
  q: '♛',
  r: '♜',
  b: '♝',
  n: '♞',
  p: '♟',
}

const pieceValues: Record<string, number> = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 100,
}

const createInitialBoard = (): Piece[][] => [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
]

type Move = {
  from: Coord
  to: Coord
  piece: string
  captured: Piece
}

const inBounds = (row: number, col: number) => row >= 0 && row < 8 && col >= 0 && col < 8
const isWhite = (piece: string) => piece === piece.toUpperCase()
const toNotation = ({ row, col }: Coord) => `${files[col]}${8 - row}`
const cloneBoard = (board: Piece[][]) => board.map((line) => [...line])

const squareToCoord = (square: string): Coord | null => {
  if (square.length !== 2) return null
  const col = files.indexOf(square[0])
  const rank = Number(square[1])
  if (col < 0 || Number.isNaN(rank) || rank < 1 || rank > 8) return null
  return { row: 8 - rank, col }
}

const boardToFen = (board: Piece[][], sideToMove: 'w' | 'b') => {
  const rows = board.map((row) => {
    let fenRow = ''
    let empty = 0

    for (const piece of row) {
      if (!piece) {
        empty += 1
        continue
      }

      if (empty > 0) {
        fenRow += String(empty)
        empty = 0
      }

      fenRow += piece
    }

    if (empty > 0) fenRow += String(empty)
    return fenRow
  })

  return `${rows.join('/')} ${sideToMove} - - 0 1`
}

const getSlidingMoves = (board: Piece[][], from: Coord, directions: Coord[], whitePiece: boolean): Move[] => {
  const result: Move[] = []

  for (const direction of directions) {
    let row = from.row + direction.row
    let col = from.col + direction.col

    while (inBounds(row, col)) {
      const target = board[row][col]

      if (!target) {
        result.push({ from, to: { row, col }, piece: board[from.row][from.col]!, captured: null })
      } else {
        if (isWhite(target) !== whitePiece) {
          result.push({ from, to: { row, col }, piece: board[from.row][from.col]!, captured: target })
        }
        break
      }

      row += direction.row
      col += direction.col
    }
  }

  return result
}

const getPseudoMovesForPiece = (board: Piece[][], from: Coord): Move[] => {
  const piece = board[from.row][from.col]
  if (!piece) return []

  const lower = piece.toLowerCase()
  const whitePiece = isWhite(piece)
  const dir = whitePiece ? -1 : 1

  if (lower === 'p') {
    const moves: Move[] = []
    const oneStep = from.row + dir
    if (inBounds(oneStep, from.col) && !board[oneStep][from.col]) {
      moves.push({ from, to: { row: oneStep, col: from.col }, piece, captured: null })

      const homeRow = whitePiece ? 6 : 1
      const twoStep = from.row + dir * 2
      if (from.row === homeRow && !board[twoStep][from.col]) {
        moves.push({ from, to: { row: twoStep, col: from.col }, piece, captured: null })
      }
    }

    for (const offset of [-1, 1]) {
      const captureRow = from.row + dir
      const captureCol = from.col + offset
      if (!inBounds(captureRow, captureCol)) continue
      const capturePiece = board[captureRow][captureCol]
      if (capturePiece && isWhite(capturePiece) !== whitePiece) {
        moves.push({ from, to: { row: captureRow, col: captureCol }, piece, captured: capturePiece })
      }
    }

    return moves
  }

  if (lower === 'n') {
    const jumps = [
      { row: -2, col: -1 },
      { row: -2, col: 1 },
      { row: -1, col: -2 },
      { row: -1, col: 2 },
      { row: 1, col: -2 },
      { row: 1, col: 2 },
      { row: 2, col: -1 },
      { row: 2, col: 1 },
    ]

    return jumps
      .map((jump) => ({ row: from.row + jump.row, col: from.col + jump.col }))
      .filter((target) => inBounds(target.row, target.col))
      .filter((target) => {
        const occupant = board[target.row][target.col]
        return !occupant || isWhite(occupant) !== whitePiece
      })
      .map((target) => ({ from, to: target, piece, captured: board[target.row][target.col] }))
  }

  if (lower === 'b') {
    return getSlidingMoves(
      board,
      from,
      [
        { row: 1, col: 1 },
        { row: 1, col: -1 },
        { row: -1, col: 1 },
        { row: -1, col: -1 },
      ],
      whitePiece,
    )
  }

  if (lower === 'r') {
    return getSlidingMoves(
      board,
      from,
      [
        { row: 1, col: 0 },
        { row: -1, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: -1 },
      ],
      whitePiece,
    )
  }

  if (lower === 'q') {
    return getSlidingMoves(
      board,
      from,
      [
        { row: 1, col: 0 },
        { row: -1, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: -1 },
        { row: 1, col: 1 },
        { row: 1, col: -1 },
        { row: -1, col: 1 },
        { row: -1, col: -1 },
      ],
      whitePiece,
    )
  }

  if (lower === 'k') {
    const moves: Move[] = []
    for (let r = -1; r <= 1; r += 1) {
      for (let c = -1; c <= 1; c += 1) {
        if (r === 0 && c === 0) continue
        const row = from.row + r
        const col = from.col + c
        if (!inBounds(row, col)) continue
        const occupant = board[row][col]
        if (!occupant || isWhite(occupant) !== whitePiece) {
          moves.push({ from, to: { row, col }, piece, captured: occupant })
        }
      }
    }
    return moves
  }

  return []
}

const applyMove = (board: Piece[][], move: Move): Piece[][] => {
  const nextBoard = cloneBoard(board)
  nextBoard[move.to.row][move.to.col] = move.piece
  nextBoard[move.from.row][move.from.col] = null

  if (move.piece === 'P' && move.to.row === 0) nextBoard[move.to.row][move.to.col] = 'Q'
  if (move.piece === 'p' && move.to.row === 7) nextBoard[move.to.row][move.to.col] = 'q'

  return nextBoard
}

const isKingInCheck = (board: Piece[][], whiteKing: boolean): boolean => {
  let kingSquare: Coord | null = null

  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const piece = board[row][col]
      if (!piece) continue
      if (piece === (whiteKing ? 'K' : 'k')) {
        kingSquare = { row, col }
        break
      }
    }
    if (kingSquare) break
  }

  if (!kingSquare) return true

  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const piece = board[row][col]
      if (!piece || isWhite(piece) === whiteKing) continue
      const attacks = getPseudoMovesForPiece(board, { row, col })
      if (attacks.some((move) => move.to.row === kingSquare.row && move.to.col === kingSquare.col)) {
        return true
      }
    }
  }

  return false
}

const getLegalMovesForPiece = (board: Piece[][], from: Coord): Move[] => {
  const piece = board[from.row][from.col]
  if (!piece) return []
  const whitePiece = isWhite(piece)

  return getPseudoMovesForPiece(board, from).filter((move) => {
    const nextBoard = applyMove(board, move)
    return !isKingInCheck(nextBoard, whitePiece)
  })
}

const getAllLegalMoves = (board: Piece[][], forWhite: boolean): Move[] => {
  const moves: Move[] = []

  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const piece = board[row][col]
      if (!piece || isWhite(piece) !== forWhite) continue
      moves.push(...getLegalMovesForPiece(board, { row, col }))
    }
  }

  return moves
}

const chooseFallbackAiMove = (board: Piece[][]): Move | null => {
  const aiMoves = getAllLegalMoves(board, false)
  if (aiMoves.length === 0) return null

  let bestMove = aiMoves[0]
  let bestScore = -Number.MAX_SAFE_INTEGER

  for (const move of aiMoves) {
    const nextBoard = applyMove(board, move)
    const humanReplies = getAllLegalMoves(nextBoard, true)
    const captureScore = move.captured ? pieceValues[move.captured.toLowerCase()] * 3 : 0

    let replyPenalty = 0
    for (const reply of humanReplies) {
      if (reply.captured) {
        replyPenalty = Math.max(replyPenalty, pieceValues[reply.captured.toLowerCase()])
      }
    }

    const centralBonus = [3, 4].includes(move.to.row) && [3, 4].includes(move.to.col) ? 0.5 : 0
    const score = captureScore + centralBonus - replyPenalty

    if (score > bestScore || (score === bestScore && Math.random() > 0.5)) {
      bestScore = score
      bestMove = move
    }
  }

  return bestMove
}

const getBestMoveFromStockfish = async (fen: string, depth = 12): Promise<string | null> => {
  const worker = new Worker(
    URL.createObjectURL(
      new Blob(
        [
          "self.importScripts('https://cdn.jsdelivr.net/npm/stockfish@17/src/stockfish-17.1-lite-single.js');",
        ],
        { type: 'application/javascript' },
      ),
    ),
  )

  return new Promise((resolve) => {
    let done = false

    const finish = (value: string | null) => {
      if (done) return
      done = true
      worker.terminate()
      resolve(value)
    }

    const timeout = window.setTimeout(() => finish(null), 7000)

    worker.onmessage = (event: MessageEvent<string>) => {
      const line = event.data
      if (typeof line !== 'string') return

      if (line.startsWith('bestmove')) {
        window.clearTimeout(timeout)
        const bestMove = line.split(' ')[1]
        finish(bestMove && bestMove !== '(none)' ? bestMove : null)
      }
    }

    worker.onerror = () => {
      window.clearTimeout(timeout)
      finish(null)
    }

    worker.postMessage('uci')
    worker.postMessage('isready')
    worker.postMessage(`position fen ${fen}`)
    worker.postMessage(`go depth ${depth}`)
  })
}


type RecentMove = {
  from: Coord
  to: Coord
}

const AI_MOVE_DELAY_MS = 900
const MOVE_ANIMATION_MS = 360
const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

const uciToMove = (board: Piece[][], uci: string): Move | null => {
  const from = squareToCoord(uci.slice(0, 2))
  const to = squareToCoord(uci.slice(2, 4))
  if (!from || !to) return null

  const piece = board[from.row][from.col]
  if (!piece) return null

  const legalMoves = getLegalMovesForPiece(board, from)
  const found = legalMoves.find((move) => move.to.row === to.row && move.to.col === to.col)
  return found ?? null
}

export const ChessSection = () => {
  const [board, setBoard] = useState<Piece[][]>(createInitialBoard)
  const [selected, setSelected] = useState<Coord | null>(null)
  const [moveLog, setMoveLog] = useState<string[]>([])
  const [status, setStatus] = useState('Your turn (White).')
  const [isAiThinking, setIsAiThinking] = useState(false)
  const [recentMove, setRecentMove] = useState<RecentMove | null>(null)
  const gameTokenRef = useRef(0)

  const validTargets = useMemo(() => {
    if (!selected || isAiThinking) return []
    const piece = board[selected.row][selected.col]
    if (!piece || !isWhite(piece)) return []
    return getLegalMovesForPiece(board, selected).map((move) => `${move.to.row}-${move.to.col}`)
  }, [board, selected, isAiThinking])

  const registerMove = (move: Move, actor: 'You' | 'Akash AI') => {
    const captureTag = move.captured ? ` x ${move.captured.toUpperCase()}` : ''
    const label = `${actor}: ${move.piece.toUpperCase()} ${toNotation(move.from)} → ${toNotation(move.to)}${captureTag}`
    setMoveLog((history) => [...history, label])
  }

  const checkEnd = (nextBoard: Piece[][], humanTurn: boolean) => {
    const nextMoves = getAllLegalMoves(nextBoard, humanTurn)
    if (nextMoves.length === 0) {
      const checked = isKingInCheck(nextBoard, humanTurn)
      setStatus(checked ? (humanTurn ? 'Checkmate: Akash AI wins.' : 'Checkmate: You win!') : 'Stalemate.')
      return true
    }

    if (isKingInCheck(nextBoard, humanTurn)) {
      setStatus(humanTurn ? 'Your king is in check.' : 'Akash AI king is in check.')
    }

    return false
  }

  const triggerAiMove = async (nextBoard: Piece[][]) => {
    const token = gameTokenRef.current
    setIsAiThinking(true)
    setStatus('Akash AI is thinking with Stockfish...')

    const fen = boardToFen(nextBoard, 'b')
    const bestMoveUci = await getBestMoveFromStockfish(fen)
    if (token !== gameTokenRef.current) return

    const stockfishMove = bestMoveUci ? uciToMove(nextBoard, bestMoveUci) : null
    const aiMove = stockfishMove ?? chooseFallbackAiMove(nextBoard)

    if (!aiMove) {
      setIsAiThinking(false)
      const aiHasMoves = getAllLegalMoves(nextBoard, false).length > 0
      setStatus(aiHasMoves ? 'Akash AI could not find a legal move.' : 'Game over: You win!')
      return
    }

    setStatus('Akash AI is moving...')
    await sleep(AI_MOVE_DELAY_MS)

    if (token !== gameTokenRef.current) return

    const aiBoard = applyMove(nextBoard, aiMove)
    setBoard(aiBoard)
    setRecentMove({ from: aiMove.from, to: aiMove.to })
    registerMove(aiMove, 'Akash AI')
    setIsAiThinking(false)

    if (!checkEnd(aiBoard, true)) {
      const stockfishNote = bestMoveUci ? '' : ' (fallback AI used)'
      const checkNote = isKingInCheck(aiBoard, true) ? ' You are in check.' : ''
      setStatus(`Your turn (White).${stockfishNote}${checkNote}`)
    }
  }

  const onSquareClick = (row: number, col: number) => {
    if (isAiThinking) return

    const piece = board[row][col]

    if (selected) {
      const legalMoves = getLegalMovesForPiece(board, selected)
      const chosenMove = legalMoves.find((move) => move.to.row === row && move.to.col === col)

      if (chosenMove) {
        const nextBoard = applyMove(board, chosenMove)
        setBoard(nextBoard)
        setSelected(null)
        setRecentMove({ from: chosenMove.from, to: chosenMove.to })
        registerMove(chosenMove, 'You')

        if (checkEnd(nextBoard, false)) return

        void triggerAiMove(nextBoard)
        return
      }
    }

    if (piece && isWhite(piece)) {
      setSelected({ row, col })
      setStatus('Select a legal destination square.')
    } else {
      setSelected(null)
      setStatus('Illegal move blocked. Choose one of the highlighted legal squares.')
    }
  }

  const resetGame = () => {
    gameTokenRef.current += 1
    setBoard(createInitialBoard())
    setSelected(null)
    setMoveLog([])
    setStatus('Your turn (White).')
    setIsAiThinking(false)
    setRecentMove(null)
  }

  useEffect(() => {
    if (!recentMove) return

    const timer = window.setTimeout(() => setRecentMove(null), MOVE_ANIMATION_MS)
    return () => window.clearTimeout(timer)
  }, [recentMove])

  useEffect(() => {
    return () => {
      gameTokenRef.current += 1
    }
  }, [])

  return (
    <section className="block chess-block">
      <h2>
        CHESS <span className="muted">ARENA</span>
      </h2>
      <p>Play as White against Akash AI (Black powered by Stockfish). Illegal moves are blocked for both sides and every legal move is tracked below.</p>

      <div className="chess-shell">
        <div className="chess-board" role="grid" aria-label="Chess board">
          {board.map((rank, row) =>
            rank.map((square, col) => {
              const isDark = (row + col) % 2 === 1
              const isPicked = selected?.row === row && selected?.col === col
              const canMove = validTargets.includes(`${row}-${col}`)
              const pieceTone = square ? (isWhite(square) ? 'piece-white' : 'piece-black') : ''
              const isRecentTarget = recentMove?.to.row === row && recentMove.to.col === col
              const isRecentOrigin = recentMove?.from.row === row && recentMove.from.col === col
              return (
                <button
                  key={`${row}-${col}`}
                  type="button"
                  className={`chess-square ${isDark ? 'dark' : 'light'} ${isPicked ? 'selected' : ''} ${canMove ? 'target' : ''} ${isRecentOrigin ? 'moved-from' : ''} ${isRecentTarget ? 'moved-to' : ''}`}
                  onClick={() => onSquareClick(row, col)}
                  aria-label={`${toNotation({ row, col })} ${square ? `contains ${square}` : 'empty'}`}
                >
                  {square ? <span className={`chess-piece ${pieceTone} ${isRecentTarget ? 'moved' : ''}`}>{pieceSymbols[square]}</span> : ''}
                </button>
              )
            }),
          )}
        </div>

        <aside className="chess-panel">
          <div className="chess-status">{status}</div>
          <button type="button" className="contact-submit" onClick={resetGame}>
            Restart game
          </button>
          <h3>Moves</h3>
          <ol>
            {moveLog.length === 0 ? <li>Start by moving any white piece.</li> : null}
            {moveLog.map((move, index) => (
              <li key={`${index}-${move}`}>{move}</li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  )
}
