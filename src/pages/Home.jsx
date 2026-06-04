import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { HiOutlineShieldCheck, HiOutlineCurrencyRupee, HiOutlineHome, HiOutlineUserGroup, HiOutlineSparkles } from 'react-icons/hi'
import PropertyCard from '../components/cards/PropertyCard'
import StatCard from '../components/cards/StatCard'
import TestimonialCard from '../components/cards/TestimonialCard'
import HeroAIInput from '../components/ai/HeroAIInput'
import AIPropertyCard from '../components/ai/AIPropertyCard'
import AIInfoResponse from '../components/ai/AIInfoResponse'
import properties, { testimonials, stats } from '../data/properties'

const features = [
    {
        icon: HiOutlineHome,
        title: 'Curated Listings',
        desc: 'Every property in our portfolio is RERA-verified and hand-selected for quality and investment potential across Telangana.'
    },
    {
        icon: HiOutlineShieldCheck,
        title: 'Verified Agents',
        desc: 'Our network of licensed professionals brings decades of combined Hyderabad market expertise.'
    },
    {
        icon: HiOutlineCurrencyRupee,
        title: 'Best Value',
        desc: 'Data-driven pricing ensures you get the most competitive deals in Hyderabad\'s booming real estate market.'
    },
    {
        icon: HiOutlineUserGroup,
        title: 'Dedicated Support',
        desc: 'From site visits to registration, our team is with you every step of the way.'
    },
]

