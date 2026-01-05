"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Activity, Download, Filter, Search } from "lucide-react"

const activityData = [
  {
    id: 1,
    timestamp: "2025-01-15 14:30",
    action: "File Access",
    doctor: "Dr. Sarah Chen",
    file: "Blood Test Results",
    status: "Approved",
  },
  {
    id: 2,
    timestamp: "2025-01-15 12:15",
    action: "Access Request",
    doctor: "Dr. Michael Rodriguez",
    file: "MRI Scan",
    status: "Pending",
  },
  {
    id: 3,
    timestamp: "2025-01-14 16:45",
    action: "File Upload",
    doctor: "Patient",
    file: "Prescription",
    status: "Sealed",
  },
  {
    id: 4,
    timestamp: "2025-01-14 09:20",
    action: "Access Revoked",
    doctor: "Dr. Emily Johnson",
    file: "All Files",
    status: "Revoked",
  },
  {
    id: 5,
    timestamp: "2025-01-13 11:30",
    action: "File Access",
    doctor: "Dr. Sarah Chen",
    file: "Lab Report",
    status: "Approved",
  },
  {
    id: 6,
    timestamp: "2025-01-12 15:45",
    action: "Access Request",
    doctor: "Dr. Michael Rodriguez",
    file: "X-Ray Images",
    status: "Approved",
  },
  {
    id: 7,
    timestamp: "2025-01-11 10:15",
    action: "File Upload",
    doctor: "Patient",
    file: "Ultrasound Report",
    status: "Sealed",
  },
  {
    id: 8,
    timestamp: "2025-01-10 14:20",
    action: "Access Granted",
    doctor: "Dr. Emily Johnson",
    file: "Medical History",
    status: "Approved",
  },
]

export function ActivityLogContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredActivity = activityData.filter((activity) => {
    const matchesSearch =
      activity.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.file.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = filterStatus === "all" || activity.status.toLowerCase() === filterStatus

    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      Approved: "status-active",
      Pending: "status-pending",
      Sealed: "status-sealed",
      Revoked: "status-expired",
    }

    return (
      <Badge variant="secondary" className={statusClasses[status as keyof typeof statusClasses]}>
        {status}
      </Badge>
    )
  }

  const exportCSV = () => {
    const csvContent = [
      ["Timestamp", "Action", "Doctor", "File", "Status"],
      ...filteredActivity.map((activity) => [
        activity.timestamp,
        activity.action,
        activity.doctor,
        activity.file,
        activity.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "activity-log.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Activity Log</h1>
          <p className="text-muted-foreground mt-2">Immutable audit trail of all file access events</p>
        </div>
        <Button onClick={exportCSV} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Filter by doctor, action, or date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Activity Log
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="p-4 font-medium text-muted-foreground">Timestamp</th>
                  <th className="p-4 font-medium text-muted-foreground">Action</th>
                  <th className="p-4 font-medium text-muted-foreground">Doctor</th>
                  <th className="p-4 font-medium text-muted-foreground">File</th>
                  <th className="p-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredActivity.map((activity) => (
                  <tr key={activity.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-sm font-mono">{activity.timestamp}</td>
                    <td className="p-4 text-sm font-medium">{activity.action}</td>
                    <td className="p-4 text-sm">{activity.doctor}</td>
                    <td className="p-4 text-sm">{activity.file}</td>
                    <td className="p-4">{getStatusBadge(activity.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredActivity.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No activity found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">156</p>
              <p className="text-sm font-medium">Total Events</p>
              <p className="text-xs text-muted-foreground">All time</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">24</p>
              <p className="text-sm font-medium">File Uploads</p>
              <p className="text-xs text-muted-foreground">This month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">89</p>
              <p className="text-sm font-medium">Access Grants</p>
              <p className="text-xs text-muted-foreground">This month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-chart-1">12</p>
              <p className="text-sm font-medium">Revocations</p>
              <p className="text-xs text-muted-foreground">This month</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
