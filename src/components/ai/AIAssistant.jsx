import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMinimize2 } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import AIPropertyCard from './AIPropertyCard';
import AIInfoResponse from './AIInfoResponse';

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', content: "Hello! I'm your UrbanEstates AI Assistant. How can I help you with your property journey today?" }
    ]);
    const [inputFocus, setInputFocus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // Try to parse a model response as JSON
    const parseAIResponse = (text) => {
        try {
            let cleaned = text;
            const jsonMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
            if (jsonMatch) cleaned = jsonMatch[1];
            const parsed = JSON.parse(cleaned.trim());
            return parsed;
        } catch {
            return null;
        }
    };

    const handleSend = async (text = inputFocus) => {
        if (!text.trim() || isLoading) return;

        const userMsg = { role: 'user', content: text.trim() };
        const updatedHistory = [...messages, userMsg];

        setMessages(updatedHistory);
        setInputFocus('');
        setIsLoading(true);

        try {
            const apiHistory = updatedHistory[0].role === 'model' ? updatedHistory.slice(1) : updatedHistory;

            const res = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: apiHistory })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Server responded with an error');
            }

            setMessages([...updatedHistory, { role: 'model', content: data.text }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages([...updatedHistory, {
                role: 'model',
                content: `⚠️ Error: ${error.message}. Please ensure the backend server is running and the API key is configured.`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const QUICK_ACTIONS = [
        { label: "Find premium properties", icon: "🏠" },
        { label: "Talk to a lawyer", icon: "⚖️" },
        { label: "How do I book a visit?", icon: "📅" }
    ];

    // Render a message bubble with structured content support
    const renderMessageContent = (msg) => {
        if (msg.role === 'user') {
            return <span>{msg.content}</span>;
        }

        // Try structured parsing for model messages
        const parsed = parseAIResponse(msg.content);

        if (parsed?.type === 'properties' && parsed.properties?.length > 0) {
            return (
                <div className="space-y-3">
                    {parsed.title && (
                        <p className="text-sm text-surface-200 font-medium mb-2">{parsed.title}</p>
                    )}
                    <div className="space-y-3">
                        {parsed.properties.slice(0, 3).map((prop, i) => (
                            <AIPropertyCard key={i} property={prop} index={i} />
                        ))}
                    </div>
                </div>
            );
        }

        if (parsed?.type === 'info') {
            return <AIInfoResponse data={parsed} />;
        }

        // Default: plain text
        return <span className="whitespace-pre-wrap">{msg.content}</span>;
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="mb-4 w-[360px] sm:w-[420px] h-[600px] max-h-[80vh] flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary-500/15"
                        style={{ background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)' }}
                    >
                        {/* ─── Header ─── */}
                        <div className="relative px-5 py-4 flex items-center justify-between overflow-hidden">
                            {/* Header gradient bg */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-500 opacity-90" />
                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />

                            <div className="relative flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <HiOutlineSparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold font-display text-white leading-tight text-base">UrbanAI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <p className="text-[10px] text-white/70 uppercase tracking-widest leading-tight">Online</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="relative p-2 hover:bg-white/20 rounded-xl transition-colors"
                            >
                                <FiMinimize2 className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        {/* ─── Chat Area ─── */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[88%] text-sm leading-relaxed ${
                                        msg.role === 'user'
                                            ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white p-3.5 rounded-2xl rounded-tr-md shadow-lg shadow-primary-500/20'
                                            : 'bg-white/[0.05] border border-white/[0.08] text-surface-200 p-3.5 rounded-2xl rounded-tl-md'
                                    }`}>
                                        {renderMessageContent(msg)}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/[0.05] border border-white/[0.08] py-3.5 px-5 rounded-2xl rounded-tl-md flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* ─── Input Area ─── */}
                        <div className="p-3 border-t border-white/[0.06]">
                            {/* Quick Actions */}
                            {messages.length === 1 && (
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {QUICK_ACTIONS.map((action, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSend(action.label)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium rounded-full bg-white/[0.06] border border-white/10 text-surface-400 hover:text-white hover:bg-white/10 hover:border-primary-500/30 transition-all duration-200"
                                        >
                                            <span>{action.icon}</span>
                                            <span>{action.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="relative flex items-center"
                            >
                                <input
                                    type="text"
                                    value={inputFocus}
                                    onChange={(e) => setInputFocus(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder="Ask anything about properties..."
                                    className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder:text-surface-500 outline-none transition-all duration-200 ${
                                        isFocused
                                            ? 'border-primary-500/40 shadow-[0_0_20px_rgba(99,102,241,0.1)]'
                                            : 'border-white/[0.08]'
                                    }`}
                                    disabled={isLoading}
                                    id="chatbot-input"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputFocus.trim() || isLoading}
                                    className="absolute right-1.5 p-2.5 rounded-lg bg-gradient-to-r from-primary-600 to-accent-500 text-white transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/30 disabled:opacity-30 disabled:cursor-not-allowed"
                                    id="chatbot-send"
                                >
                                    <FiSend className="w-3.5 h-3.5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── Floating Action Button ─── */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="relative p-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-2xl shadow-2xl shadow-primary-500/30 border border-white/10 flex items-center justify-center group"
                    id="chatbot-fab"
                >
                    {/* Glow ring */}
                    <div className="absolute inset-0 rounded-2xl animate-chatPulse" />
                    <HiOutlineSparkles className="w-6 h-6 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                </motion.button>
            )}
        </div>
    );
}
