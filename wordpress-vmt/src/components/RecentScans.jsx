

import { motion } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"

export default function RecentScans() {
  const scans = [
    { type: "Scheduled", website: "sonysandiegostudio", status: "Completed" },
    { type: "Scheduled", website: "test", status: "Failed" },
    { type: "Scheduled", website: "jithintest", status: "Failed" },
    { type: "Scheduled", website: "testing.fresh", status: "Failed" },
    { type: "Scheduled", website: "blog.ja.playstation.com", status: "Completed" },
  ]

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Recent Scans</h2>
        <a href="#" className="text-indigo-600 text-sm hover:underline">
          View All
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b">
              <th className="pb-3 font-medium">SCAN TYPE</th>
              <th className="pb-3 font-medium">WEBSITE</th>
              <th className="pb-3 font-medium">STATUS</th>
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
                <td className="py-4 text-sm">{scan.type}</td>
                <td className="py-4 text-sm">{scan.website}</td>
                <td className="py-4">
                  {scan.status === "Completed" ? (
                    <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium w-fit">
                      <CheckCircle size={14} />
                      <span>Completed</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium w-fit">
                      <XCircle size={14} />
                      <span>Failed</span>
                    </div>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

