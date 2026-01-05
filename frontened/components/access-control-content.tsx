"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Shield, User, Clock, FileText, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const authorizedDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialty: "Cardiology",
    status: "Active",
    expires: "2025-01-20",
    avatar: "SC",
  },
  {
    id: 2,
    name: "Dr. Michael Rodriguez",
    specialty: "Radiology",
    status: "Active",
    expires: "2025-01-18",
    avatar: "MR",
  },
  {
    id: 3,
    name: "Dr. Emily Johnson",
    specialty: "Neurology",
    status: "Expired",
    expires: "2025-01-22",
    avatar: "EJ",
  },
]

export function AccessControlContent() {
  const [walletAddress, setWalletAddress] = useState("")
  const [duration, setDuration] = useState("1 day")
  const [selectedFiles, setSelectedFiles] = useState({
    allFiles: true,
    labResults: false,
    imaging: false,
  })

  const handleGrantAccess = () => {
    console.log("Granting access:", { walletAddress, duration, selectedFiles })
    // Reset form
    setWalletAddress("")
    setDuration("1 day")
    setSelectedFiles({ allFiles: true, labResults: false, imaging: false })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Access Control</h1>
        <p className="text-muted-foreground mt-2">Manage doctor access to your medical files</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Authorized Doctors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Authorized Doctors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {authorizedDoctors.map((doctor) => (
              <div key={doctor.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">{doctor.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    <p className="text-xs text-muted-foreground">Expires: {doctor.expires}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    variant={doctor.status === "Active" ? "default" : "destructive"}
                    className={doctor.status === "Active" ? "status-active" : "status-expired"}
                  >
                    {doctor.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    {doctor.status === "Active" ? "Revoke" : "Renew"}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Grant New Access */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Grant New Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Doctor Wallet Address */}
            <div className="space-y-2">
              <Label htmlFor="wallet">Doctor Wallet Address</Label>
              <Input
                id="wallet"
                placeholder="0x... or doctor.eth"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
            </div>

            {/* Access Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">Access Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 day">1 day</SelectItem>
                  <SelectItem value="3 days">3 days</SelectItem>
                  <SelectItem value="1 week">1 week</SelectItem>
                  <SelectItem value="2 weeks">2 weeks</SelectItem>
                  <SelectItem value="1 month">1 month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* File Access Scope */}
            <div className="space-y-3">
              <Label>File Access Scope</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="all-files"
                    checked={selectedFiles.allFiles}
                    onCheckedChange={(checked) =>
                      setSelectedFiles((prev) => ({
                        ...prev,
                        allFiles: checked as boolean,
                        labResults: checked ? false : prev.labResults,
                        imaging: checked ? false : prev.imaging,
                      }))
                    }
                  />
                  <Label htmlFor="all-files" className="text-sm font-normal">
                    All files
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lab-results"
                    checked={selectedFiles.labResults}
                    disabled={selectedFiles.allFiles}
                    onCheckedChange={(checked) =>
                      setSelectedFiles((prev) => ({
                        ...prev,
                        labResults: checked as boolean,
                        allFiles: false,
                      }))
                    }
                  />
                  <Label htmlFor="lab-results" className="text-sm font-normal">
                    Lab results only
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="imaging"
                    checked={selectedFiles.imaging}
                    disabled={selectedFiles.allFiles}
                    onCheckedChange={(checked) =>
                      setSelectedFiles((prev) => ({
                        ...prev,
                        imaging: checked as boolean,
                        allFiles: false,
                      }))
                    }
                  />
                  <Label htmlFor="imaging" className="text-sm font-normal">
                    Imaging only
                  </Label>
                </div>
              </div>
            </div>

            {/* Grant Access Button */}
            <Button
              onClick={handleGrantAccess}
              disabled={!walletAddress}
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              Grant Access
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Access Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">7</p>
                <p className="text-sm font-medium">Active Doctors</p>
                <p className="text-xs text-muted-foreground">With current access</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <User className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm font-medium">Expiring Soon</p>
                <p className="text-xs text-muted-foreground">Within 24 hours</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/10">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm font-medium">Files Shared</p>
                <p className="text-xs text-muted-foreground">Total access grants</p>
              </div>
              <div className="p-3 rounded-lg bg-accent/10">
                <FileText className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
