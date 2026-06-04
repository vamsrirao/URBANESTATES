import { Outlet } from 'react-router-dom'

export default function AgentLayout() {
    return (
        <div className="bg-[#050816] text-white min-h-screen">
            <Outlet />
        </div>
    )
}
