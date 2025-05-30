"use client"
import { Box, Paper, Typography } from "@mui/material"

export default function ChatBubble({ message, from }: { message: string; from: "user" | "assistant" }) {
  const isUser = from === "user"
  return (
    <Box display="flex" justifyContent={isUser ? "flex-end" : "flex-start"} my={1}>
      <Paper
        sx={{
          p: 1.5,
          maxWidth: "75%",
          backgroundColor: isUser ? "#1976d2" : "#f1f1f1",
          color: isUser ? "#fff" : "#000",
        }}
      >
        <Typography variant="body1">{message}</Typography>
      </Paper>
    </Box>
  )
}