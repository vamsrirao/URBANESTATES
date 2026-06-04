/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    200: '#c7d2fe',
                    300: '#a5b4fc',
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                    800: '#3730a3',
                    900: '#312e81',
                    950: '#1e1b4b',
                },
                accent: {
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#7c3aed',
                    700: '#6d28d9',
                    800: '#5b21b6',
                    900: '#4c1d95',
                    950: '#2e1065',
                },
                neon: {
                    blue: '#60a5fa',
                    purple: '#a78bfa',
                    pink: '#f472b6',
                    cyan: '#22d3ee',
                },
                surface: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'system-ui', 'sans-serif'],
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'glow-pulse': 'glowPulse 3s ease-in-out infinite',
                'shimmer': 'shimmer 2.5s linear infinite',
                'gradient-shift': 'gradientShift 8s ease infinite',
                'chatBounce': 'chatBounce 1.2s ease-in-out infinite',
                'chatSlideIn': 'chatSlideIn 0.3s ease-out',
                'chatPulse': 'chatPulse 2s ease-in-out infinite',
                'orb-1': 'orbMove1 12s ease-in-out infinite',
                'orb-2': 'orbMove2 15s ease-in-out infinite',
                'orb-3': 'orbMove3 18s ease-in-out infinite',
                'spin-slow': 'spin 12s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.15)' },
                    '100%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.2), 0 0 60px rgba(139, 92, 246, 0.1)' },
                    '50%': { boxShadow: '0 0 30px rgba(99, 102, 241, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                chatBounce: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-4px)' },
                },
                chatSlideIn: {
                    '0%': { opacity: '0', transform: 'translateY(8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                chatPulse: {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.4)' },
                    '50%': { boxShadow: '0 0 0 12px rgba(99, 102, 241, 0)' },
                },
                orbMove1: {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                },
                orbMove2: {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                    '33%': { transform: 'translate(-40px, 30px) scale(1.15)' },
                    '66%': { transform: 'translate(25px, -35px) scale(0.85)' },
                },
                orbMove3: {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                    '33%': { transform: 'translate(20px, 40px) scale(1.05)' },
                    '66%': { transform: 'translate(-30px, -25px) scale(0.95)' },
                },
            },
        },
    },
    plugins: [],
}
