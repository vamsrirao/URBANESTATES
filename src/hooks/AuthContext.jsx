import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(() => {
        try {
            const stored = localStorage.getItem('urbanestates_auth');
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    });
    const [isLoading, setIsLoading] = useState(true); // Track initial session restoration

    // Sync state to local storage
    useEffect(() => {
        if (auth) {
            localStorage.setItem('urbanestates_auth', JSON.stringify(auth));
        } else {
            localStorage.removeItem('urbanestates_auth');
        }
    }, [auth]);

    // Restore session on mount (verify token is still valid with the backend)
    useEffect(() => {
        const restoreSession = async () => {
            if (!auth?.token) {
                setIsLoading(false);
                return;
            }
            try {
                const res = await fetch('/api/auth/me', {
                    headers: { 'Authorization': `Bearer ${auth.token}` }
                });
                if (res.ok) {
                    const userData = await res.json();
                    setAuth(prev => ({ ...prev, user: userData }));
                } else {
                    // Token invalid or expired — clear session
                    setAuth(null);
                }
            } catch (error) {
                console.error('Session restore failed:', error);
                // Keep existing session on network failure (offline support)
            } finally {
                setIsLoading(false);
            }
        };
        restoreSession();
    }, []); // Run once on mount

    const login = useCallback(async (email, password) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                const session = {
                    user: {
                        _id: data._id,
                        name: data.name,
                        email: data.email,
                        role: data.role,
                        profileImage: data.profileImage
                    },
                    token: data.token
                };
                setAuth(session);
                return { success: true, role: data.role.toLowerCase() };
            } else {
                if (data.verificationPending) {
                    return { success: false, verificationPending: true, email: data.email, message: data.message };
                }
                return { success: false, message: data.message || 'Login failed' };
            }
        } catch (error) {
            return { success: false, message: 'Unable to connect to server. Please check your connection and try again.' };
        }
    }, []);

    const register = useCallback(async (name, email, password, role) => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ name, email, password, role })
            });
            const data = await res.json();

            if (res.ok) {
                if (data.verificationPending) {
                    return { success: true, verificationPending: true, email: data.email };
                }
                const session = {
                    user: {
                        _id: data._id,
                        name: data.name,
                        email: data.email,
                        role: data.role,
                        profileImage: data.profileImage
                    },
                    token: data.token
                };
                setAuth(session);
                return { success: true, role: data.role.toLowerCase() };
            } else {
                if (data.verificationPending) {
                    return { success: false, verificationPending: true, email: data.email, message: data.message };
                }
                return { success: false, message: data.message || 'Registration failed' };
            }
        } catch (error) {
            return { success: false, message: 'Unable to connect to server. Please check your connection and try again.' };
        }
    }, []);

    const verifyEmail = useCallback(async (email, otp) => {
        try {
            const res = await fetch('/api/auth/verify-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, otp })
            });
            const data = await res.json();

            if (res.ok) {
                const session = {
                    user: {
                        _id: data._id,
                        name: data.name,
                        email: data.email,
                        role: data.role,
                        profileImage: data.profileImage
                    },
                    token: data.token
                };
                setAuth(session);
                return { success: true, role: data.role.toLowerCase() };
            } else {
                return { success: false, message: data.message || 'Verification failed' };
            }
        } catch (error) {
            return { success: false, message: 'Unable to connect to server. Please check your connection and try again.' };
        }
    }, []);

    const resendOTP = useCallback(async (email) => {
        try {
            const res = await fetch('/api/auth/resend-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (res.ok) {
                return { success: true, message: data.message || 'Verification code resent successfully!' };
            } else {
                return { success: false, message: data.message || 'Failed to resend code' };
            }
        } catch (error) {
            return { success: false, message: 'Unable to connect to server. Please check your connection and try again.' };
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            // Notify backend to clear cookie
            if (auth?.token) {
                await fetch('/api/auth/logout', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${auth.token}` },
                    credentials: 'include'
                });
            }
        } catch (error) {
            // Logout locally even if server call fails
            console.error('Logout API call failed:', error);
        } finally {
            setAuth(null);
        }
    }, [auth?.token]);

    // Check if user is logged in (optionally checking for specific role)
    const isLoggedIn = useCallback((role) => {
        if (!auth?.user) return false;
        if (role) return auth.user.role.toLowerCase() === role.toLowerCase();
        return true;
    }, [auth?.user]);

    // Helper to get the current user object
    const user = auth?.user || null;
    const token = auth?.token || null;

    return (
        <AuthContext.Provider value={{ auth, user, token, login, register, logout, isLoggedIn, isLoading, verifyEmail, resendOTP }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}
