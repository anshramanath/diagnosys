"use client"

import { useEffect, useState } from "react"
import { Paper, Typography } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function PollenChart() {
  const [data, setData] = useState<any>([])

  useEffect(() => {
    fetch("/api/trends/get-pollen")
      .then(res => res.json())
      .then(data => {
        const pollen = data.data?.[0]
        if (!pollen) return
      
        setData([
          { type: "Grass", level: pollen.Count_grass_pollen },
          { type: "Tree", level: pollen.Count_tree_pollen },
          { type: "Weed", level: pollen.Count_weed_pollen }
        ])
      })    
  }, [])

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6">🌼 Pollen Levels</Typography>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="level" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  )
}