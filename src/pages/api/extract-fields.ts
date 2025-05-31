import type { NextApiRequest, NextApiResponse } from "next"

type Message = { role: "user" | "assistant"; content: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  const { chatSummary }: { chatSummary: Message[] } = req.body

  const transcript = chatSummary
    .map(m => `${m.role === "user" ? "Patient" : "Assistant"}: ${m.content}`)
    .join("\n")

  const prompt = `
    You are a clinical documentation assistant. Given the transcript of a medical intake conversation, extract key patient details into a professional, clean JSON format.
    
    Follow these rules strictly:
    - Use proper capitalization and punctuation.
    - Standardize answers to "Yes", "No", or "N/A" instead of casual responses like "yep", "nope", or blanks.
    - If something is not mentioned or is unclear, use "N/A".
    - Fix common misspellings (e.g., "claritn" → "Claritin"), especially for known medications, conditions, or terms. Do not alter or guess user intent beyond this.
    - Strip filler words or overly casual language.
    - Keep responses medically relevant, concise, and suitable for a formal health record.
    - Output must be valid **JSON only** — no explanations, comments, markdown, or formatting.
    
    Format:
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
    
    Transcript:
    ${transcript}
  `    

  const response = await fetch("https://api.cohere.ai/v1/generate", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "command",
      prompt,
      temperature: 0.3,
      max_tokens: 800,
    }),
  })

  const data = await response.json()
  const text = data.generations?.[0]?.text?.trim() || ""
  console.log(text)

  try {
    // Safely extract JSON block
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error("No JSON found in response")

    let jsonString = jsonMatch[0]

    // Fix common formatting issues from LLM
    jsonString = jsonString
      .replace(/[“”]/g, '"') // curly quotes
      .replace(/\t/g, " ")   // tabs to spaces
      .replace(/\\n/g, "\\n")
      .replace(/\\r/g, "\\r")

    const parsed = JSON.parse(jsonString)

    res.status(200).json(parsed)
  } catch (error) {
    res.status(500).json({ error: "Invalid JSON output from LLM", raw: text })
  }
}