"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Check, AlertCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface UploadFile {
  id: string
  file: File
  status: "uploading" | "encrypting" | "sealing" | "complete" | "error"
  progress: number
  hash?: string
  error?: string
}

export function UploadModal({ open, onOpenChange }: UploadModalProps) {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (newFiles: File[]) => {
    const uploadFiles: UploadFile[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: "uploading",
      progress: 0,
    }))

    setFiles((prev) => [...prev, ...uploadFiles])

    // Simulate upload process for each file
    uploadFiles.forEach((uploadFile) => {
      simulateUpload(uploadFile.id)
    })
  }

  const simulateUpload = async (fileId: string) => {
    const updateFile = (updates: Partial<UploadFile>) => {
      setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, ...updates } : f)))
    }

    // Uploading phase
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      updateFile({ progress: i })
    }

    // Encrypting phase
    updateFile({ status: "encrypting", progress: 0 })
    for (let i = 0; i <= 100; i += 20) {
      await new Promise((resolve) => setTimeout(resolve, 150))
      updateFile({ progress: i })
    }

    // Sealing phase
    updateFile({ status: "sealing", progress: 0 })
    for (let i = 0; i <= 100; i += 25) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      updateFile({ progress: i })
    }

    // Complete
    updateFile({
      status: "complete",
      progress: 100,
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
    })
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const getStatusIcon = (status: UploadFile["status"]) => {
    switch (status) {
      case "complete":
        return <Check className="w-4 h-4 text-primary" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-destructive" />
      default:
        return <Upload className="w-4 h-4 text-muted-foreground animate-pulse" />
    }
  }

  const getStatusText = (status: UploadFile["status"]) => {
    switch (status) {
      case "uploading":
        return "Uploading to IPFS..."
      case "encrypting":
        return "Encrypting file..."
      case "sealing":
        return "Sealing on blockchain..."
      case "complete":
        return "Sealed on-chain"
      case "error":
        return "Upload failed"
      default:
        return "Processing..."
    }
  }

  const getStatusColor = (status: UploadFile["status"]) => {
    switch (status) {
      case "complete":
        return "status-sealed"
      case "error":
        return "status-expired"
      default:
        return "status-pending"
    }
  }

  const allComplete = files.length > 0 && files.every((f) => f.status === "complete")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Medical Files
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Area */}
          {files.length === 0 && (
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-12 text-center transition-colors",
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-muted-foreground/50",
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Drag & drop your medical files here</h3>
              <p className="text-muted-foreground mb-4">or click to browse (PDF, DICOM, JPG, PNG)</p>
              <Button
                onClick={() => document.getElementById("file-input")?.click()}
                className="bg-primary hover:bg-primary/90"
              >
                Choose Files
              </Button>
              <input
                id="file-input"
                type="file"
                multiple
                accept=".pdf,.dcm,.jpg,.jpeg,.png"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          )}

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Uploading Files</h3>
                <Button variant="outline" size="sm" onClick={() => document.getElementById("file-input")?.click()}>
                  Add More Files
                </Button>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept=".pdf,.dcm,.jpg,.jpeg,.png"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>

              <div className="space-y-3">
                {files.map((uploadFile) => (
                  <div key={uploadFile.id} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{uploadFile.file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={getStatusColor(uploadFile.status)}>
                          {getStatusIcon(uploadFile.status)}
                          <span className="ml-1">{getStatusText(uploadFile.status)}</span>
                        </Badge>
                        {uploadFile.status !== "complete" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-6 h-6"
                            onClick={() => removeFile(uploadFile.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {uploadFile.status !== "complete" && uploadFile.status !== "error" && (
                      <Progress value={uploadFile.progress} className="h-2" />
                    )}

                    {uploadFile.hash && (
                      <div className="mt-3 p-2 rounded bg-muted/50">
                        <p className="text-xs text-muted-foreground mb-1">Blockchain Hash:</p>
                        <p className="text-xs font-mono break-all">{uploadFile.hash}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Success Message */}
          {allComplete && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-primary">All files sealed successfully!</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Your medical files have been encrypted and sealed on the blockchain. They are now tamper-proof and ready
                to share with authorized doctors.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {allComplete ? "Close" : "Cancel"}
            </Button>
            {allComplete && (
              <Button
                onClick={() => {
                  onOpenChange(false)
                  setFiles([])
                }}
                className="bg-primary hover:bg-primary/90"
              >
                Upload More Files
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
