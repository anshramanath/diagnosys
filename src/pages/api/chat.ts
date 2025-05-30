import type { NextApiRequest, NextApiResponse } from "next"

const systemPrompt = `
    You are a concise and professional virtual medical assistant. Ask one question at a time to collect the following medical details from the user.

    Use the exact prompts below, in this order:

    1. "How old are you?"
    2. "What symptoms are you experiencing?"
    3. "When did your symptoms start?"
    4. "Have your symptoms gotten better, worse, or stayed the same?"
    5. "Have you tried anything to treat them?"
    6. "Do you have any other health issues I should know about?"

    **Rules**:
    - Ask exactly one question at a time
    - Do not continue until the current question has been answered
    - If the user changes a previous answer, acknowledge the update but continue with the current question
    - If the user gives an unclear responses, clarify and re-ask the current question
    - Be extremely concise (under 25 tokens), professional, and easy to understand
    - Never add fluff, summaries, or personal opinions
    - Don't quote things and just converse like a human being would
    - Do not skip ahead or answer your own questions
    - Your first question is already asked: start from “How old are you?”
`


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  const { messages } = req.body

  // Combine messages into one string (Cohere uses a prompt, not chat format)
  const chatHistory = messages.map((m: any) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n")
  const fullPrompt = `${systemPrompt}\n\n${chatHistory}\nAssistant:`

  const response = await fetch("https://api.cohere.ai/v1/generate", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "command", // or "command" or "command-nightly"
      prompt: fullPrompt,
      max_tokens: 100,
      temperature: 0.7,
    }),
  })

  const data = await response.json()
  const reply = data.generations?.[0]?.text?.trim() || "Sorry, I couldn’t generate a response"
  res.status(200).json({ reply })
}