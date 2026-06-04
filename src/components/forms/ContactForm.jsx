import { useState } from 'react'
import { FiSend } from 'react-icons/fi'

export default function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">Full Name</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="input-field"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">Email</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="input-field"
                        required
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">Phone</label>
                    <input
                        type="tel"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                        className="input-field"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">Subject</label>
                    <select
                        value={form.subject}
                        onChange={e => setForm({ ...form, subject: e.target.value })}
                        className="input-field"
                        required
                    >
                        <option value="">Select a subject</option>
                        <option value="buying">Buying a Property</option>
                        <option value="selling">Selling a Property</option>
                        <option value="renting">Renting</option>
                        <option value="general">General Inquiry</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">Message</label>
                <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your needs..."
                    rows={5}
                    className="input-field resize-none"
                    required
                />
            </div>
            <button type="submit" className="btn-primary flex items-center gap-2" disabled={submitted}>
                {submitted ? (
                    <span>✓ Message Sent!</span>
                ) : (
                    <>
                        <FiSend />
                        <span>Send Message</span>
                    </>
                )}
            </button>
        </form>
    )
}
