import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { SettingsContent } from "@/components/settings-content"

export default function SettingsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-6">
          <SettingsContent />
        </main>
      </div>
    </div>
  )
}
