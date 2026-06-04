export default function SectionContainer({ children, className = '' }) {
    return (
        <section className={`mb-8 ${className}`}>
            {children}
        </section>
    )
}
