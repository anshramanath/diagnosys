"use client"

import ChatWindow from "@/components/ChatWindow"
import { Container, Typography } from "@mui/material"

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <ChatWindow />
    </Container>
  )
}