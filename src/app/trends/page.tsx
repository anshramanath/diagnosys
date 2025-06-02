import { Container, Typography } from "@mui/material"
import PollenChart from "@/components/trends/PollenChart"
import FluChart from "@/components/trends/FluChart"
import CovidStats from "@/components/trends/CovidStats"
import PollutionChart from "@/components/trends/PollutionChart"

export default function TrendsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        🌐 Current Health Trends
      </Typography>
      <PollenChart />
      <FluChart />
      <CovidStats />
      <PollutionChart />
    </Container>
  )
}