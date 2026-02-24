export type ProfileContact = {
  label: string
  value: string
  href?: string
}

type ProfileCardProps = {
  name: string
  image: string
  title: string
  bio: string
  contacts: ProfileContact[]
}

export const ProfileCard = ({ name, image, title, bio, contacts }: ProfileCardProps) => {
  return (
    <aside className="profile-card">
      <div className="curve curve-top" />
      <img className="avatar" src={image} alt={name} />
      <h2>{name}</h2>
      <span className="fire-dot">🔥</span>
      <p className="profile-title">{title}</p>
      <div className="curve curve-mid" />
      <p>{bio}</p>
      <div className="profile-contact-list">
        {contacts.map((item) => (
          <div key={item.label} className="profile-contact-item">
            <span>{item.label}</span>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.value}
              </a>
            ) : (
              <strong>{item.value}</strong>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}
