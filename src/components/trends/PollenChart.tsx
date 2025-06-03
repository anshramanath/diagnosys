"use client"

import { useEffect, useState } from "react"
import { Paper, Typography, Divider, Box } from "@mui/material"
import dynamic from "next/dynamic"

// Define the shape of pollen data
type PollenEntry = {
  date: string
  tree: number
  grass: number
  pine: number
}

const PollenBarChart = dynamic(() => import("./PollenBarChart"), { ssr: false })

export default function PollenChart() {
  const [data, setData] = useState<PollenEntry[] | null>(null)

  useEffect(() => {
    fetch("/api/trends/get-pollen")
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) return null

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
        🌿 Pollen Forecast
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Pollen index levels today and over the next few days
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Box height={260}>
        <PollenBarChart data={data} />
      </Box>
    </Paper>
  )
}