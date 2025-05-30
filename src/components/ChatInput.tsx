"use client"
import { useState } from "react"
import { Box, TextField, IconButton } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"

export default function ChatInput({ onSend, disabled }: { onSend: (msg: string) => void; disabled: boolean }) {
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    onSend(input.trim())
    setInput("")
  }

  return (
    <Box display="flex" gap={1}>
      <TextField
        fullWidth
        value={input}
        disabled={disabled}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type your message..."
      />
      <IconButton onClick={handleSend} disabled={disabled}>
        <SendIcon />
      </IconButton>
    </Box>
  )
}