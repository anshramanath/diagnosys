"use client"

import { useEffect, useState } from "react"
import {
  Paper,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Stack
} from "@mui/material"

type AQIData = {
  aqi: number
  category: string
  dominantPollutant: string
}

export default function PollutionChart() {
  const [aqiData, setAqiData] = useState<AQIData | null>(null)

  useEffect(() => {
    fetch("/api/trends/get-pollution")
      .then((res) => res.json())
      .then((data) => {
        const condition = data?.indexes?.[0]
        if (condition) {
          setAqiData({
            aqi: condition.aqi,
            category: condition.category,
            dominantPollutant: condition.dominantPollutant,
          })
        }
      })
  }, [])

  const getColor = (aqi: number) => {
    if (aqi <= 50) return "success"
    if (aqi <= 100) return "warning"
    if (aqi <= 150) return "error"
    return "default"
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
        🏭 Air Quality Index
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Current AQI and primary pollutant in your area
      </Typography>

      {!aqiData ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Stack spacing={2}>
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={4}>
            <Typography variant="h6" fontWeight="bold">
              AQI: {aqiData.aqi}
            </Typography>
            <Chip
              label={aqiData.category}
              color={getColor(aqiData.aqi)}
              sx={{ fontSize: "0.85rem" }}
            />
            <Typography variant="body2" color="text.secondary">
              Dominant Pollutant:{" "}
              <Typography component="span" fontWeight="bold">
                {aqiData.dominantPollutant.toUpperCase()}
              </Typography>
            </Typography>
          </Box>
        </Stack>
      )}
    </Paper>
  )
}