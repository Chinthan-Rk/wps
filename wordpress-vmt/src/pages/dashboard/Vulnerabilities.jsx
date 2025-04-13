

import { useState } from "react"
import { Search, ExternalLink } from "lucide-react"
import AddVulnerabilityModal from "@/components/AddVulnerabilityModal"

export default function VulnerabilitiesPage() {
  const [selectedItems, setSelectedItems] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data - replace with real data
  const [vulnerabilities, setVulnerabilities] = useState([
    {
      id: 1,
      title: "SQL Injection Vulnerability",
      website: "test",
      url: "http://test.com",
      status: "Present",
      severity: "Medium",
      details: "SQL injection vulnerability in login form",
      impact: "Could allow unauthorized access to database",
      remedy: "Use parameterized queries",
    },
    {
      id: 2,
      title: "XSS Vulnerability",
      website: "test2",
      url: "https://test2.com",
      status: "Fixed",
      severity: "High",
      details: "Cross-site scripting vulnerability in comment section",
      impact: "Could allow attackers to inject malicious scripts",
      remedy: "Implement proper input sanitization",
    },
  ])

  const filteredVulnerabilities = vulnerabilities.filter(
    (vuln) =>
      vuln.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vuln.website.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(filteredVulnerabilities.map((v) => v.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelect = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleDelete = () => {
    // Handle delete functionality
    setVulnerabilities((prev) => prev.filter((vuln) => !selectedItems.includes(vuln.id)))
    setSelectedItems([])
  }

  const handleAddVulnerability = (newVulnerability) => {
    // Generate a new ID (in a real app, this would come from the backend)
    const newId = vulnerabilities.length > 0 ? Math.max(...vulnerabilities.map((v) => v.id)) + 1 : 1

    // Add the new vulnerability to the list
    setVulnerabilities((prev) => [...prev, { ...newVulnerability, id: newId }])

    // Close the modal
    setShowAddModal(false)
  }

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "present":
        return "bg-red-100 text-red-800"
      case "fixed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Vulnerabilities</h1>
        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            disabled={selectedItems.length === 0}
            className={`px-4 py-2 rounded-lg transition-colors
              ${
                selectedItems.length === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-red-100 text-red-600 hover:bg-red-200"
              }`}
          >
            Delete
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Vulnerability
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search vulnerabilities..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={
                      selectedItems.length === filteredVulnerabilities.length && filteredVulnerabilities.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Website
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVulnerabilities.length > 0 ? (
                filteredVulnerabilities.map((vuln) => (
                  <tr key={vuln.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedItems.includes(vuln.id)}
                        onChange={() => handleSelect(vuln.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{vuln.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">{vuln.website}</span>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={vuln.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        {vuln.url}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(vuln.status)}`}
                      >
                        {vuln.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(vuln.severity)}`}
                      >
                        {vuln.severity}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No vulnerabilities found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing 1 to {filteredVulnerabilities.length} of {filteredVulnerabilities.length} vulnerabilities
            </p>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddVulnerabilityModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddVulnerability}
          websites={[
            { name: "test", url: "http://test.com" },
            { name: "test2", url: "https://test2.com" },
          ]}
        />
      )}
    </div>
  )
}

