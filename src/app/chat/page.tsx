"use client"

import { Box, Card, Typography, Button } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import BarChartIcon from '@mui/icons-material/BarChart'
import Image from "next/image"
import ChatWindow from "@/components/chat/ChatWindow"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  return (
    <>
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        {/* Outer container to limit width */}
        <Box sx={{ width: "100%", maxWidth: 1200 }}>
          {/* Back button aligned with card */}
          <Button
            onClick={() => router.push("/")}
            startIcon={<ArrowBackIcon />}
            variant="text"
            sx={{ mb: 2, textTransform: "none", fontWeight: 500 }}
          >
            Back to Home
          </Button>

          {/* Card */}
          <Card
            sx={{
              width: "100%",
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
                textAlign: "center",
              }}
            >
              <Image
                src="/doctor.png"
                alt="Medical Assistant"
                width={220}
                height={220}
                style={{ animation: "float 3s ease-in-out infinite" }}
              />

              <Typography variant="h5" fontWeight="bold" mt={3} mb={1}>
                Virtual Medical Assistant
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                Answer a few questions to get a personalized health summary and care suggestions.
              </Typography>

              <Button
                variant="outlined"
                startIcon={<BarChartIcon />}
                onClick={() => router.push("/trends")}
                sx={{ textTransform: "none", fontWeight: 500 }}
              >
                View Health Trends
              </Button>
            </Box>

            {/* Right Side */}
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <ChatWindow />
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  )
}