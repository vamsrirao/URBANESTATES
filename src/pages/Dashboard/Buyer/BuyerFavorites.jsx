import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'
import DashboardHeader from '../../../components/dashboard/DashboardHeader'
import PropertyCard from '../../../components/dashboard/PropertyCard'
import SectionContainer from '../../../components/dashboard/SectionContainer'
import EmptyState from '../../../components/dashboard/EmptyState'

export default function BuyerFavorites() {
    const { favoriteProperties, toggleFavorite } = useOutletContext()

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
        >
            <DashboardHeader 
                title="Favorite Properties" 
                subtitle="Properties you have saved for later."
            />

            <SectionContainer>
                {favoriteProperties.length === 0 ? (
                    <EmptyState 
                        icon={FiHeart}
                        title="No favorites yet"
                        message="Explore properties and click the heart icon to save them here."
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favoriteProperties.map((property, i) => (
                            <motion.div
                                key={property.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <PropertyCard 
                                    property={property} 
                                    isFavorite={true}
                                    onToggleFavorite={toggleFavorite}
                                />
                            </motion.div>
                        ))}
                    </div>
                )}
            </SectionContainer>
        </motion.div>
    )
}
