import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Copy,
  FileText,
  Search,
  Eye,
  Download,
  ChevronDown,
  Trash2,
} from "lucide-react"
import { Button } from "@Components/ui/Button"
import { Badge } from "@Components/ui/Badge"
import { Input } from "@Components/ui/Input"
import { useAbcStore } from "@/store/abcStore"

const CATEGORY_LABEL: Record<string, string> = {
  Invoice: "Finance",
  Letter: "Email",
  Report: "Notes",
  Other: "Other",
}

export default function Documents() {
  const navigate = useNavigate()
  const documents = useAbcStore((s) => s.documents)
  const templates = useAbcStore((s) => s.templates)
  const [query, setQuery] = useState("")

  const filtered = documents.filter(
    (d) =>
      d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.id.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="size-4" />
          </Button>
          <div className="flex size-9 items-center justify-center rounded-xl bg-foreground text-background">
            <Copy className="size-4" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">Generated documents</h1>
            <p className="text-sm text-muted-foreground">Documents you've filled in and saved</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate("/templates")}>
          <FileText className="size-4" /> Browse templates
        </Button>
      </div>

      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search generated documents..."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((doc) => {
          const template = templates.find((t) => t.id === doc.templateId)
          const entries = Object.entries(doc.values).filter(([, v]) => v)
          return (
            <div key={doc.id} className="flex flex-col rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <FileText className="size-4 text-muted-foreground" />
                </div>
                {template && (
                  <Badge variant="secondary" className="font-medium">
                    {CATEGORY_LABEL[template.category] ?? template.category}
                  </Badge>
                )}
              </div>

              <div className="font-semibold text-foreground">{doc.title}</div>
              {template && (
                <div className="mt-0.5 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  From: {template.name}
                </div>
              )}

              <div className="mt-3 flex flex-col gap-1 text-sm">
                {entries.slice(0, 3).map(([label, value]) => (
                  <div key={label} className="truncate text-muted-foreground">
                    {label}: <span className="text-foreground">{value}</span>
                  </div>
                ))}
                {entries.length === 0 && (
                  <div className="text-muted-foreground">No fields filled in</div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                <Button size="sm" className="flex-1">
                  <Eye className="size-3.5" /> View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="size-3.5" /> Download <ChevronDown className="size-3.5" />
                </Button>
                <Button size="icon-sm" variant="outline" className="text-destructive hover:text-destructive">
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No generated documents yet.
        </div>
      )}
    </div>
  )
}