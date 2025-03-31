
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/lib/translations"
import LanguageToggle from "@/components/LanguageToggle"

const InsuranceForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = translations[language].form

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    insuranceType: "",
    birthDate: "",
  })

  useEffect(() => {
    window.utag_data = {
      tealium_account: "edu-romain-fleury",
      tealium_profile: "cpt2",
      tealium_datasource: "iaai2x",
      page_type: "form",
      site_section: "insurance",
      site_language: language
    }
    
    if (window.utag && window.utag.view) {
      window.utag.view(window.utag_data)
    }
  }, [language])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      insuranceType: value
    }))
  }

  const sendToTealium = (data) => {
    if (window.utag) {
      window.utag.link({
        tealium_event: "form_submission",
        tealium_account: "edu-romain-fleury",
        tealium_profile: "cpt2",
        tealium_datasource: "iaai2x",
        form_name: "insurance_request",
        form_type: "insurance",
        insurance_type: data.insuranceType,
        customer_email: data.email,
        customer_phone: data.phone,
        customer_address: data.address,
        customer_birthdate: data.birthDate,
        event_category: "form",
        event_action: "submit",
        event_label: "insurance_form",
        site_language: language
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!Object.values(formData).every(value => value)) {
      toast({
        title: t.validation.error,
        description: t.validation.fillAllFields,
        variant: "destructive"
      })
      return
    }

    localStorage.setItem('insuranceFormData', JSON.stringify(formData))
    sendToTealium(formData)
    
    toast({
      title: t.validation.success,
      description: t.validation.successMessage
    })

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      insuranceType: "",
      birthDate: "",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <LanguageToggle />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
          >
            {translations[language].nav.back}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t.fields.firstName}</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t.placeholders.firstName}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">{t.fields.lastName}</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t.placeholders.lastName}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t.fields.email}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.placeholders.email}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t.fields.phone}</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t.placeholders.phone}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">{t.fields.address}</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder={t.placeholders.address}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="insuranceType">{t.fields.insuranceType}</Label>
            <Select onValueChange={handleSelectChange} value={formData.insuranceType}>
              <SelectTrigger>
                <SelectValue placeholder={t.placeholders.insuranceType} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(t.insuranceTypes).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">{t.fields.birthDate}</Label>
            <Input
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button type="submit" className="w-full">
              {t.submit}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}

export default InsuranceForm
