import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Globe,
  Shield,
  ChevronLeft,
  LogOut,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from "@/context/SidebarContext";

export default function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = (path) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  return (
    <motion.div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white border-r border-slate-200 text-slate-700 flex flex-col transition-all duration-300 ease-in-out relative shadow-sm z-20`}
      initial={{ x: -60 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-white rounded-full p-1 shadow-md z-10 hover:bg-gray-50 transition-colors border border-gray-200"
      >
        <ChevronLeft
          className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
            collapsed ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`p-5 flex items-center ${
          collapsed ? "justify-center" : "gap-3"
        } border-b border-slate-100`}
      >
        <div className="bg-violet-100 rounded-lg p-2 flex-shrink-0">
          <Shield size={20} className="text-violet-600" />
        </div>
        {!collapsed && (
          <span className="font-bold text-lg text-slate-800">
            WordPress VMT
          </span>
        )}
      </div>

      <div className="p-4 mt-4">
        {!collapsed && (
          <p className="text-xs font-medium text-slate-400 uppercase mb-4 pl-3">
            MENU
          </p>
        )}
        <nav className="space-y-1">
          <Link
            to="/dashboard"
            className={`flex items-center ${
              collapsed ? "justify-center" : "gap-3"
            } p-3 rounded-lg transition-colors
              ${
                isActive("/")
                  ? "bg-violet-50 text-violet-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
          >
            <LayoutDashboard size={20} />
            {!collapsed && <span>Dashboard</span>}
          </Link>
          <Link
            to="/dashboard/websites"
            className={`flex items-center ${
              collapsed ? "justify-center" : "gap-3"
            } p-3 rounded-lg transition-colors
              ${
                isActive("/websites")
                  ? "bg-violet-50 text-violet-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
          >
            <Globe size={20} />
            {!collapsed && <span>Websites</span>}
          </Link>
          <Link
            to="/dashboard/vulnerabilities"
            className={`flex items-center ${
              collapsed ? "justify-center" : "gap-3"
            } p-3 rounded-lg transition-colors
              ${
                isActive("/vulnerabilities")
                  ? "bg-violet-50 text-violet-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
          >
            <Shield size={20} />
            {!collapsed && <span>Vulnerabilities</span>}
          </Link>
          <Link
            to="/dashboard/settings"
            className={`flex items-center ${
              collapsed ? "justify-center" : "gap-3"
            } p-3 rounded-lg transition-colors
              ${
                isActive("/settings")
                  ? "bg-violet-50 text-violet-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
          >
            <Settings size={20} />
            {!collapsed && <span>Settings</span>}
          </Link>
        </nav>
      </div>

      {/* Logout button at the bottom */}
      <div className="mt-auto p-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } p-3 w-full rounded-lg text-slate-600 hover:bg-slate-50 transition-colors`}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
  );
}
