import type { NextApiRequest, NextApiResponse } from "next"

type FluEpidataEntry = {
  epiweek: number
  num_ili: number
}

type DelphiFluResponse = {
  result: number
  message?: string
  epidata: FluEpidataEntry[]
}

function getISOWeek(date: Date): number {
  const temp = new Date(date.getTime())
  temp.setHours(0, 0, 0, 0)
  temp.setDate(temp.getDate() + 3 - ((temp.getDay() + 6) % 7))
  const week1 = new Date(temp.getFullYear(), 0, 4)
  return (
    1 +
    Math.round(
      ((temp.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7
    )
  )
}

function getRecentEpiweeks(count = 5): string[] {
  const today = new Date()
  const year = today.getFullYear()
  const currentWeek = getISOWeek(today)

  return Array.from({ length: count }, (_, i) => {
    const week = currentWeek - (count - 1) + i
    return `${year}${week.toString().padStart(2, "0")}`
  })
}

function formatEpiweek(epiweek: number): string {
  const year = Math.floor(epiweek / 100)
  const week = epiweek % 100
  const jan4 = new Date(year, 0, 4)
  const firstWeekStart = new Date(jan4)
  firstWeekStart.setDate(jan4.getDate() - (jan4.getDay() + 6) % 7)

  const weekStart = new Date(firstWeekStart)
  weekStart.setDate(weekStart.getDate() + (week - 1) * 7)

  return weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const epiweeks = getRecentEpiweeks()
  const url = `https://api.delphi.cmu.edu/epidata/fluview/?regions=nat&epiweeks=${epiweeks.join(",")}&api_key=${process.env.DELPHI_API_KEY}`

  try {
    const response = await fetch(url)
    const result: DelphiFluResponse = await response.json()

    if (result.result !== 1) {
      return res.status(500).json([])
    }

    const formatted = result.epidata.map((entry) => ({
      weekLabel: formatEpiweek(entry.epiweek),
      iliCases: entry.num_ili,
    }))

    res.status(200).json(formatted)
  } catch {
    res.status(500).json([])
  }
}