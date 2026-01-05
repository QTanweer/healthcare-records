import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ActivityLogContent } from "@/components/activity-log-content"

export default function ActivityPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-6">
          <ActivityLogContent />
        </main>
      </div>
    </div>
  )
}
