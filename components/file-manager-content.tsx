"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Grid3X3, List, Search, Filter, FileText, MoreVertical, Download, Share, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UploadModal } from "./upload-modal"

const files = [
  {
    id: 1,
    name: "Blood Test Results - Jan 2025.pdf",
    date: "2025-01-15",
    status: "Sealed",
    type: "pdf",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "MRI Scan - Brain.dcm",
    date: "2025-01-14",
    status: "Sealed",
    type: "dcm",
    size: "45.2 MB",
  },
  {
    id: 3,
    name: "Prescription - Antibiotics.pdf",
    date: "2025-01-13",
    status: "Sealed",
    type: "pdf",
    size: "1.1 MB",
  },
  {
    id: 4,
    name: "X-Ray - Chest.jpg",
    date: "2025-01-12",
    status: "Sealed",
    type: "jpg",
    size: "3.8 MB",
  },
  {
    id: 5,
    name: "Lab Report - Comprehensive.pdf",
    date: "2025-01-10",
    status: "Sealed",
    type: "pdf",
    size: "4.2 MB",
  },
  {
    id: 6,
    name: "Ultrasound - Abdominal.dcm",
    date: "2025-01-08",
    status: "Sealed",
    type: "dcm",
    size: "28.7 MB",
  },
]

export function FileManagerContent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getFileIcon = (type: string) => {
    return <FileText className="w-8 h-8 text-white" />
  }

  const getGradientClass = (index: number) => {
    const gradients = [
      "bg-gradient-to-br from-primary to-primary/70",
      "bg-gradient-to-br from-secondary to-secondary/70",
      "bg-gradient-to-br from-accent to-accent/70",
      "bg-gradient-to-br from-chart-1 to-chart-1/70",
      "bg-gradient-to-br from-chart-2 to-chart-2/70",
      "bg-gradient-to-br from-chart-3 to-chart-3/70",
    ]
    return gradients[index % gradients.length]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">File Manager</h1>
          <p className="text-muted-foreground mt-2">Manage your encrypted medical files</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setUploadModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Upload New
        </Button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Files Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFiles.map((file, index) => (
            <Card key={file.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("w-16 h-16 rounded-xl flex items-center justify-center", getGradientClass(index))}>
                    {getFileIcon(file.type)}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="w-4 h-4 mr-2" />
                        Share Access
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm leading-tight">{file.name}</h3>
                  <p className="text-xs text-muted-foreground">{file.date}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="status-sealed text-xs">
                      {file.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{file.size}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filteredFiles.map((file, index) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn("w-10 h-10 rounded-lg flex items-center justify-center", getGradientClass(index))}
                    >
                      {getFileIcon(file.type)}
                    </div>
                    <div>
                      <h3 className="font-medium">{file.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {file.date} • {file.size}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="status-sealed">
                      {file.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="w-4 h-4 mr-2" />
                          Share Access
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Modal */}
      <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
    </div>
  )
}
