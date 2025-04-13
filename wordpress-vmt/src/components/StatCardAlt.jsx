

import { motion } from "framer-motion"

export default function StatCardAlt({ icon, title, value, change, subtitle, color }) {
  const gradients = {
    indigo: "from-indigo-500 to-indigo-600",
    blue: "from-blue-500 to-blue-600",
    red: "from-red-500 to-red-600",
    purple: "from-purple-500 to-purple-600",
  }

  return (
    <motion.div
      className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={`bg-gradient-to-r ${gradients[color]} p-6 text-white`}>
        <div className="flex justify-between items-center mb-4">
          <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">{icon}</div>
          {change && (
            <div className="bg-white/20 text-white text-sm font-medium px-2 py-1 rounded-full backdrop-blur-sm">
              {change}
            </div>
          )}
        </div>
        <div className="text-3xl font-bold tracking-tight mb-1">{value}</div>
        <div className="text-sm text-white/80">{title}</div>
      </div>
      {subtitle && (
        <div className="bg-white p-3 border-t border-gray-100">
          <div className="text-xs text-gray-500 truncate">{subtitle}</div>
        </div>
      )}
    </motion.div>
  )
}

