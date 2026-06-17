import { createContext, useContext, useState } from 'react'
import { strings } from '../i18n/strings'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('es')
  const toggle = () => setLang(l => l === 'es' ? 'en' : 'es')
  const t = strings[lang]
  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
