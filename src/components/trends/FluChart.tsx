"use client"

import { useEffect, useState } from "react"
import { Paper, Typography } from "@mui/material"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function FluChart() {
  const [data, setData] = useState<any>([])

  useEffect(() => {
    fetch("/api/trends/get-flu")
        .then(res => res.json())
        .then((data: any[]) => {
        const formatted = data.map(entry => ({
            week: entry.week,
            cases: parseInt(entry.cases),
        }))
        setData(formatted)
    })
    
  }, [])

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6">🦠 Flu Activity</Typography>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="cases" stroke="#d32f2f" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  )
}