

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

export default function RecentlyAddedWebsites() {
  const websites = [
    {
      name: "test123",
      url: "https://www.test123.it/",
      date: "2023-11-22 11:52:44 am",
    },
    {
      name: "jithintest",
      url: "https://jithintest.com",
      date: "2023-11-20 4:43:00 pm",
    },
    {
      name: "test",
      url: "https://testrr.com",
      date: "2023-11-20 4:36:14 pm",
    },
    {
      name: "saff",
      url: "https://www.test.com",
      date: "2023-11-20 3:12:23 pm",
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
        <h2 className="text-lg font-semibold">Recently Added Websites</h2>
        <a href="#" className="text-indigo-600 text-sm hover:underline">
          View All
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b">
              <th className="pb-3 font-medium">WEBSITE NAME</th>
              <th className="pb-3 font-medium">WEBSITE URL</th>
              <th className="pb-3 font-medium">DATE</th>
            </tr>
          </thead>
          <tbody>
            {websites.map((website, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border-b last:border-b-0"
              >
                <td className="py-4 text-sm">{website.name}</td>
                <td className="py-4 text-sm">
                  <a
                    href={website.url}
                    className="text-blue-600 flex items-center gap-1 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {website.url}
                    <ExternalLink size={14} />
                  </a>
                </td>
                <td className="py-4 text-sm">{website.date}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

