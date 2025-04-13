
import { motion } from "framer-motion"

export default function StatCardModern({ icon, title, value, change, subtitle, color }) {
  const colors = {
    indigo: "border-indigo-500 text-indigo-600",
    blue: "border-blue-500 text-blue-600",
    red: "border-red-500 text-red-600",
    purple: "border-purple-500 text-purple-600",
  }

  const bgColors = {
    indigo: "bg-indigo-50",
    blue: "bg-blue-50",
    red: "bg-red-50",
    purple: "bg-purple-50",
  }

  return (
    <motion.div
      className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 ${colors[color]}`}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${bgColors[color]}`}>{icon}</div>
        {change && (
          <div className="bg-green-50 text-green-600 text-sm font-medium px-3 py-1 rounded-full">{change}</div>
        )}
      </div>

      <div>
        <div className="text-3xl font-bold tracking-tight mb-1">{value}</div>
        <div className="text-sm text-gray-500">{title}</div>
        {subtitle && <div className="text-xs text-gray-400 truncate mt-2 max-w-[200px]">{subtitle}</div>}
      </div>
    </motion.div>
  )
}

