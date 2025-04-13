

import { Bell, Settings, Menu, Search } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useSidebar } from "@/context/SidebarContext"
import { useState } from "react"

export default function Header() {
  const { toggleSidebar } = useSidebar()
  const { pathname } = useLocation();
  const [hasNotifications] = useState(true)

  // Get page title based on current path
  const getPageTitle = () => {
    if (pathname === "/") return "Security Dashboard"
    if (pathname === "/websites") return "All Websites"
    if (pathname === "/vulnerabilities") return "Vulnerabilities"
    if (pathname === "/settings") return "Settings"
    return "Security Dashboard"
  }

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 text-slate-500 hover:text-slate-700 transition-colors rounded-full hover:bg-slate-100 md:hidden"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex-1 max-w-xl mx-auto relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button className="relative p-2 text-slate-500 hover:text-slate-700 transition-colors rounded-full hover:bg-slate-100">
            <Bell size={20} />
            {hasNotifications && (
              <span className="absolute top-0 right-0 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                1
              </span>
            )}
          </button>
        </div>

        <div className="relative">
          <button className="p-2 text-slate-500 hover:text-slate-700 transition-colors rounded-full hover:bg-slate-100">
            <Settings size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md">
            A
          </div>
          <div className="hidden md:block">
            <div className="font-medium text-slate-800">Anurag</div>
            <div className="text-xs text-slate-500">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  )
}

