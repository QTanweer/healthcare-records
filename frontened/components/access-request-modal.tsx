"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { User, Clock, FileText, Check, X, AlertCircle } from "lucide-react"

interface AccessRequest {
  id: number
  doctor: string
  specialty: string
  purpose: string
  duration: string
  requested: string
  files: string[]
  avatar: string
  walletAddress: string
}

interface AccessRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  request: AccessRequest | null
}

export function AccessRequestModal({ open, onOpenChange, request }: AccessRequestModalProps) {
  const [decision, setDecision] = useState<"approve" | "decline" | null>(null)
  const [reason, setReason] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  if (!request) return null

  const handleDecision = async (action: "approve" | "decline") => {
    setIsProcessing(true)
    setDecision(action)

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)

    // Close modal after a brief delay to show success
    setTimeout(() => {
      onOpenChange(false)
      setDecision(null)
      setReason("")
    }, 1500)
  }

  const getDecisionIcon = () => {
    if (decision === "approve") return <Check className="w-6 h-6 text-primary" />
    if (decision === "decline") return <X className="w-6 h-6 text-destructive" />
    return null
  }

  const getDecisionText = () => {
    if (decision === "approve") return "Access Granted Successfully"
    if (decision === "decline") return "Access Request Declined"
    return ""
  }

  if (decision) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              {getDecisionIcon()}
            </div>
            <h3 className="text-lg font-semibold mb-2">{getDecisionText()}</h3>
            <p className="text-muted-foreground text-sm">
              {decision === "approve"
                ? `${request.doctor} now has access to your files for ${request.duration}.`
                : `${request.doctor}'s access request has been declined.`}
            </p>
            {isProcessing && (
              <div className="mt-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                <p className="text-xs text-muted-foreground mt-2">Processing on blockchain...</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Access Request Review
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Doctor Info */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">{request.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{request.doctor}</h3>
              <p className="text-muted-foreground">{request.specialty}</p>
              <p className="text-sm text-muted-foreground font-mono mt-1">{request.walletAddress}</p>
            </div>
            <Badge variant="outline" className="status-pending">
              <Clock className="w-3 h-3 mr-1" />
              {request.duration}
            </Badge>
          </div>

          {/* Request Details */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Purpose of Access</Label>
              <p className="mt-1 p-3 rounded-lg bg-muted/30 text-sm">{request.purpose}</p>
            </div>

            <div>
              <Label className="text-sm font-medium">Requested Files</Label>
              <div className="mt-2 space-y-2">
                {request.files.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded bg-muted/30">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{file}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Request Time</Label>
              <p className="mt-1 text-sm text-muted-foreground">{request.requested}</p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-secondary mt-0.5" />
              <div>
                <h4 className="font-medium text-secondary">Security Notice</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  This access will be recorded on the blockchain and cannot be modified. The doctor will only have
                  access for the specified duration.
                </p>
              </div>
            </div>
          </div>

          {/* Decline Reason (if declining) */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason (Optional)</Label>
            <Textarea
              id="reason"
              placeholder="Provide a reason for your decision..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={() => handleDecision("decline")}
              variant="outline"
              className="flex-1"
              disabled={isProcessing}
            >
              <X className="w-4 h-4 mr-2" />
              Decline
            </Button>
            <Button
              onClick={() => handleDecision("approve")}
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={isProcessing}
            >
              <Check className="w-4 h-4 mr-2" />
              Approve Access
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
