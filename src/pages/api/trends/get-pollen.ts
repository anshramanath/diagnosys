import type { NextApiRequest, NextApiResponse } from 'next'

type PollenEntry = {
  date: {
    year: number
    month: number
    day: number
  }
  pollenTypeInfo?: PollenData[]
  plantInfo?: PollenData[]
}

type PollenData = {
  code: string
  indexInfo?: {
    category: string
  }
}

type PollenApiResponse = {
  dailyInfo?: PollenEntry[]
}

const categoryToValue = (category: string): number => {
  switch (category) {
    case 'None': return 0
    case 'Very Low': return 1
    case 'Low': return 2
    case 'Moderate': return 3
    case 'High': return 4
    case 'Very High': return 5
    case 'Extreme': return 6
    default: return 0
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lat = req.query.lat || '37.7749'
  const lon = req.query.lon || '-122.4194'

  try {
    const response = await fetch(
      `https://pollen.googleapis.com/v1/forecast:lookup?key=${process.env.GOOGLE_API_KEY}&location.latitude=${lat}&location.longitude=${lon}&days=3`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )

    const raw: PollenApiResponse = await response.json()

    const forecasts = raw.dailyInfo?.map((entry) => {
      const date = new Date(entry.date.year, entry.date.month - 1, entry.date.day)
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

      const getPollenCategory = (data: PollenData[] | undefined, code: string) => {
        const item = data?.find((d) => d.code === code)
        return categoryToValue(item?.indexInfo?.category || 'None')
      }

      return {
        date: formattedDate,
        tree: getPollenCategory(entry.pollenTypeInfo, 'TREE'),
        grass: getPollenCategory(entry.plantInfo, 'GRAMINALES'),
        pine: getPollenCategory(entry.plantInfo, 'PINE'),
      }
    }) || []

    res.status(200).json(forecasts)
  } catch (err) {
    console.error('Pollen API error:', err)
    res.status(500).json({ error: 'Failed to fetch pollen data' })
  }
}