"use client"

import { useState } from "react"
import ChatWindow from "@/components/ChatWindow"
import DisclaimerDialog from "@/components/DisclaimerDialog"
import StartOverDialog from "@/components/StartOverDialog"

export default function HomePage() {
  const [accepted, setAccepted] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <>
      <DisclaimerDialog open={!accepted} onAccept={() => setAccepted(true)} />
      <StartOverDialog open={confirmReset} onConfirm={() => window.location.reload()} onCancel={() => setConfirmReset(false)} />
      {accepted && <ChatWindow onStartOver={() => setConfirmReset(true)} />}
    </>
  )
}