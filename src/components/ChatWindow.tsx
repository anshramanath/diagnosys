"use client"

import { useEffect, useRef, useState } from "react"
import { Box, Stack, Button } from "@mui/material"
import Image from "next/image"
import ChatBubble from "./ChatBubble"
import ChatInput from "./ChatInput"
import PDFPreviewModal from "./PDFPreviewModal"

type PdfData = {
  name?: string
  age?: string
  sexAssignedAtBirth?: string
  sexuallyActive?: string
  substancesUsed?: string
  medications?: string
  healthConcerns?: string
  symptoms?: string
  onset?: string
  previousOccurrences?: string
  symptomProgression?: string
  treatmentsTried?: string
  additionalNotes?: string
  diagnosis?: string
  treatment?: string
}

type Message = {
  role: "user" | "assistant"
  content: string
}

const questions = [
  "Before we begin, may I get your full name?",
  "Thanks! And how old are you?",
  "What sex were you assigned at birth? (Male or Female)",
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
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: questions[0] }])
  const [step, setStep] = useState(0)
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false)
  const [pdfData, setPdfData] = useState<PdfData | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [done, setDone] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, awaitingConfirmation])

  const addMessage = (msg: Message) => {
    setMessages(prev => [...prev, msg])
  }

  const handleSend = (input: string) => {
    if (!input.trim() || awaitingConfirmation) return

    addMessage({ role: "user", content: input })
    setAwaitingConfirmation(true)

    addMessage({
      role: "assistant",
      content: `You said: "${input}". Is that correct?`,
    })
  }

  const handleConfirm = (confirmed: boolean) => {
    setAwaitingConfirmation(false)

    if (confirmed) {
      setMessages(prev => prev.slice(0, -1)) // remove confirmation
      const nextStep = step + 1
      setStep(nextStep)

      if (nextStep < questions.length) {
        addMessage({ role: "assistant", content: questions[nextStep] })
      } else {
        setDone(true)
        addMessage({ role: "assistant", content: "Thank you! Let me review your responses..." })

        fetch("/api/get-diagnosis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatHistory: messages }),
        })
          .then(res => res.json())
          .then(data => {
            setMessages(prev => prev.slice(0, -1))
            addMessage({ role: "assistant", content: `📋 Diagnosis:\n${data.diagnosis}` })
            addMessage({ role: "assistant", content: `💊 Treatment Plan:\n${data.treatment}` })
            addMessage({ role: "assistant", content: "Now generating health summary..." })

            return fetch("/api/extract-fields", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chatSummary: [
                  ...messages,
                  { role: "assistant", content: data.diagnosis },
                  { role: "assistant", content: data.treatment }
                ]
              }),
            })
          })
          .then(res => res.json())
          .then(fields => {
            setMessages(prev => prev.slice(0, -1))
            addMessage({ role: "assistant", content: "Your health summary is available!" })
            setPdfData(fields)
          })
          .catch(() => {
            setMessages(prev => prev.slice(0, -1))
            addMessage({ role: "assistant", content: "Sorry, I wasn't able to generate a diagnosis at this time." })
          })
      }
    } else {
      setMessages(prev => prev.slice(0, -2))
    }
  }

  const handleReset = () => {
    setMessages([{ role: "assistant", content: questions[0] }])
    setStep(0)
    setAwaitingConfirmation(false)
    setPdfData(null)
    setShowPreview(false)
    setDone(false)
  }

  return (
    <Stack spacing={2} sx={{ position: "relative", height: "100%", display: "flex" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Button 
          variant="outlined" 
          disabled={!pdfData} 
          onClick={() => setShowPreview(true)} 
          sx={{ textTransform: "none" }}
        >
          Health Summary
        </Button>
        <Box onClick={handleReset} sx={{ cursor: "pointer" }}>
          <Image src="/reset.png" alt="Reset" width={28} height={28} />
        </Box>
      </Box>

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

        {awaitingConfirmation && !done && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1 }}>
            <Button variant="outlined" onClick={() => handleConfirm(true)} sx={{ textTransform: "none" }}>Yes</Button>
            <Button variant="outlined" color="error" onClick={() => handleConfirm(false)} sx={{ textTransform: "none" }}>No</Button>
          </Box>
        )}

        <div ref={scrollRef} />
      </Box>

      <ChatInput onSend={handleSend} disabled={awaitingConfirmation || done} />
      <PDFPreviewModal open={showPreview} onClose={() => setShowPreview(false)} structuredData={pdfData} />
    </Stack>
  )
}