

import { motion } from "framer-motion"

export default function UpcomingScans() {
  const scans = [
    {
      frequency: "monthly",
      website: "blog.ja.playstation.com",
      date: "2024-04-23 12:09:05 pm",
    },
    {
      frequency: "monthly",
      website: "test",
      date: "2024-04-17 12:40:00 pm",
    },
    {
      frequency: "weekly",
      website: "sonysandiegostudio",
      date: "2024-04-16 2:18:34 pm",
    },
    {
      frequency: "weekly",
      website: "jithintest",
      date: "2024-04-01 4:44:18 pm",
    },
    {
      frequency: "weekly",
      website: "test",
      date: "2024-04-01 4:44:15 pm",
    },
  ]

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Upcoming Scans</h2>
        <a href="#" className="text-indigo-600 text-sm hover:underline">
          View All
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b">
              <th className="pb-3 font-medium">FREQUENCY</th>
              <th className="pb-3 font-medium">WEBSITE</th>
              <th className="pb-3 font-medium">DATE</th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border-b last:border-b-0"
              >
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      scan.frequency === "monthly" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {scan.frequency}
                  </span>
                </td>
                <td className="py-4 text-sm">{scan.website}</td>
                <td className="py-4 text-sm">{scan.date}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

