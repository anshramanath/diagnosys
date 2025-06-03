import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lat = req.query.lat || '37.7749'  // San Francisco default
  const lon = req.query.lon || '-122.4194'

  try {
    const response = await fetch(
      `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: {
            latitude: parseFloat(lat as string),
            longitude: parseFloat(lon as string),
          },
        }),
      }
    )

    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    console.error('Pollution API error:', err)
    res.status(500).json({ error: 'Failed to fetch pollution data' })
  }
}