"use client"

import { useEffect, useState } from "react"
import { Paper, Typography } from "@mui/material"

export default function CovidStats() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/trends/get-covid")
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) return null

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6">🧬 COVID-19 Global Stats</Typography>
      <Typography>Total Cases: {data.cases.toLocaleString()}</Typography>
      <Typography>Today's Cases: {data.todayCases.toLocaleString()}</Typography>
      <Typography>Total Deaths: {data.deaths.toLocaleString()}</Typography>
    </Paper>
  )
}