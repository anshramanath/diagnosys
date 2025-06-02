import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lat = req.query.lat || '37.7749'
  const lon = req.query.lon || '-122.4194'
  const apiKey = process.env.AMBEE_API_KEY

  try {
    const response = await fetch(`https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=${lat}&lng=${lon}`, {
      headers: { 'x-api-key': apiKey as string }
    })
    const data = await response.json()

    console.log("pollen", data)
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pollen data' })
  }
}