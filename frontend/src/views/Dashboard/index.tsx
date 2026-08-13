// tsrafce
// rafce
import { useState } from "react"
import { Copy } from "lucide-react"
import { Card } from "@Components/ui/Card"
import { Badge } from "@Components/ui/Badge"
import { Button } from "@Components/ui/Button"
import { useAbcStore } from "@/store/abcStore"
import GenerateDocumentDialog from "@Components/documents/GenerateDocumentDialog"
import type { DocTemplate } from "@Types/abc"

const STATUS_VARIANT: Record<string, "secondary" | "outline" | "default"> = {
  Draft: "secondary",
  Final: "default",
  Sent: "outline",
}

function Metric({ label, value, sub }: { label: string; value: string | number; sub: string }) {
  return (
    <Card className="p-4">
      <div className="mb-2 text-xs font-medium text-muted-foreground">{label}</div>
      <div className="text-2xl font-extrabold text-foreground">{value}</div>
      <div className="mt-1.5 text-xs font-semibold text-amber-600">{sub}</div>
    </Card>
  )
}

const Dashboard = () => {
  const templates = useAbcStore((s) => s.templates)
  const documents = useAbcStore((s) => s.documents)
  const [genTarget, setGenTarget] = useState<DocTemplate | null>(null)

  const draftCount = documents.filter((d) => d.status === "Draft").length
  const mostUsed = [...templates].sort((a, b) => b.uses - a.uses)[0]
  const recent = documents.slice(0, 5)

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-extrabold uppercase tracking-tight text-foreground">Dashboard</h1>

      <div className="grid grid-cols-4 gap-3">
        <Metric label="Templates" value={templates.length} sub="Active" />
        <Metric label="Documents generated" value={documents.length} sub="All time" />
        <Metric label="Drafts pending" value={draftCount} sub="Needs review" />
        <Metric label="Most used template" value={mostUsed?.name ?? "—"} sub={mostUsed ? `${mostUsed.uses} uses` : ""} />
      </div>

      <Card className="p-0">
        <div className="border-b border-border px-4 py-3 text-sm font-bold text-foreground">Recent documents</div>
        {recent.map((doc) => {
          const template = templates.find((t) => t.id === doc.templateId)
          return (
            <div key={doc.id} className="flex items-center gap-4 border-b border-border px-4 py-3 text-sm last:border-b-0">
              <span className="w-20 text-xs text-muted-foreground">{doc.id}</span>
              <span className="flex-1 font-medium text-foreground">{doc.title}</span>
              <span className="w-24 text-xs text-muted-foreground">{doc.date}</span>
              <Badge variant={STATUS_VARIANT[doc.status]}>{doc.status}</Badge>
              {template && (
                <Button size="sm" onClick={() => setGenTarget(template)}>
                  <Copy className="size-3" /> Use
                </Button>
              )}
            </div>
          )
        })}
        {recent.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-muted-foreground">No documents yet.</div>
        )}
      </Card>

      <GenerateDocumentDialog template={genTarget} onOpenChange={(open) => !open && setGenTarget(null)} />
    </div>
  )
}

export default Dashboard