"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"
import { pdf } from "@react-pdf/renderer"
import HealthSummaryPDF from "./HealthSummaryPDF"

export default function PDFPreviewModal({
  open,
  onClose,
  structuredData,
}: {
  open: boolean
  onClose: () => void
  structuredData: Record<string, string> | null
}) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null)

  useEffect(() => {
    const generatePdf = async () => {
      const blob = await pdf(<HealthSummaryPDF data={structuredData!} />).toBlob()
      setBlobUrl(URL.createObjectURL(blob))
    }

    if (structuredData) generatePdf()
  }, [structuredData])

  if (!structuredData) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Health Summary</DialogTitle>
      <DialogContent dividers>
        {blobUrl && (
          <iframe src={blobUrl} width="100%" height="500px" style={{ border: "none" }} />
        )}
      </DialogContent>
      <DialogActions>
        {blobUrl && (
          <Button variant="contained" component="a" href={blobUrl} download="health-summary.pdf">
            Download
          </Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}