import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"

export default function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (msg: string) => void
  disabled: boolean
}) {
  const [input, setInput] = useState("")

  const handleSubmit = () => {
    if (input.trim()) {
      onSend(input.trim())
      setInput("")
    }
  }

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <TextField
        fullWidth
        size="small"
        disabled={disabled}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Type your message..."
      />
      <Button onClick={handleSubmit} variant="contained" disabled={disabled} sx={{ textTransform: "none" }}>
        Send
      </Button>
    </Box>
  )
}