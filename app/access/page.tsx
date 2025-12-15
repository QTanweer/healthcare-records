import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AccessControlContent } from "@/components/access-control-content"

export default function AccessPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-6">
          <AccessControlContent />
        </main>
      </div>
    </div>
  )
}
