import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  const { chatSummary } = req.body

  const prompt = `
You are a medical assistant. Given the full chat summary below, extract key details into this JSON structure:

{
  name: string,
  age: string,
  sexAssignedAtBirth: string,
  sexuallyActive: string,
  substancesUsed: string,
  medications: string,
  healthConcerns: string,
  symptoms: string,
  onset: string,
  previousOccurrences: string,
  symptomProgression: string,
  treatmentsTried: string,
  additionalNotes: string,
  diagnosis: string,
  treatment: string
}

If a field is not mentioned, leave it as an empty string. Do not make anything up.

Chat Summary:
${chatSummary}

Return only valid JSON. Do not add any other text.
`

  const response = await fetch("https://api.cohere.ai/v1/generate", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "command", // You can switch to "command-r" if preferred
      prompt,
      temperature: 0.3,
      max_tokens: 800,
    }),
  })

  const data = await response.json()
  const rawText = data.generations?.[0]?.text?.trim()

  try {
    const parsed = JSON.parse(rawText)
    res.status(200).json(parsed)
  } catch (error) {
    res.status(500).json({ error: "Invalid JSON output from LLM", raw: rawText })
  }
}