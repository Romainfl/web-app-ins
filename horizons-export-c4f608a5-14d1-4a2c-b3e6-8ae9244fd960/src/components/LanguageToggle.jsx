
import React from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/lib/translations"
import { motion } from "framer-motion"

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-4 right-4"
    >
      <Button
        variant="outline"
        onClick={toggleLanguage}
        className="text-sm"
      >
        {translations[language].nav[`switchTo${language === "fr" ? "En" : "Fr"}`]}
      </Button>
    </motion.div>
  )
}

export default LanguageToggle
