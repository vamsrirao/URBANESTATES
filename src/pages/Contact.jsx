import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'
import ContactForm from '../components/forms/ContactForm'

const contactInfo = [
    { icon: FiMapPin, title: 'Visit Us', lines: ['Plot 42, Hitech City Main Road', 'Madhapur, Hyderabad 500081'] },
    { icon: FiPhone, title: 'Call Us', lines: ['+91 40 6677 8899', '+91 98765 43210'] },
    { icon: FiMail, title: 'Email Us', lines: ['hello@urbanestates.in', 'support@urbanestates.in'] },
    { icon: FiClock, title: 'Working Hours', lines: ['Mon–Sat: 9:30 AM – 7:00 PM', 'Sunday: 10:00 AM – 4:00 PM'] },
]

export default function Contact() {
    return (
        <div className="pt-24 pb-16">
            {/* Hero */}
            <section className="relative h-[300px] flex items-center mb-16">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920"
                        alt="Office"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-surface-950/90 to-surface-900/50" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="badge-primary mb-4 inline-block">Contact</span>
                        <h1 className="heading-xl text-white">Get in Touch</h1>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {contactInfo.map((info, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-6 text-center"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                                <info.icon className="text-xl text-primary-600 dark:text-primary-400" />
                            </div>
                            <h3 className="font-display font-semibold text-surface-900 dark:text-white mb-2">{info.title}</h3>
                            {info.lines.map((line, j) => (
                                <p key={j} className="text-sm text-surface-500 dark:text-surface-400">{line}</p>
                            ))}
                        </motion.div>
                    ))}
                </div>

                {/* Form + Map */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="heading-md text-surface-900 dark:text-white mb-2">Send Us a Message</h2>
                        <p className="text-surface-500 dark:text-surface-400 mb-8">
                            Have a question about a property or our services? We'd love to hear from you.
                        </p>
                        <ContactForm />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card overflow-hidden h-[500px]"
                    >
                        <iframe
                            src="https://www.openstreetmap.org/export/embed.html?bbox=78.34%2C17.40%2C78.42%2C17.48&layer=mapnik&marker=17.4435%2C78.3772"
                            className="w-full h-full border-0"
                            title="UrbanEstates Office — Hitech City, Hyderabad"
                            loading="lazy"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
