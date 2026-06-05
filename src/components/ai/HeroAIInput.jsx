import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiZap } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi'

const SUGGESTION_CHIPS = [
    { label: '2BHK under 50L', icon: '🏠' },
    { label: 'Villas in Madhapur', icon: '🏡' },
    { label: 'Talk to a lawyer', icon: '⚖️' },
    { label: 'Book a visit', icon: '📅' },
]

export default function HeroAIInput({ onResponse, isLoading, setIsLoading }) {
    const [query, setQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef(null)

    const handleSubmit = async (text = query) => {
        const q = text.trim()
        if (!q || isLoading) return

        setIsLoading(true)
        setQuery('')

        try {
            const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/chat`;
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: q }]
                })
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Server error')

            // Try to parse structured response
            let parsed
            try {
                // The AI might wrap JSON in markdown fences
                let cleaned = data.text
                const jsonMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/)
                if (jsonMatch) cleaned = jsonMatch[1]
                parsed = JSON.parse(cleaned.trim())
            } catch {
                // Fallback: treat as plain text
                parsed = { type: 'text', content: data.text }
            }

            onResponse({ query: q, response: parsed })
        } catch (error) {
            onResponse({
                query: q,
                response: { type: 'text', content: `⚠️ ${error.message}. Please make sure the backend is running.` }
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleChipClick = (label) => {
        setQuery(label)
        handleSubmit(label)
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* AI Input Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative"
            >
                {/* Glow Background */}
                <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 opacity-20 blur-xl transition-opacity duration-500 ${isFocused ? 'opacity-40' : 'opacity-20'}`} />

                {/* Input Card */}
                <div className={`relative glass-card-premium transition-all duration-300 ${isFocused ? 'ai-input-glow-focus' : 'ai-input-glow'}`}>
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
                        className="flex items-center gap-3 p-2 sm:p-3"
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex-shrink-0">
                            <HiOutlineSparkles className="w-5 h-5 text-primary-400" />
                        </div>
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Ask about properties, pricing, legal help..."
                            className="flex-1 bg-transparent text-white text-base sm:text-lg placeholder:text-surface-500 outline-none font-sans"
                            disabled={isLoading}
                            id="hero-ai-input"
                        />
                        <button
                            type="submit"
                            disabled={!query.trim() || isLoading}
                            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-105 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                            id="hero-ai-send"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <FiSend className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>

            {/* Suggestion Chips */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6"
            >
                {SUGGESTION_CHIPS.map((chip, idx) => (
                    <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleChipClick(chip.label)}
                        disabled={isLoading}
                        className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.06] border border-white/10 text-sm text-surface-300 hover:text-white hover:bg-white/10 hover:border-primary-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                        id={`chip-${idx}`}
                    >
                        <span className="text-base">{chip.icon}</span>
                        <span className="font-medium">{chip.label}</span>
                    </motion.button>
                ))}
            </motion.div>

            {/* Loading State */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-8 flex items-center justify-center gap-3"
                    >
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce [animation-delay:-0.3s]" />
                            <div className="w-2 h-2 rounded-full bg-accent-400 animate-bounce [animation-delay:-0.15s]" />
                            <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" />
                        </div>
                        <span className="text-sm text-surface-400 font-medium">AI is thinking...</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
