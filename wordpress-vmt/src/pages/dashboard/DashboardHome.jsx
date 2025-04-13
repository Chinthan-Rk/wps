import { motion } from "framer-motion";
import {
  Shield,
  Globe,
  Activity,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ExternalLink,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/dashboardService";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null); // State to hold dashboard data

  // Call the getDashboardData service function to fetch dashboard data
  useEffect(() => {
    getDashboardData()
      .then((res) => {
        setDashboardData(res);
      })
      .catch((err) => {
        console.error("Dashboard API error:", err);
      });
  }, []);

  const total =
    (dashboardData?.critical_vulnerabilities_count || 0) +
    (dashboardData?.high_vulnerabilities_count || 0) +
    (dashboardData?.medium_vulnerabilities_count || 0);

  const issuesByLevel = [
    {
      level: "Critical",
      count: dashboardData?.critical_vulnerabilities_count || 0,
      percentage: total
        ? Math.round(
            (dashboardData.critical_vulnerabilities_count / total) * 100
          )
        : 0,
    },
    {
      level: "High",
      count: dashboardData?.high_vulnerabilities_count || 0,
      percentage: total
        ? Math.round((dashboardData.high_vulnerabilities_count / total) * 100)
        : 0,
    },
    {
      level: "Medium",
      count: dashboardData?.medium_vulnerabilities_count || 0,
      percentage: total
        ? Math.round((dashboardData.medium_vulnerabilities_count / total) * 100)
        : 0,
    },
  ];

  const websiteIssues =
    dashboardData?.websites_vulnerability_summary?.map((site) => ({
      name: site.website_name,
      issues: [
        { level: "critical", count: site.severity.Critical },
        { level: "high", count: site.severity.High },
        { level: "medium", count: site.severity.Medium },
      ],
    })) || [];

  const recentScans =
    dashboardData?.recent_scans?.map((scan) => ({
      type: scan.scan_type,
      website: scan.website_name,
      status: scan.scan_status,
      time: new Date(scan.start_time).toLocaleString(), // or use a “time ago” library
    })) || [];

  const upcomingScans =
    dashboardData?.upcoming_scans?.map((scan) => ({
      frequency: scan.frequency,
      website: scan.website_name,
      date: new Date(scan.scan_schedule_date).toLocaleString(),
    })) || [];

  const scanFailures =
    dashboardData?.failed_scans?.map((scan) => ({
      website: scan.website_name,
      date: new Date(scan.start_time).toLocaleString(),
    })) || [];

  const severityTableData =
    dashboardData?.websites_vulnerability_summary?.map((site) => ({
      name: site.website_name,
      last_scan: site.last_scan,
      issues: [
        { level: "critical", count: site.severity.Critical },
        { level: "high", count: site.severity.High },
        { level: "medium", count: site.severity.Medium },
      ],
    })) || [];
  const recentlyAddedWebsites =
    dashboardData?.recently_added_websites?.map((site) => ({
      name: site.website_name,
      url: site.website_url,
      date: new Date(site.date).toLocaleDateString(),
    })) || [];

  const security = dashboardData?.security_overview;

  const overallRisk = security?.overall_risk_level || "--";
  const websitesAffected = security?.websites_affected || "--";
  const lastAssessment = security?.last_assessment
    ? new Date(security.last_assessment).toLocaleString()
    : "--";

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  return (
    <div className="p-6 bg-slate-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-800">
          Security Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Monitor and manage your WordPress security
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-100"
        >
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Total Websites
                </p>
                <h3 className="text-4xl font-bold mt-2 text-slate-800">
                  {dashboardData?.total_websites_count ?? "--"}
                </h3>
                <div className="flex items-center mt-2 text-emerald-600 text-sm">
                  <TrendingUp size={16} className="mr-1" />
                  <span>+2 this month</span>
                </div>
              </div>
              <div className="bg-violet-100 p-3 rounded-xl">
                <Globe className="h-6 w-6 text-violet-600" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeIn}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-100"
        >
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Completed Scans
                </p>
                <h3 className="text-4xl font-bold mt-2 text-slate-800">
                  {dashboardData?.total_completed_scans_count ?? "--"}
                </h3>
                <div className="flex items-center mt-2 text-emerald-600 text-sm">
                  <TrendingUp size={16} className="mr-1" />
                  <span>+12 this week</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeIn}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-100"
        >
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Total Issues
                </p>
                <h3 className="text-4xl font-bold mt-2 text-slate-800">
                  {dashboardData?.total_active_vulnerabilities_count ?? "--"}
                </h3>
                <div className="flex items-center mt-2 text-rose-600 text-sm">
                  <TrendingUp size={16} className="mr-1" />
                  <span>+5 new issues</span>
                </div>
              </div>
              <div className="bg-rose-100 p-3 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-rose-600" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeIn}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-100"
        >
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm font-medium">Next Scan</p>
                <h3 className="text-4xl font-bold mt-2 text-slate-800">
                  {dashboardData?.upcoming_scans?.[0]?.scan_schedule_date
                    ? new Date(
                        dashboardData.upcoming_scans[0].scan_schedule_date
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "--"}
                </h3>
                <p className="text-slate-500 text-sm mt-2 truncate max-w-[180px]">
                  {dashboardData?.upcoming_scans?.[0]?.website_name ?? "--"}
                </p>
              </div>
              <div className="bg-violet-100 p-3 rounded-xl">
                <Calendar className="h-6 w-6 text-violet-600" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Combined Issues & Activity Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-12 bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="text-slate-400" size={20} />
                <h2 className="text-lg font-bold text-slate-800">
                  Security Overview
                </h2>
              </div>
              <Link
                to="#"
                className="text-violet-600 text-sm font-medium hover:text-violet-700 flex items-center"
              >
                View Details <span className="ml-1">→</span>
              </Link>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left column - Issue Summary */}
              <div className="lg:col-span-4 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-4">
                    Issue Distribution
                  </h3>
                  {issuesByLevel.map((issue, index) => (
                    <div key={issue.level} className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full mr-2 ${
                              issue.level === "Critical"
                                ? "bg-rose-500"
                                : issue.level === "High"
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                          ></div>
                          <span className="text-sm font-medium text-slate-700">
                            {issue.level}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-800">
                            {issue.count}
                          </span>
                          <span className="text-xs text-slate-500">
                            ({issue.percentage}%)
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${
                            issue.level === "Critical"
                              ? "bg-rose-500"
                              : issue.level === "High"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${issue.percentage}%` }}
                          transition={{ duration: 1, delay: 0.3 + index * 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-violet-50 rounded-xl p-4">
                  <h3 className="text-sm font-medium text-violet-800 mb-3">
                    Security Status
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-600">
                      Overall Risk Level
                    </span>
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                      {overallRisk}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-600">
                      Websites Affected
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      {websitesAffected}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      Last Assessment
                    </span>
                    <span className="text-sm text-slate-800">
                      {lastAssessment}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle column - Top Affected Websites */}
              <div className="lg:col-span-4">
                <h3 className="text-sm font-medium text-slate-700 mb-4">
                  Top Affected Websites
                </h3>
                <div className="space-y-3">
                  {websiteIssues.map((site) => (
                    <div
                      key={site.name}
                      className="bg-slate-50 rounded-xl p-3 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-violet-100 p-2 rounded-lg">
                          <Globe size={16} className="text-violet-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-800 truncate">
                          {site.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1">
                          {site.issues.map((issue, idx) => (
                            <div
                              key={idx}
                              className={`
                                px-2 py-1 rounded-full text-xs font-medium
                                ${
                                  issue.level === "critical"
                                    ? "bg-rose-100 text-rose-800"
                                    : ""
                                }
                                ${
                                  issue.level === "high"
                                    ? "bg-amber-100 text-amber-800"
                                    : ""
                                }
                                ${
                                  issue.level === "medium"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : ""
                                }
                              `}
                            >
                              {issue.count}
                            </div>
                          ))}
                        </div>
                        <button className="text-xs text-violet-600 hover:text-violet-800 font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="w-full py-2 bg-violet-100 text-violet-700 rounded-lg text-sm font-medium hover:bg-violet-200 transition-colors">
                    View All Websites
                  </button>
                </div>
              </div>

              {/* Right column - Recent Activity */}
              <div className="lg:col-span-4">
                <h3 className="text-sm font-medium text-slate-700 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {recentScans.slice(0, 3).map((scan, index) => (
                    <div
                      key={index}
                      className="bg-slate-50 rounded-xl p-3 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {scan.status === "Completed" ? (
                            <CheckCircle
                              size={16}
                              className="text-emerald-600"
                            />
                          ) : (
                            <XCircle size={16} className="text-rose-600" />
                          )}
                          <h3 className="text-sm font-medium text-slate-800">
                            {scan.website}
                          </h3>
                        </div>
                        <span className="text-xs text-slate-500">
                          {scan.time}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500">
                          {scan.type}
                        </span>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            scan.status === "Completed"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {scan.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors">
                    View All Activity
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vulnerability Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-12 bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="text-slate-400" size={20} />
                <h2 className="text-lg font-bold text-slate-800">
                  Vulnerability Severity Count
                </h2>
              </div>
              <Link
                to="/vulnerabilities"
                className="text-violet-600 text-sm font-medium hover:text-violet-700 flex items-center"
              >
                View All <span className="ml-1">→</span>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-500 text-xs border-b bg-slate-50">
                  <th className="px-6 py-4 font-medium">WEBSITE NAME</th>
                  <th className="px-6 py-4 font-medium text-center">
                    CRITICAL
                  </th>
                  <th className="px-6 py-4 font-medium text-center">HIGH</th>
                  <th className="px-6 py-4 font-medium text-center">MEDIUM</th>
                  <th className="px-6 py-4 font-medium text-center">
                    LAST SCAN
                  </th>
                  <th className="px-6 py-4 font-medium text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {severityTableData.map((site, index) => (
                  <motion.tr
                    key={site.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="border-b last:border-b-0 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-violet-100 p-2 rounded-lg">
                          <Globe size={16} className="text-violet-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-800">
                            {site.name}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center">
                            <Clock size={12} className="mr-1" /> Last scan:{" "}
                            {site.last_scan || "--"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-2.5 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-medium">
                        {site.issues.find((i) => i.level === "critical")
                          ?.count || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                        {site.issues.find((i) => i.level === "high")?.count ||
                          0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                        {site.issues.find((i) => i.level === "medium")?.count ||
                          0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-slate-500">
                      2 days ago
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="px-3 py-1.5 bg-violet-100 text-violet-700 rounded-lg text-xs font-medium hover:bg-violet-200 transition-colors">
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Recent Scans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-6 bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Activity className="text-slate-400" size={20} />
                <h2 className="text-lg font-bold text-slate-800">
                  Recent Scans
                </h2>
              </div>
              <Link
                to="#"
                className="text-violet-600 text-sm font-medium hover:text-violet-700 flex items-center"
              >
                View All <span className="ml-1">→</span>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-500 text-xs border-b bg-slate-50">
                  <th className="px-6 py-4 font-medium">SCAN TYPE</th>
                  <th className="px-6 py-4 font-medium">WEBSITE</th>
                  <th className="px-6 py-4 font-medium">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {recentScans.map((scan, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b last:border-b-0 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {scan.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {scan.website}
                    </td>
                    <td className="px-6 py-4">
                      {scan.status === "Completed" ? (
                        <div className="flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium w-fit">
                          <CheckCircle size={14} />
                          <span>Completed</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-medium w-fit">
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

        {/* Upcoming Scans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="lg:col-span-6 bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar className="text-slate-400" size={20} />
                <h2 className="text-lg font-bold text-slate-800">
                  Upcoming Scans
                </h2>
              </div>
              <Link
                to="#"
                className="text-violet-600 text-sm font-medium hover:text-violet-700 flex items-center"
              >
                View All <span className="ml-1">→</span>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-500 text-xs border-b bg-slate-50">
                  <th className="px-6 py-4 font-medium">FREQUENCY</th>
                  <th className="px-6 py-4 font-medium">WEBSITE</th>
                  <th className="px-6 py-4 font-medium">DATE</th>
                </tr>
              </thead>
              <tbody>
                {upcomingScans.map((scan, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b last:border-b-0 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          scan.frequency === "monthly"
                            ? "bg-violet-100 text-violet-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {scan.frequency}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {scan.website}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {scan.date}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Scan Failures */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="lg:col-span-6 bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <XCircle className="text-slate-400" size={20} />
                <h2 className="text-lg font-bold text-slate-800">
                  Scan Failures
                </h2>
              </div>
              <Link
                to="#"
                className="text-violet-600 text-sm font-medium hover:text-violet-700 flex items-center"
              >
                View All <span className="ml-1">→</span>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-500 text-xs border-b bg-slate-50">
                  <th className="px-6 py-4 font-medium">WEBSITE NAME</th>
                  <th className="px-6 py-4 font-medium">DATE</th>
                  <th className="px-6 py-4 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {scanFailures.map((failure, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b last:border-b-0 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {failure.website}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {failure.date}
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-xs font-medium hover:bg-violet-200 transition-colors">
                        Retry
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Recently Added Websites */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="lg:col-span-6 bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Globe className="text-slate-400" size={20} />
                <h2 className="text-lg font-bold text-slate-800">
                  Recently Added Websites
                </h2>
              </div>
              <Link
                to="#"
                className="text-violet-600 text-sm font-medium hover:text-violet-700 flex items-center"
              >
                View All <span className="ml-1">→</span>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-500 text-xs border-b bg-slate-50">
                  <th className="px-6 py-4 font-medium">WEBSITE NAME</th>
                  <th className="px-6 py-4 font-medium">WEBSITE URL</th>
                  <th className="px-6 py-4 font-medium">DATE</th>
                </tr>
              </thead>
              <tbody>
                {recentlyAddedWebsites.map((website, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b last:border-b-0 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {website.name}
                    </td>
                    <td className="px-6 py-4 text-sm">
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
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {website.date}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
