export type NavItem = {
  label: string
  path: string
}

type TopNavProps = {
  items: NavItem[]
  activePath: string
  onNavigate: (path: string) => void
}

export const TopNav = ({ items, activePath, onNavigate }: TopNavProps) => {
  return (
    <header className="top-nav">
      {items.map((item) => (
        <a
          key={item.path}
          href={item.path}
          className={`top-nav-link ${activePath === item.path ? 'active' : ''}`}
          onClick={(event) => {
            event.preventDefault()
            onNavigate(item.path)
          }}
        >
          {item.label}
        </a>
      ))}
    </header>
  )
}
