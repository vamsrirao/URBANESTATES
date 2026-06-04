import { createContext, useContext, useState, useEffect } from 'react';
import initialProperties from '../data/properties';

// Initial Mock Data for Inquiries and Visits (Used if local storage is empty)
const initialInquiries = [
    { id: 1, propertyId: 1, date: '2024-02-15', status: 'Replied', message: 'Interested in scheduling a private tour of the penthouse. Available this weekend?', sender: 'buyer@test.com' },
    { id: 2, propertyId: 3, date: '2024-02-12', status: 'Pending', message: 'Can you provide more details about the maintenance charges and RERA registration number?', sender: 'buyer@test.com' },
];

const initialVisits = [
    { id: 1, propertyId: 2, date: '2024-02-20', time: '10:00 AM', status: 'Upcoming', user: 'buyer@test.com' },
    { id: 2, propertyId: 4, date: '2024-02-18', time: '2:30 PM', status: 'Completed', user: 'buyer@test.com' },
];

const initialPurchases = [];

const DataContext = createContext(null);

export function DataProvider({ children }) {
    // Load from local storage or fallback to initial data
    const loadState = (key, fallback) => {
        try {
            const stored = localStorage.getItem(`urbanestates_${key}`);
            return stored ? JSON.parse(stored) : fallback;
        } catch (e) {
            return fallback;
        }
    };

    // Global state
    const [properties, setProperties] = useState(() => loadState('properties', initialProperties.map(p => ({ ...p, status: 'Approved' }))));
    const [inquiries, setInquiries] = useState(() => loadState('inquiries', initialInquiries));
    const [visits, setVisits] = useState(() => loadState('visits', initialVisits));
    const [favorites, setFavorites] = useState(() => loadState('favorites', [1, 2, 3])); // Array of property ids
    const [purchases, setPurchases] = useState(() => loadState('purchases', initialPurchases));

    // Save to local storage whenever state changes
    useEffect(() => { localStorage.setItem('urbanestates_properties', JSON.stringify(properties)); }, [properties]);
    useEffect(() => { localStorage.setItem('urbanestates_inquiries', JSON.stringify(inquiries)); }, [inquiries]);
    useEffect(() => { localStorage.setItem('urbanestates_visits', JSON.stringify(visits)); }, [visits]);
    useEffect(() => { localStorage.setItem('urbanestates_favorites', JSON.stringify(favorites)); }, [favorites]);
    useEffect(() => { localStorage.setItem('urbanestates_purchases', JSON.stringify(purchases)); }, [purchases]);

    // PROPERTY ACTIONS
    const addProperty = (newProperty) => {
        setProperties(prev => [{ ...newProperty, id: Date.now(), status: 'Pending' }, ...prev]);
    };

    const updateProperty = (id, updatedFields) => {
        setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    };

    const deleteProperty = (id) => {
        setProperties(prev => prev.filter(p => p.id !== id));
        // Remove from favorites if deleted
        setFavorites(prev => prev.filter(favId => favId !== id));
    };

    const updatePropertyStatus = (id, newStatus) => {
        setProperties(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    };

    // INTERACTION ACTIONS
    const addInquiry = (inquiry) => {
        setInquiries(prev => [{ ...inquiry, id: Date.now(), date: new Date().toISOString().split('T')[0], status: 'Pending' }, ...prev]);
    };

    const addVisit = (visit) => {
        setVisits(prev => [{ ...visit, id: Date.now(), status: 'Upcoming' }, ...prev]);
    };

    const toggleFavorite = (propertyId) => {
        setFavorites(prev => 
            prev.includes(propertyId) ? prev.filter(id => id !== propertyId) : [...prev, propertyId]
        );
    };

    const buyProperty = (purchaseData) => {
        setPurchases(prev => [{ ...purchaseData, id: Date.now(), date: new Date().toISOString().split('T')[0], status: 'Processing' }, ...prev]);
        updatePropertyStatus(purchaseData.propertyId, 'Sold');
    };

    return (
        <DataContext.Provider value={{
            properties, addProperty, updateProperty, deleteProperty, updatePropertyStatus,
            inquiries, addInquiry,
            visits, addVisit,
            favorites, toggleFavorite,
            purchases, buyProperty
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (!context) throw new Error('useData must be used within DataProvider');
    return context;
}
