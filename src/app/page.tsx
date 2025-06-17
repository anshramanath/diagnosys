"use client"

import { Box, Button, Container, Typography, Stack, Card, CardContent } from "@mui/material"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function HomePage() {
  const router = useRouter()

  return (
    <>
      {/* Global spin animation */}
      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <Box sx={{ background: "#f7fafd", minHeight: "100vh", py: 10 }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          {/* Header */}
          <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={2}>
            <Box
              sx={{
                animation: "spin 15s linear infinite",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <Image src="/plus.png" alt="Logo" width={37} height={37} />
            </Box>
            <Typography variant="h3" fontWeight="bold">
              Welcome to Diagnosys
            </Typography>
          </Box>

          <Typography variant="h6" color="text.secondary" mb={6}>
            Get personalized care with our virtual assistant or explore real-time public health trends.
          </Typography>

          <Stack spacing={4}>
            {/* Chat Card */}
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 4,
                py: 3,
                borderRadius: 4,
                boxShadow: 6,
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardContent sx={{ textAlign: "left", flex: 1 }}>
                <Typography variant="h5" fontWeight="bold">Start Symptom Chat</Typography>
                <Typography variant="body1" color="text.secondary" mb={2}>
                  Answer a few quick questions to get a health summary and care suggestions.
                </Typography>
                <Button variant="contained" onClick={() => router.push("/chat")} sx={{ textTransform: "none" }}>
                  🔍 Begin Symptom Chat
                </Button>
              </CardContent>
              <Image src="/messages.png" alt="Chat Icon" width={140} height={140} />
            </Card>

            {/* Trends Card */}
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 4,
                py: 3,
                borderRadius: 4,
                boxShadow: 6,
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardContent sx={{ textAlign: "left", flex: 1 }}>
                <Typography variant="h5" fontWeight="bold">View Health Trends</Typography>
                <Typography variant="body1" color="text.secondary" mb={2}>
                  Stay up to date with the latest data on flu, COVID, pollution, and allergies.
                </Typography>
                <Button variant="outlined" onClick={() => router.push("/trends")} sx={{ textTransform: "none" }}>
                  🌐 See Current Trends
                </Button>
              </CardContent>
              <Image src="/graph.png" alt="Trends Icon" width={130} height={130} />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  )
}