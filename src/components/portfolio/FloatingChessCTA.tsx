type FloatingChessCTAProps = {
  onActivate: () => void
}

export const FloatingChessCTA = ({ onActivate }: FloatingChessCTAProps) => {
  return (
    <button
      type="button"
      className="floating-chess-cta"
      onClick={onActivate}
      aria-label="Challenge me in chess"
    >
      <span className="floating-chess-cta-icon" aria-hidden="true">
        <img src="https://cdn.simpleicons.org/chessdotcom/FFF1E7" alt="" />
      </span>
      <span className="floating-chess-cta-label">Play a game with me</span>
    </button>
  )
}
