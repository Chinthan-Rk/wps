

import { motion } from "framer-motion"

export default function ActiveIssues() {
  const issues = [
    { level: "Critical", count: 9, color: "bg-red-500", width: "40%" },
    { level: "High", count: 13, color: "bg-orange-500", width: "60%" },
    { level: "Medium", count: 23, color: "bg-yellow-500", width: "80%" },
  ]

  const websites = [
    {
      name: "blog.ja.playstation.com",
      issues: [
        { level: "critical", count: 6 },
        { level: "high", count: 6 },
        { level: "medium", count: 10 },
      ],
    },
    {
      name: "sonysandiegostudio",
      issues: [
        { level: "critical", count: 2 },
        { level: "high", count: 7 },
        { level: "medium", count: 13 },
      ],
    },
    {
      name: "testing.fresh",
      issues: [
        { level: "critical", count: 1 },
        { level: "high", count: 0 },
        { level: "medium", count: 0 },
      ],
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
        <h2 className="text-lg font-semibold">Active Issues</h2>
        <a href="#" className="text-indigo-600 text-sm hover:underline">
          View All
        </a>
      </div>

      <div className="space-y-6">
        {issues.map((issue) => (
          <div key={issue.level}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">{issue.level}</span>
              <span className="font-semibold">{issue.count}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${issue.color}`}
                initial={{ width: 0 }}
                animate={{ width: issue.width }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        ))}

        <div className="mt-8">
          <h3 className="text-gray-700 mb-4">Issues by Website</h3>
          <div className="space-y-4">
            {websites.map((site) => (
              <div key={site.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-blue-600 flex-1">{site.name}</span>
                <div className="flex gap-1">
                  {site.issues.map((issue, index) => (
                    <div
                      key={index}
                      className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${issue.level === "critical" ? "bg-red-100 text-red-800" : ""}
                        ${issue.level === "high" ? "bg-orange-100 text-orange-800" : ""}
                        ${issue.level === "medium" ? "bg-yellow-100 text-yellow-800" : ""}
                      `}
                    >
                      {issue.count}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

