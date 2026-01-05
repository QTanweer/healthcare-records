import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { DashboardContent } from "@/components/dashboard-content"

export default function HomePage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-6">
          <DashboardContent />
        </main>
      </div>
    </div>
  )
}
