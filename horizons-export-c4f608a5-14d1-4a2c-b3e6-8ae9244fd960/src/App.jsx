
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "@/components/HomePage"
import InsuranceForm from "@/components/InsuranceForm"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/contexts/LanguageContext"

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<InsuranceForm />} />
        </Routes>
        <Toaster />
      </Router>
    </LanguageProvider>
  )
}

export default App
