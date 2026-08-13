"use client"

import "@/lib/i18n"

import { useTranslation } from "react-i18next"
import { LanguageToggle } from "@/components/common/LanguageToggle"
import PostForm from "@/components/PostForm"

function App() {
  const { t, i18n } = useTranslation()

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">

      {/* Top-right toggle */}
      <div className="flex justify-end p-4">
        <LanguageToggle />
      </div>

      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold">
          {t("welcome")}
        </h1>

        <p className="text-muted-foreground">
          Current Language: {i18n.language}
        </p>

        <div className="flex gap-4 mt-4">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
            {t("auth:login")}
          </button>

          <button className="px-4 py-2 bg-destructive text-white rounded">
            {t("auth:logout")}
          </button>
        </div>
      </div>


      {/* Render the Form Component */}
      <div className="mt-12 px-4">
        <PostForm />
      </div>

    </div>
  )
}

export default App