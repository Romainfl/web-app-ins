
import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/lib/translations"
import LanguageToggle from "@/components/LanguageToggle"

const HomePage = () => {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = translations[language].home

  useEffect(() => {
    window.utag_data = {
      tealium_account: "edu-romain-fleury",
      tealium_profile: "cpt2",
      tealium_datasource: "iaai2x",
      page_type: "home",
      site_section: "main",
      site_language: language
    }
    
    if (window.utag && window.utag.view) {
      window.utag.view(window.utag_data)
    }
  }, [language])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative"
    >
      <LanguageToggle />
      
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
          >
            {t.title}
          </motion.h1>
          <p className="text-xl text-gray-600 mb-8">
            {t.subtitle}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate("/form")}
              className="text-lg px-8 py-6 h-auto"
            >
              {t.cta}
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">{t.services.auto.title}</h3>
            <p className="text-gray-600">{t.services.auto.description}</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">{t.services.home.title}</h3>
            <p className="text-gray-600">{t.services.home.description}</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">{t.services.health.title}</h3>
            <p className="text-gray-600">{t.services.health.description}</p>
          </motion.div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.whyUs.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.whyUs.reasons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 * index }}
                className="bg-blue-50 p-4 rounded-lg"
              >
                <p className="font-medium text-gray-900">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HomePage
