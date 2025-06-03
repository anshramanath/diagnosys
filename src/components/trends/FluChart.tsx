"use client"

import { useEffect, useState } from "react"
import { Box, Paper, Typography, Divider } from "@mui/material"
import dynamic from "next/dynamic"

const FluLineChart = dynamic(() => import("./FluLineChart"), { ssr: false })

type FluEntry = {
  weekLabel: string
  iliCases: number
}

export default function FluChart() {
  const [data, setData] = useState<FluEntry[] | null>(null)

  useEffect(() => {
    fetch("/api/trends/get-flu")
      .then((res) => res.json())
      .then((data: FluEntry[]) => setData(data))
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
        🦠 Weekly Flu-like Illness Cases in the U.S.
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Tracking trends in flu-like symptom visits across the country
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Box height={300}>
        <FluLineChart data={data} />
      </Box>
    </Paper>
  )
}