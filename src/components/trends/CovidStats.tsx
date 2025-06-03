"use client"

import { useEffect, useState } from "react"
import {
  Paper,
  Typography,
  Box,
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material"

type CovidData = {
  cases: number
  todayCases: number
  deaths: number
}

export default function CovidStats() {
  const [data, setData] = useState<CovidData | null>(null)

  useEffect(() => {
    fetch("/api/trends/get-covid")
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) {
    return (
      <Paper
        elevation={4}
        sx={{ p: 4, mb: 6, borderRadius: 3, textAlign: "center" }}
      >
        <CircularProgress size={24} />
      </Paper>
    )
  }

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        mb: 6,
        borderRadius: 3,
        background: "#f9f9f9",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        🧬 COVID-19 Global Stats
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Latest worldwide case numbers reported today
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Stack spacing={1}>
        <Stat label="Total Cases" value={data.cases} />
        <Stat label="Today's Cases" value={data.todayCases} />
        <Stat label="Total Deaths" value={data.deaths} />
      </Stack>
    </Paper>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography>{label}</Typography>
      <Typography fontWeight="bold">{value.toLocaleString()}</Typography>
    </Box>
  )
}