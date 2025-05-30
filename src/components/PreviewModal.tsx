"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material"
import { useEffect, useState } from "react"
import html2pdf from "html2pdf.js"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function PdfPreviewModal({
  open,
  onClose,
  messages,
}: {
  open: boolean
  onClose: () => void
  messages: Message[]
}) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const chatSummary = messages
    .map((m) => `${m.role === "user" ? "Patient" : "Assistant"}: ${m.content}`)
    .join("\n")

  useEffect(() => {
    if (!open) return

    setLoading(true)
    fetch("/api/generate-html-chart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(`Patient: My name is John Walker.
Assistant: How old are you?
Patient: I’m 42 years old.
Assistant: What symptoms are you experiencing?
Patient: I've had a sore throat, mild fever, and fatigue for the past few days.
Assistant: When did these symptoms start?
Patient: They started on May 25th, about four days ago.
Assistant: Have your symptoms gotten better, worse, or stayed the same?
Patient: The sore throat has worsened slightly, but the fever went down a bit.
Assistant: Have you tried anything to treat them?
Patient: I’ve been drinking warm tea with honey, took ibuprofen, and used throat lozenges.
Assistant: Do you have any other health issues I should know about?
Patient: I have seasonal allergies, but nothing else major.
`),
    })
      .then((res) => res.json())
      .then((data) => {
        const container = document.createElement("div")
        container.innerHTML = data.html
        document.body.appendChild(container)

        html2pdf()
          .from(container.querySelector("#pdf-content")!)
          .outputPdf("blob")
          .then((blob: Blob) => {
            const url = URL.createObjectURL(blob)
            setPdfUrl(url)
            setLoading(false)
            document.body.removeChild(container)
          })
      })
      .catch(() => {
        setLoading(false)
        setPdfUrl(null)
      })
  }, [open, chatSummary])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Patient Chart Preview</DialogTitle>
      <DialogContent dividers sx={{ height: "75vh", padding: 0 }}>
        {loading ? (
          <CircularProgress sx={{ m: 4 }} />
        ) : pdfUrl ? (
          <iframe
            src={pdfUrl}
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        ) : (
          <p style={{ padding: "1rem", color: "red" }}>
            Failed to generate preview.
          </p>
        )}
      </DialogContent>
      <DialogActions>
        {pdfUrl && (
          <Button
            onClick={() => {
              const link = document.createElement("a")
              link.href = pdfUrl
              link.download = "patient-chart.pdf"
              link.click()
            }}
            variant="contained"
          >
            Download
          </Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}