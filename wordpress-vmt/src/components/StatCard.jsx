

import { motion } from "framer-motion"

export default function StatCard({ icon, title, value, change, subtitle, color }) {
  const iconColors = {
    indigo: "text-indigo-500",
    blue: "text-blue-500",
    red: "text-red-500",
    purple: "text-purple-500",
  }

  const changeColors = {
    positive: "text-emerald-500",
    neutral: "text-gray-500",
    negative: "text-red-500",
  }

  // Determine if change is positive or negative
  const changeType =
    change && change.startsWith("+") ? "positive" : change && change.startsWith("-") ? "negative" : "neutral"

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm overflow-hidden"
      whileHover={{
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        transition: { duration: 0.2 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className={`${iconColors[color]}`}>{icon}</div>
          {change && <span className={`text-sm font-medium ${changeColors[changeType]}`}>{change}</span>}
        </div>

        <div className="mt-4">
          <h3 className="text-4xl font-bold tracking-tight text-gray-900">{value}</h3>
          <p className="mt-1 text-sm font-medium text-gray-500">{title}</p>
          {subtitle && <p className="mt-1 text-xs text-gray-400 truncate">{subtitle}</p>}
        </div>
      </div>
    </motion.div>
  )
}

