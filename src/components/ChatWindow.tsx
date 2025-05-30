import { useEffect, useRef, useState } from "react"
import { Box, Stack, Button } from "@mui/material"
import ChatBubble from "./ChatBubble"
import ChatInput from "./ChatInput"

type Message = {
  role: "user" | "assistant"
  content: string
  isConfirmation?: boolean
}

const questions = [
  "Before we begin, may I get your full name?",
  "Thanks! And how old are you?",
  "What sex were you assigned at birth? (Male, Female, or Other)",
  "Are you currently sexually active?",
  "Do you smoke, drink alcohol, or use any recreational drugs?",
  "Do you currently take any medications, vitamins, or supplements — prescribed or over-the-counter?",
  "Do you have any chronic conditions, allergies, or other health concerns I should know about?",
  "What symptoms have you been experiencing?",
  "When did these symptoms first begin?",
  "Have you experienced anything like this before?",
  "Would you say your symptoms are improving, worsening, or staying about the same?",
  "Have you tried anything to relieve or treat the symptoms — like rest, medication, home remedies, or seeing a doctor?",
  "Thanks for sharing all of that. Is there anything else you'd like me to know?",
]

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [step, setStep] = useState(0)
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages([{ role: "assistant", content: questions[0] }])
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, awaitingConfirmation])

  const addMessage = (msg: Message) => {
    setMessages(prev => [...prev, msg])
  }

  const handleSend = (input: string) => {
    if (!input.trim() || awaitingConfirmation) return

    addMessage({ role: "user", content: input })
    setAnswers(prev => [...prev, input])
    setAwaitingConfirmation(true)

    addMessage({
      role: "assistant",
      content: `You said: "${input}". Is that correct?`,
      isConfirmation: true,
    })
  }

  const handleConfirm = (confirmed: boolean) => {
    setAwaitingConfirmation(false)

    if (confirmed) {
      setMessages(prev => prev.slice(0, -1)) // remove confirmation only
      const nextStep = step + 1
      setStep(nextStep)

      if (nextStep < questions.length) {
        addMessage({ role: "assistant", content: questions[nextStep] })
      } else {
        // Final step: call API for diagnosis
        addMessage({ role: "assistant", content: "Thank you. Let me review your responses..." })
      
        fetch("/api/get-diagnosis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatHistory: messages }),
        })
          .then(res => res.json())
          .then(data => {
            addMessage({ role: "assistant", content: `📋 Diagnosis:\n${data.diagnosis}` })
            addMessage({ role: "assistant", content: `💊 Treatment Plan:\n${data.treatment}` })
          })
          .catch(() => {
            addMessage({ role: "assistant", content: "Sorry, I wasn't able to generate a diagnosis at this time." })
          })
      }      
    } else {
      setAnswers(prev => prev.slice(0, -1))
      setMessages(prev => prev.slice(0, -3)) // remove Q, A, and confirmation
      addMessage({ role: "assistant", content: questions[step] })
    }
  }

  return (
    <Stack spacing={2} sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
      <Box
        sx={{
          height: 400,
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: 2,
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((m, i) => (
          <ChatBubble key={i} from={m.role} message={m.content} />
        ))}

        {awaitingConfirmation && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1 }}>
            <Button variant="outlined" onClick={() => handleConfirm(true)}>
              Yes
            </Button>
            <Button variant="outlined" color="error" onClick={() => handleConfirm(false)}>
              No
            </Button>
          </Box>
        )}

        {/* Auto scroll anchor */}
        <div ref={scrollRef} />
      </Box>

      <ChatInput onSend={handleSend} disabled={awaitingConfirmation} />
    </Stack>
  )
}