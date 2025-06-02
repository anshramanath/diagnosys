import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://disease.sh/v3/covid-19/countries/USA')
    const data = await response.json()
    
    console.log("covid", data)
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch COVID-19 data' })
  }
}