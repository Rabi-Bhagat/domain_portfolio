export default function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`section-space relative ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}
