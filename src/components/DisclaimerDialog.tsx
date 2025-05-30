"use client"

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"

export default function DisclaimerDialog({ open, onAccept }: { open: boolean; onAccept: () => void }) {
  return (
    <Dialog open={open}>
      <DialogTitle>Disclaimer</DialogTitle>
      <DialogContent>This app is not a substitute for medical advice</DialogContent>
      <DialogActions>
        <Button onClick={onAccept} variant="contained">Continue</Button>
      </DialogActions>
    </Dialog>
  )
}