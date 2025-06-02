import type { NextApiRequest, NextApiResponse } from "next"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  const chatHistory = req.body.chatHistory as Message[]

  const formattedHistory = chatHistory
    .map((m) => `${m.role === "user" ? "Patient" : "Assistant"}: ${m.content}`)
    .join("\n")

  const prompt = `
    You are a warm, professional virtual medical assistant. Based on the intake conversation below, speak directly to the patient and provide:

    1. A friendly, empathetic explanation of their likely diagnosis
    2. A brief, clear treatment plan with practical next steps

    Be conversational and kind — like you're explaining things in person to help them feel understood and supported. Respond in this JSON format:

    {
      "diagnosis": "Write the explanation to the patient here.",
      "treatment": "Write the treatment plan directly to the patient here."
    }

    Conversation:
    ${formattedHistory}
  `

  try {
    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command",
        prompt,
        temperature: 0.5,
        max_tokens: 500,
      }),
    })

    const data = await response.json()
    const text = data.generations?.[0]?.text?.trim() || ""

    // Extract and parse JSON safely
    const start = text.indexOf("{")
    const end = text.lastIndexOf("}") + 1
    const jsonString = text.slice(start, end)

    const result = JSON.parse(jsonString)

    return res.status(200).json({
      diagnosis: result.diagnosis ?? "No diagnosis returned.",
      treatment: result.treatment ?? "No treatment returned.",
    })
  } catch (error) {
    console.error("Diagnosis API error:", error)
    return res.status(500).json({
      diagnosis: "Unable to generate a diagnosis.",
      treatment: "Please try again later.",
    })
  }
}