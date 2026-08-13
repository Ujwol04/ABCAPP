import { useState } from "react"
import { FileText, Plus, Search } from "lucide-react"
import PageHeader from "@Components/common/PageHeader"
import { Button } from "@Components/ui/Button"
import { Badge } from "@Components/ui/Badge"
import { Input } from "@Components/ui/Input"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@Components/ui/Table"
import { useAbcStore } from "@/store/abcStore"
import GenerateDocumentDialog from "@Components/documents/GenerateDocumentDialog"
import type { DocTemplate } from "@Types/abc"

const STATUS_VARIANT: Record<string, "secondary" | "outline" | "default"> = {
  Draft: "secondary",
  Final: "default",
  Sent: "outline",
}

export default function Documents() {
  const documents = useAbcStore((s) => s.documents)
  const templates = useAbcStore((s) => s.templates)
  const [query, setQuery] = useState("")
  const [genTarget, setGenTarget] = useState<DocTemplate | null>(null)

  const filtered = documents.filter(
    (d) =>
      d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.id.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Documents"
        description="Generated from your templates"
        icon={<FileText className="size-5" />}
        action={
          <Button onClick={() => setGenTarget(templates[0] ?? null)} disabled={templates.length === 0}>
            <Plus className="size-4" /> New document
          </Button>
        }
      />

      <div className="relative w-72">
        <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-8"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((d) => {
              const template = templates.find((t) => t.id === d.templateId)
              return (
                <TableRow key={d.id}>
                  <TableCell className="text-muted-foreground">{d.id}</TableCell>
                  <TableCell className="font-semibold text-foreground">{d.title}</TableCell>
                  <TableCell className="text-muted-foreground">{template?.name ?? "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{d.date}</TableCell>
                  <TableCell><Badge variant={STATUS_VARIANT[d.status]}>{d.status}</Badge></TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">No documents match your search.</div>
        )}
      </div>

      <GenerateDocumentDialog template={genTarget} onOpenChange={(open) => !open && setGenTarget(null)} />
    </div>
  )
}