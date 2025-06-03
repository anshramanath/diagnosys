"use client"

import { Box, Container, Typography, Divider, Fade, Button } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import { useRouter } from "next/navigation"
import PollenChart from "@/components/trends/PollenChart"
import FluChart from "@/components/trends/FluChart"
import CovidStats from "@/components/trends/CovidStats"
import PollutionChart from "@/components/trends/PollutionChart"

export default function TrendsPage() {
  const router = useRouter()

  return (
    <Fade in timeout={500}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        {/* Back Button */}
        <Button
          onClick={() => router.push("/")}
          startIcon={<ArrowBackIcon />}
          variant="text"
          sx={{ mb: 2, textTransform: "none", fontWeight: 500 }}
        >
          Back to Home
        </Button>

        {/* Heading */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          🌐 Current Health Trends
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Stay informed with up-to-date data on pollen, flu, COVID-19, and air quality in your area.
        </Typography>

        {/* Charts */}
        <Box sx={{ mb: 6 }}>
          <PollenChart />
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 6 }}>
          <FluChart />
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 6 }}>
          <CovidStats />
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 6 }}>
          <PollutionChart />
        </Box>

        {/* View Symptom Chat Button */}
        <Box display="flex" justifyContent="center" mt={6}>
          <Button
            onClick={() => router.push("/chat")}
            startIcon={<ChatBubbleOutlineIcon />}
            variant="outlined"
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            View Symptom Chat
          </Button>
        </Box>
      </Container>
    </Fade>
  )
}