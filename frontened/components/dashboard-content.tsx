"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, Users, HardDrive, Lock, Clock, User, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { UploadModal } from "./upload-modal"
import { AccessRequestModal } from "./access-request-modal"

const stats = [
  {
    title: "Files Sealed",
    value: "24",
    description: "On-chain & encrypted",
    icon: Lock,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Pending Requests",
    value: "3",
    description: "Awaiting approval",
    icon: Clock,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "Active Doctors",
    value: "7",
    description: "With current access",
    icon: Users,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Storage Used",
    value: "2.4GB",
    description: "Of 10GB available",
    icon: HardDrive,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
]

const recentFiles = [
  {
    id: 1,
    name: "Blood Test Results - Jan 2025.pdf",
    date: "2025-01-15",
    status: "Sealed",
    type: "pdf",
  },
  {
    id: 2,
    name: "MRI Scan - Brain.dcm",
    date: "2025-01-14",
    status: "Sealed",
    type: "dcm",
  },
  {
    id: 3,
    name: "Prescription - Antibiotics.pdf",
    date: "2025-01-13",
    status: "Sealed",
    type: "pdf",
  },
]

const pendingRequests = [
  {
    id: 1,
    doctor: "Dr. Sarah Chen",
    specialty: "Cardiology",
    purpose:
      "Follow-up consultation for recent cardiac evaluation. Need to review latest test results and imaging studies.",
    duration: "3 days",
    requested: "2 hours ago",
    files: ["Blood Test Results - Jan 2025.pdf", "ECG Report - Jan 2025.pdf"],
    avatar: "SC",
    walletAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
  },
  {
    id: 2,
    doctor: "Dr. Michael Rodriguez",
    specialty: "Radiology",
    purpose: "Image review for diagnostic assessment. Comparing with previous scans to track progression.",
    duration: "1 day",
    requested: "5 hours ago",
    files: ["MRI Scan - Brain.dcm", "X-Ray - Chest.jpg"],
    avatar: "MR",
    walletAddress: "0x8D4C0532925a3b8D4C0532925a3b8D4C0532925a",
  },
]

export function DashboardContent() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [accessRequestModalOpen, setAccessRequestModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<(typeof pendingRequests)[0] | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadModalOpen(true)
    }
  }

  const handleRequestClick = (request: (typeof pendingRequests)[0]) => {
    setSelectedRequest(request)
    setAccessRequestModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Your most private data, now as safe and simple as tapping a credit card
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm font-medium">{stat.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
                <div className={cn("p-3 rounded-lg", stat.bgColor)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Section */}
      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Medical Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300",
              dragActive
                ? "border-primary bg-primary/5 pulse-border coral-glow"
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5",
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="mx-auto w-16 h-16 rounded-full medvault-coral flex items-center justify-center mb-4 coral-glow">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Drag & drop your medical files here</h3>
            <p className="text-muted-foreground mb-4">or click to browse (PDF, DICOM, JPG, PNG)</p>
            <Button
              className="medvault-coral hover:opacity-90 transition-opacity"
              onClick={() => setUploadModalOpen(true)}
            >
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Files and Pending Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Files */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Recent Files
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="status-sealed">
                    {file.status}
                  </Badge>
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Access Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Pending Access Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="p-4 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => handleRequestClick(request)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{request.doctor}</p>
                      <p className="text-sm text-muted-foreground">{request.specialty}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="status-pending">
                    {request.duration}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{request.purpose}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRequestClick(request)
                    }}
                  >
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Upload Modal */}
      <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />

      {/* Access Request Modal */}
      <AccessRequestModal
        open={accessRequestModalOpen}
        onOpenChange={setAccessRequestModalOpen}
        request={selectedRequest}
      />
    </div>
  )
}
