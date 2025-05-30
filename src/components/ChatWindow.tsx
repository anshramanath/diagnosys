"use client"

import { useState } from "react"
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material"
import ChatBubble from "./ChatBubble"
import ChatInput from "./ChatInput"
import PdfPreviewModal from "@/components/PreviewModal"

type Message = {
    role: "user" | "assistant"
    content: string
}  

export default function ChatWindow({ onStartOver }: { onStartOver: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: `Hi, I'm your virtual medical assistant. Let’s begin. What’s your full name?` },
  ])
  const [loading, setLoading] = useState(false)
  const [diagnosis, setDiagnosis] = useState("")
  const [showPreview, setShowPreview] = useState(false)

  const handleSend = async (message: string) => {
    setMessages(messages => [...messages, { role: "user", content: message }])
    setLoading(true)

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages }),
    })

    const data = await res.json()
    setMessages(messages => [...messages, { role: "assistant", content: data.reply }])
    setLoading(false)

    if (data.reply.toLowerCase().includes("diagnosis") || data.reply.toLowerCase().includes("treatment plan")) {
      setDiagnosis(data.reply)
    }
  }

  return (
    <Stack spacing={2} sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Box sx={{ minHeight: 400, border: "1px solid #ccc", borderRadius: 2, p: 2 }}>
        {messages.map((m, i) => (
          <ChatBubble key={i} message={m.content} from={m.role} />
        ))}
        {loading && <ChatBubble message="..." from="assistant" />}
      </Box>

      {true && (
        <Stack direction="row" spacing={2}>
            <Button onClick={() => setShowPreview(true)}>Download Diagnosis</Button>
            <PdfPreviewModal
                open={showPreview}
                onClose={() => setShowPreview(false)}
                messages={messages}
            />
            <Button color="error" onClick={onStartOver}>Start Over</Button>
        </Stack>
      )}

      <ChatInput onSend={handleSend} disabled={loading} />
    </Stack>
  )
}