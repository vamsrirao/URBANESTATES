import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiMapPin, FiDollarSign } from 'react-icons/fi'
import { MdOutlineHomeWork } from 'react-icons/md'
import { cities, areas, propertyTypes } from '../../data/properties'

export default function SearchForm() {
    const navigate = useNavigate()
    const [location, setLocation] = useState('')
    const [type, setType] = useState('All Types')
    const [maxPrice, setMaxPrice] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        navigate('/properties')
    }

    return (
        <form onSubmit={handleSearch} className="glass-card p-3 flex flex-col md:flex-row gap-3">
            {/* Location */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800/50">
                <FiMapPin className="text-primary-500 text-lg flex-shrink-0" />
                <div className="flex-1">
                    <label className="block text-[10px] font-semibold text-surface-400 uppercase tracking-wider mb-0.5">Location</label>
                    <select
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        className="w-full bg-transparent text-sm font-medium text-surface-900 dark:text-white outline-none cursor-pointer"
                    >
                        {areas.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                </div>
            </div>

            {/* Type */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800/50">
                <MdOutlineHomeWork className="text-primary-500 text-lg flex-shrink-0" />
                <div className="flex-1">
                    <label className="block text-[10px] font-semibold text-surface-400 uppercase tracking-wider mb-0.5">Type</label>
                    <select
                        value={type}
                        onChange={e => setType(e.target.value)}
                        className="w-full bg-transparent text-sm font-medium text-surface-900 dark:text-white outline-none cursor-pointer"
                    >
                        {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800/50">
                <span className="text-primary-500 text-lg flex-shrink-0 font-bold">₹</span>
                <div className="flex-1">
                    <label className="block text-[10px] font-semibold text-surface-400 uppercase tracking-wider mb-0.5">Max Budget</label>
                    <input
                        type="text"
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value)}
                        placeholder="Any Budget"
                        className="w-full bg-transparent text-sm font-medium text-surface-900 dark:text-white outline-none placeholder:text-surface-400"
                    />
                </div>
            </div>

            {/* Search Button */}
            <button type="submit" className="btn-primary flex items-center justify-center gap-2 !rounded-xl min-w-[140px]">
                <FiSearch className="text-lg" />
                <span>Search</span>
            </button>
        </form>
    )
}
