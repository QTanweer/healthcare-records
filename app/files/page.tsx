import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { FileManagerContent } from "@/components/file-manager-content"

export default function FilesPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-6">
          <FileManagerContent />
        </main>
      </div>
    </div>
  )
}
