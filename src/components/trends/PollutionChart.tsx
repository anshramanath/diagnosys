"use client"

import { useEffect, useState } from "react"
import { Paper, Typography } from "@mui/material"

export default function PollutionChart() {
  const [aqi, setAqi] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/trends/get-pollution")
        .then(res => res.json())
        .then(data => {
        const station = data.stations?.[0]
        if (!station) return
        
        setAqi(station.AQI)
        })    
  }, [])

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6">🏭 Air Quality Index</Typography>
      {aqi ? (
        <Typography variant="body1">Current AQI: {aqi}</Typography>
      ) : (
        <Typography variant="body2">Loading AQI data...</Typography>
      )}
    </Paper>
  )
}