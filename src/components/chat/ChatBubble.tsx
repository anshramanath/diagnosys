import { Box, Typography } from "@mui/material"

export default function ChatBubble({
  from,
  message,
}: {
  from: "user" | "assistant"
  message: string
}) {
  const isUser = from === "user"

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 1,
      }}
    >
      <Box
        sx={{
          backgroundColor: isUser ? "#1976d2" : "#f0f0f0",
          color: isUser ? "#fff" : "#000",
          px: 2,
          py: 1,
          borderRadius: 2,
          maxWidth: "70%",
          textAlign: "left",
        }}
      >
        <Typography variant="body2">{message}</Typography>
      </Box>
    </Box>
  )
}