export default function Home() {
    const featuredProperties = properties.filter(p => p.featured)
    const [carouselIdx, setCarouselIdx] = useState(0)
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true })

    // AI response state
    const [aiResponse, setAiResponse] = useState(null)
    const [aiLoading, setAiLoading] = useState(false)

    const nextSlide = () => setCarouselIdx(prev => (prev + 1) % featuredProperties.length)
    const prevSlide = () => setCarouselIdx(prev => (prev - 1 + featuredProperties.length) % featuredProperties.length)

    const handleAIResponse = (result) => {
        setAiResponse(result)
    }

    // Render AI response based on type
    const renderAIResponse = () => {
        if (!aiResponse) return null
        const { query, response } = aiResponse

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-10 sm:mt-12 max-w-5xl mx-auto w-full"
            >
                {/* Query echo */}
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                        <HiOutlineSparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm text-surface-400 font-medium">
                        Results for: <span className="text-white">"{query}"</span>
                    </span>
                    <button
                        onClick={() => setAiResponse(null)}
                        className="ml-auto text-xs text-surface-500 hover:text-surface-300 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                    >
                        Clear
                    </button>
                </div>

                {/* Property cards */}
                {response.type === 'properties' && response.properties?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {response.properties.map((prop, i) => (
                            <AIPropertyCard key={i} property={prop} index={i} />
                        ))}
                    </div>
                )}

                {/* Info response */}
                {response.type === 'info' && (
                    <AIInfoResponse data={response} />
                )}

                {/* Plain text */}
                {response.type === 'text' && (
                    <AIInfoResponse data={{ title: 'AI Response', content: response.content || response.text || '' }} />
                )}
            </motion.div>
        )
    }

    return (
        <div className="overflow-hidden">
            {/* ═══════ HERO SECTION ═══════ */}
            <section className="relative min-h-screen flex items-center gradient-mesh-bg" id="hero-section">
                {/* Animated Orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] rounded-full bg-primary-500/8 blur-[120px] animate-orb-1" />
                    <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-500/8 blur-[100px] animate-orb-2" />
                    <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full bg-neon-blue/5 blur-[80px] animate-orb-3" />
                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }}
                />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 w-full">
                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-10 sm:mb-12"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-sm text-surface-300 mb-6 backdrop-blur-sm"
                        >
                            <HiOutlineSparkles className="w-4 h-4 text-primary-400" />
                            <span>Powered by AI</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                        </motion.div>
                        <h1 className="heading-xl text-white mb-5 leading-tight max-w-4xl mx-auto">
                            Find Your Dream Property{' '}
                            <br className="hidden sm:block" />
                            <span className="text-gradient">with AI</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-surface-400 max-w-2xl mx-auto leading-relaxed">
                            Search, compare, verify, and book — all in one place
                        </p>
                    </motion.div>

                    {/* AI Input */}
                    <HeroAIInput
                        onResponse={handleAIResponse}
                        isLoading={aiLoading}
                        setIsLoading={setAiLoading}
                    />

                    {/* AI Response Area */}
                    <AnimatePresence>
                        {aiResponse && renderAIResponse()}
                    </AnimatePresence>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
                >
                    <div className="w-1.5 h-3 rounded-full bg-white/40" />
                </motion.div>
            </section>

            {/* ═══════ FEATURED PROPERTIES ═══════ */}
            <section className="section-padding bg-surface-50 dark:bg-surface-900" id="featured-section">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <span className="badge-primary mb-3 inline-block">Featured</span>
                            <h2 className="heading-lg text-surface-900 dark:text-white">
                                Exceptional Properties
                            </h2>
                        </div>
                        <div className="hidden sm:flex gap-2">
                            <button onClick={prevSlide} className="w-11 h-11 rounded-xl glass flex items-center justify-center text-surface-600 dark:text-surface-200 border border-surface-200 dark:border-surface-600 hover:bg-primary-50 dark:hover:bg-primary-900/40 hover:text-primary-600 dark:hover:text-primary-300 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200">
                                <FiChevronLeft className="text-xl" />
                            </button>
                            <button onClick={nextSlide} className="w-11 h-11 rounded-xl glass flex items-center justify-center text-surface-600 dark:text-surface-200 border border-surface-200 dark:border-surface-600 hover:bg-primary-50 dark:hover:bg-primary-900/40 hover:text-primary-600 dark:hover:text-primary-300 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200">
                                <FiChevronRight className="text-xl" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProperties.map((property, index) => (
                            <PropertyCard key={property.id} property={property} index={index} />
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link to="/properties" className="btn-secondary inline-flex items-center gap-2">
                            View All Properties <FiArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════ WHY URBANESTATES ═══════ */}
            <section ref={sectionRef} className="section-padding" id="why-us-section">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="badge-accent mb-3 inline-block">Why Us</span>
                        <h2 className="heading-lg text-surface-900 dark:text-white mb-4">
                            Why Choose <span className="text-gradient">UrbanEstates</span>
                        </h2>
                        <p className="text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
                            We combine technology with personalized service to deliver an unparalleled real estate experience across Hyderabad and Telangana.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass-card p-8 text-center group hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-300"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary-600 group-hover:scale-110 transition-all duration-300">
                                    <feature.icon className="text-2xl text-primary-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-display font-semibold text-surface-900 dark:text-white mb-2">{feature.title}</h3>
                                <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ STATS ═══════ */}
            <section className="py-20 bg-gradient-to-r from-primary-800 via-primary-700 to-accent-700 relative overflow-hidden" id="stats-section">
                <div className="absolute inset-0 opacity-5" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <StatCard key={index} stat={stat} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ TESTIMONIALS ═══════ */}
            <section className="section-padding bg-surface-50 dark:bg-surface-900" id="testimonials-section">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="badge-primary mb-3 inline-block">Testimonials</span>
                        <h2 className="heading-lg text-surface-900 dark:text-white mb-4">
                            What Our Clients Say
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {testimonials.map((testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ CTA ═══════ */}
            <section className="section-padding" id="cta-section">
                <div className="max-w-5xl mx-auto">
                    <div className="glass-card p-12 sm:p-16 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10" />
                        <div className="relative z-10">
                            <h2 className="heading-lg text-surface-900 dark:text-white mb-4">
                                Ready to Find Your <span className="text-gradient">Perfect Home</span>?
                            </h2>
                            <p className="text-surface-500 dark:text-surface-400 mb-8 max-w-xl mx-auto">
                                Start your journey today. Browse our curated collection of properties across Hyderabad or connect with one of our expert agents.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Link to="/properties" className="btn-primary">
                                    Browse Properties
                                </Link>
                                <Link to="/signup" className="btn-secondary text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/40">
                                    Create Account
                                </Link>
                                <Link to="/contact" className="btn-secondary">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
