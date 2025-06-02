"use client"

import { Box, Card } from "@mui/material"
import Image from "next/image"
import ChatWindow from "@/components/chat/ChatWindow"

export default function HomePage() {
  return (
    <>
      {/* Animation Style */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 1200,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
            overflow: "hidden",
            boxShadow: 6,
            borderRadius: 5,
          }}
        >
          {/* Left Side */}
          <Box
            sx={{
              bgcolor: "#e6f0ff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
            }}
          >
            <Image
              src="/doctor.png"
              alt="Medical Assistant"
              width={220}
              height={220}
              style={{ animation: "float 3s ease-in-out infinite" }}
            />
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <h2 style={{ marginBottom: 8 }}>Virtual Medical Assistant</h2>
              <p style={{ color: "#555" }}>
                Answer a few questions to get a personalized health summary and care suggestions.
              </p>
            </Box>
          </Box>

          {/* Right Side */}
          <Box sx={{ p: 3 }}>
            <ChatWindow />
          </Box>
        </Card>
      </Box>
    </>
  )
}