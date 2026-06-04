import { Link } from 'react-router-dom'
import { MdApartment } from 'react-icons/md'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const footerLinks = {
    'Explore': [
        { label: 'Properties', path: '/properties' },
        { label: 'Map View', path: '/map' },
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contact' },
    ],
    'Dashboards': [
        { label: 'Seller Dashboard', path: '/login/seller' },
        { label: 'Buyer Dashboard', path: '/login/buyer' },
        { label: 'Agent Dashboard', path: '/login/agent' },
        { label: 'Lawyer Dashboard', path: '/login/lawyer' },
    ],
    'Legal & Services': [
        { label: 'Our Lawyers', path: '/lawyers' },
        { label: 'Schedule Visit', path: '/schedule-visit' },
        { label: 'Property Verification', path: '/lawyers' },
        { label: 'RERA Compliance', path: '/lawyers' },
    ],
}

const socials = [
    { icon: FaFacebookF, href: '#' },
    { icon: FaTwitter, href: '#' },
    { icon: FaInstagram, href: '#' },
    { icon: FaLinkedinIn, href: '#' },
]

export default function Footer() {
    return (
        <footer className="bg-surface-900 dark:bg-black text-surface-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                {/* Top */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                                <MdApartment className="text-white text-xl" />
                            </div>
                            <span className="text-xl font-display font-bold text-white">
                                Urban<span className="text-primary-400">Estates</span>
                            </span>
                        </Link>
                        <p className="text-surface-400 text-sm leading-relaxed mb-6 max-w-sm">
                            Discover extraordinary properties across Hyderabad and Telangana. UrbanEstates connects discerning buyers with premium homes in the city's finest localities.
                        </p>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3">
                                <FiMapPin className="text-primary-400" />
                                <span>Plot 42, Hitech City Main Road, Madhapur, Hyderabad 500081</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FiPhone className="text-primary-400" />
                                <span>+91 40 6677 8899</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FiMail className="text-primary-400" />
                                <span>hello@urbanestates.in</span>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-white font-semibold mb-4">{title}</h4>
                            <ul className="space-y-3">
                                {links.map(link => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.path}
                                            className="text-sm text-surface-400 hover:text-primary-400 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="border-t border-surface-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-surface-500">
                        © {new Date().getFullYear()} UrbanEstates. All rights reserved. RERA Registered.
                    </p>
                    <div className="flex items-center gap-3">
                        {socials.map((s, i) => (
                            <a
                                key={i}
                                href={s.href}
                                className="w-9 h-9 rounded-lg bg-surface-800 hover:bg-primary-600 flex items-center justify-center text-surface-400 hover:text-white transition-all duration-200"
                            >
                                <s.icon className="text-sm" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
