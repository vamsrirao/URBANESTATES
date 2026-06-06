import { Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/AuthContext'
import { useData } from '../../../hooks/DataContext'

export default function SellerLayout() {
    const { user } = useAuth()
    const { properties, addProperty, deleteProperty } = useData()

    const myProperties = properties.filter(p => p.ownerEmail === user?.email || (!p.agent && p.id <= 2)) // Show some mock defaults if empty

    const contextValue = {
        user,
        myProperties,
        addProperty,
        deleteProperty
    }

    return (
        <div className="pt-8 pb-16">
            <Outlet context={contextValue} />
        </div>
    )
}
