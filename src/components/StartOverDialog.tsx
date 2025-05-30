"use client"

import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material"

export default function StartOverDialog({ open, onConfirm, onCancel }: { open: boolean; onConfirm: () => void; onCancel: () => void }) {
  return (
    <Dialog open={open}>
      <DialogTitle>Start Over?</DialogTitle>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>Reset</Button>
      </DialogActions>
    </Dialog>
  )
}