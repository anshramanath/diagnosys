import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("https://healthdata.gov/resource/62u6-ptey.json")
    const data = await response.json()
    console.log("flu", data)

    // Example formatting: national data for latest 5 weeks
    const formatted = data
      .filter((entry: any) => entry.state === "National Estimate")
      .slice(0, 5)
      .map((entry: any) => ({
        week: entry.week_ending,
        cases: parseInt(entry.number_of_influenza_cases || "0"),
      }))
    res.status(200).json(formatted)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch flu data" })
  }
}