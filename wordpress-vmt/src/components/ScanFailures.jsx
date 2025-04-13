

import { motion } from "framer-motion"

export default function ScanFailures() {
  const failures = [
    { website: "test", date: "2024-03-25 11:14:00 am" },
    { website: "jithintest", date: "2024-03-25 11:14:00 am" },
    { website: "testing.fresh", date: "2024-03-23 8:54:00 am" },
    { website: "test", date: "2024-03-18 11:14:00 am" },
    { website: "jithintest", date: "2024-03-18 11:14:05 am" },
  ]

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Scan Failures</h2>
        <a href="#" className="text-indigo-600 text-sm hover:underline">
          View All
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b">
              <th className="pb-3 font-medium">WEBSITE NAME</th>
              <th className="pb-3 font-medium">DATE</th>
              <th className="pb-3 font-medium">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {failures.map((failure, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border-b last:border-b-0"
              >
                <td className="py-4 text-sm">{failure.website}</td>
                <td className="py-4 text-sm">{failure.date}</td>
                <td className="py-4">
                  <button className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium hover:bg-indigo-200 transition-colors">
                    Retry
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

