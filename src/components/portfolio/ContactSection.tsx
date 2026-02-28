type ContactSectionProps = {
  headingMain: string
  headingMuted: string
  subtitle: string
  details: Array<{ label: string; value: string; href?: string }>
}

export const ContactSection = ({
  headingMain,
  headingMuted,
  subtitle,
  details,
}: ContactSectionProps) => {
  return (
    <section className="block contact-block">
      <h2>
        <span>{headingMain}</span>
        <span className="muted">{headingMuted}</span>
      </h2>
      <p className="contact-subtitle">{subtitle}</p>

      <div className="contact-detail-grid">
        {details.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.value}
              </a>
            ) : (
              <p>{item.value}</p>
            )}
          </article>
        ))}
      </div>

      {/* <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
        <label>
          <span>Name</span>
          <input type="text" placeholder="Your Name" />
        </label>

        <label>
          <span>Email</span>
          <input type="email" placeholder="Your@email.com" />
        </label>

        <label className="contact-full">
          <span>Budget</span>
          <select defaultValue="">
            <option value="" disabled>
              Select...
            </option>
            <option value="lt-3">&lt;$3k</option>
            <option value="3-5">$3k - $5k</option>
            <option value="5-10">$5k - $10k</option>
            <option value="gt-10">&gt;$10k</option>
          </select>
        </label>

        <label className="contact-full">
          <span>Message</span>
          <textarea placeholder="Message" rows={6} />
        </label>

        <button type="submit" className="contact-submit contact-full">
          Submit
        </button>
      </form> */}
    </section>
  )
}
