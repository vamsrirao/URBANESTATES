import { motion } from 'framer-motion'
import { FiTarget, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi'

const team = [
    { name: 'Priya Reddy', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300' },
    { name: 'Rahul Sharma', role: 'Head of Sales', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
    { name: 'Sneha Rao', role: 'Lead Agent', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300' },
    { name: 'Vikram Krishnan', role: 'VP Operations', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300' },
]

const values = [
    { icon: FiTarget, title: 'Excellence', desc: 'We pursue the highest standard in every transaction and client interaction across Telangana.' },
    { icon: FiUsers, title: 'Client First', desc: 'Your goals and satisfaction drive everything we do — whether buying a flat or a farmhouse.' },
    { icon: FiAward, title: 'Integrity', desc: 'Full RERA compliance, transparent documentation, and honesty form our foundation.' },
    { icon: FiTrendingUp, title: 'Innovation', desc: 'We leverage technology to deliver smarter real estate solutions in Hyderabad\'s competitive market.' },
]

export default function About() {
    return (
        <div className="pt-24 pb-16">
            {/* Hero */}
            <section className="relative h-[400px] flex items-center mb-16">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920"
                        alt="City skyline"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-surface-950/90 to-surface-900/50" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="badge-primary mb-4 inline-block">About Us</span>
                        <h1 className="heading-xl text-white mb-4">
                            Redefining <span className="text-gradient">Real Estate</span> in Telangana
                        </h1>
                        <p className="text-lg text-surface-300 max-w-2xl">
                            Since 2018, UrbanEstates has been connecting extraordinary families with premium properties across Hyderabad's most sought-after localities.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Story */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="badge-accent mb-3 inline-block">Our Story</span>
                        <h2 className="heading-lg text-surface-900 dark:text-white mb-6">
                            A Vision Born from Passion
                        </h2>
                        <div className="space-y-4 text-surface-600 dark:text-surface-300 leading-relaxed">
                            <p>
                                UrbanEstates was founded with a singular vision: to transform the Hyderabad real estate experience from transactional to transformational. We believe that finding a home is about discovering a lifestyle, and every family deserves a partner who understands that distinction.
                            </p>
                            <p>
                                What began as a boutique agency in Madhapur has grown into a trusted name across all major Hyderabad localities — from Hitech City and Gachibowli to Banjara Hills and Secunderabad. Our success is built on deep market knowledge, genuine client relationships, and RERA-compliant practices.
                            </p>
                            <p>
                                Today, our team of over 85 agents brings combined expertise spanning decades of Telangana real estate transactions, backed by cutting-edge technology and data analytics that ensure our clients make informed decisions.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600"
                            alt="Luxury interior"
                            className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                        />
                        <div className="absolute -bottom-6 -left-6 glass-card p-6 max-w-[240px]">
                            <div className="text-3xl font-display font-bold text-gradient mb-1">7+</div>
                            <p className="text-sm text-surface-600 dark:text-surface-300">Years of trusted excellence in Hyderabad real estate</p>
                        </div>
                    </motion.div>
                </section>

                {/* Values */}
                <section className="mb-24">
                    <div className="text-center mb-12">
                        <span className="badge-primary mb-3 inline-block">Our Values</span>
                        <h2 className="heading-lg text-surface-900 dark:text-white">What Drives Us</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-8 text-center group hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary-600 group-hover:scale-110 transition-all">
                                    <value.icon className="text-2xl text-primary-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-display font-semibold text-surface-900 dark:text-white mb-2">{value.title}</h3>
                                <p className="text-sm text-surface-500 dark:text-surface-400">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Team */}
                <section className="mb-24">
                    <div className="text-center mb-12">
                        <span className="badge-accent mb-3 inline-block">Leadership</span>
                        <h2 className="heading-lg text-surface-900 dark:text-white">Meet Our Team</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card overflow-hidden group"
                            >
                                <div className="h-72 overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-5 text-center">
                                    <h3 className="font-display font-semibold text-surface-900 dark:text-white">{member.name}</h3>
                                    <p className="text-sm text-primary-600 dark:text-primary-400">{member.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
