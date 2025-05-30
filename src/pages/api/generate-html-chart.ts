import type { NextApiRequest, NextApiResponse } from "next"

const htmlSkeleton = `
<style>
  body {
    margin: 0;
    background: #f4f4f4;
  }

  #pdf-content {
    font-family: "Segoe UI", "Helvetica Neue", sans-serif;
    background: white;
    width: 8.5in;
    min-height: 11in;
    margin: auto;
    padding: 1in;
    box-sizing: border-box;
    color: #222;
    border-radius: 8px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  }

  h2 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 32px;
    padding-bottom: 12px;
    border-bottom: 2px solid #ccc;
    color: #333;
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 12px 20px;
    font-size: 14px;
    margin-bottom: 40px;
  }

  .info-grid .label {
    font-weight: 600;
    color: #444;
    text-align: right;
  }

  .info-grid .value {
    color: #111;
    text-align: left;
  }

  h3 {
    font-size: 18px;
    color: #2c3e50;
    margin-top: 24px;
    margin-bottom: 12px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 6px;
  }

  p {
    font-size: 14px;
    line-height: 1.6;
    color: #2a2a2a;
    margin: 0 0 16px;
  }
</style>

<div id="pdf-content">
  <h2>Patient Chart</h2>

  <div class="info-grid">
    <div class="label">Name:</div><div class="value">{{name}}</div>
    <div class="label">Age:</div><div class="value">{{age}}</div>
    <div class="label">Symptoms:</div><div class="value">{{symptoms}}</div>
    <div class="label">Onset:</div><div class="value">{{onset}}</div>
    <div class="label">Treatment Attempts:</div><div class="value">{{treatment}}</div>
    <div class="label">Other Concerns:</div><div class="value">{{other}}</div>
  </div>

  <h3>Diagnosis</h3>
  <p>{{diagnosis}}</p>

  <h3>Treatment Plan</h3>
  <p>{{plan}}</p>
</div>
`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  const { chatSummary } = req.body

  const prompt = `
You are a professional medical documentation assistant. A patient has just completed a virtual health chat. You are given a raw summary of their answers.

Your task is to fill in the following HTML chart with clean, clear, and professionally written responses. Each field should sound natural and medically appropriate — do not repeat the user's casual language. Use complete sentences and proper grammar.

Make the chart easy to read:
- Rewrite responses clearly and formally
- Use commas and consistent casing
- Summarize symptoms and treatments in medical language
- Do NOT alter the structure or labels of the HTML

Return ONLY the completed HTML. Do NOT wrap it in markdown, do NOT explain anything. Do NOT say "Here is..." — just return raw HTML starting with <div>.

Patient Summary:
${chatSummary}

HTML Template:
${htmlSkeleton}
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
      temperature: 0.5,
      max_tokens: 1000,
    }),
  })

  const data = await response.json()
  const filledHtml = data.generations?.[0]?.text?.trim() || "<div>Failed to generate chart</div>"

  res.status(200).json({ html: filledHtml })
}