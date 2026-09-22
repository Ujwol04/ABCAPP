import { useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Save, Trash2, Plus, Upload, FileText, Zap } from "lucide-react"
import { Button } from "@Components/ui/Button"
import { Input } from "@Components/ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@Components/ui/Select"
import { useAbcStore } from "@/store/abcStore"
import type { DocTemplate, TemplateCategory, TemplateField } from "@Types/types"

const CATEGORIES: TemplateCategory[] = ["Invoice", "Letter", "Report", "Other"]

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/(^_|_$)/g, "")
}

export default function EditTemplate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const templates = useAbcStore((s) => s.templates)
  const updateTemplate = useAbcStore((s) => s.updateTemplate)

  const original = templates.find((t) => t.id === id)
  const [draft, setDraft] = useState<DocTemplate | null>(original ?? null)

  if (!draft) {
    return <div className="p-6 text-sm text-muted-foreground">Template not found.</div>
  }

  const updateFieldAt = (index: number, patch: Partial<TemplateField>) => {
    setDraft({
      ...draft,
      fields: draft.fields.map((f, i) => (i === index ? { ...f, ...patch } : f)),
    })
  }

  const removeFieldAt = (index: number) => {
    setDraft({ ...draft, fields: draft.fields.filter((_, i) => i !== index) })
  }

  const addField = () => {
    const newField: TemplateField = { key: "new_field", label: "New field", type: "text" }
    setDraft({ ...draft, fields: [...draft.fields, newField] })
  }

  const insertIntoDocument = (field: TemplateField) => {
    setDraft({ ...draft, content: `${draft.content ?? ""}{{${field.key}}}` })
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setDraft({ ...draft, docxFileName: file.name })
  }

  const handleSave = () => {
    updateTemplate(draft.id, {
      name: draft.name,
      category: draft.category,
      description: draft.description,
      content: draft.content,
      docxFileName: draft.docxFileName,
      fields: draft.fields,
    })
    navigate("/templates")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-md p-1 hover:bg-muted"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold">Edit Template</h1>
            <p className="text-sm text-muted-foreground">
              Write your document and mark dynamic spots with{" "}
              <code className="rounded bg-muted px-1">{"{{field}}"}</code>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/templates")}>Cancel</Button>
          <Button onClick={handleSave}><Save className="size-4" /> Save</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-6">
          {/* Title / Category / Description */}
          <div className="rounded-xl border p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={draft.category}
                  onValueChange={(v) => setDraft({ ...draft, category: v as TemplateCategory })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-1.5">
              <label className="text-sm font-medium">Description</label>
              <Input
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              />
            </div>
          </div>

          {/* Word file upload */}
          <div className="rounded-xl border p-6">
            <div className="mb-1 flex items-center gap-2 font-medium">
              <FileText className="size-4" /> Word template file (.docx)
              <span className="text-xs font-normal text-muted-foreground">— optional</span>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">
              Upload a .docx with <code className="rounded bg-muted px-1">{"{{field_name}}"}</code>{" "}
              placeholders. When attached, the file becomes the document body and the text content
              below is ignored.
            </p>
            <label className="flex cursor-pointer flex-col items-center gap-1 rounded-lg border border-dashed p-10 text-center hover:bg-muted/50">
              <Upload className="size-5" />
              <span className="font-medium">
                {draft.docxFileName ? draft.docxFileName : "Click to upload a .docx"}
              </span>
              <span className="text-xs text-muted-foreground">Your Word file with placeholders</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".docx"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          </div>

          {/* Document content */}
          <div className="rounded-xl border p-6">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium">
                <FileText className="size-4" /> Document content
              </div>
              <span className="text-xs text-muted-foreground">
                Use <code className="rounded bg-muted px-1">{"{{field_name}}"}</code> for dynamic values
              </span>
            </div>
            <textarea
              className="min-h-64 w-full rounded-lg border bg-transparent p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              value={draft.content ?? ""}
              onChange={(e) => setDraft({ ...draft, content: e.target.value })}
              disabled={!!draft.docxFileName}
            />
          </div>
        </div>

        {/* Dynamic Fields */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <Zap className="size-4" /> Dynamic Fields
            </span>
            <Button size="sm" variant="outline" onClick={addField}>
              <Plus className="size-4" /> Add
            </Button>
          </div>

          {draft.fields.map((field, index) => (
            <div key={index} className="rounded-xl border p-4">
              <div className="mb-2 flex items-center justify-between">
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{`{{${field.key}}}`}</code>
                <button
                  type="button"
                  onClick={() => removeFieldAt(index)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  value={field.key}
                  onChange={(e) => updateFieldAt(index, { key: slugify(e.target.value) })}
                  placeholder="field_key"
                />
                <Input
                  value={field.label}
                  onChange={(e) => updateFieldAt(index, { label: e.target.value })}
                  placeholder="Field label"
                />
                <select
                  className="rounded-lg border bg-transparent px-2.5 py-1.5 text-sm"
                  value={field.type}
                  onChange={(e) =>
                    updateFieldAt(index, { type: e.target.value as TemplateField["type"] })
                  }
                >
                  <option value="text">Short text</option>
                  <option value="date">Date</option>
                </select>
                <Input
                  value={field.defaultValue ?? ""}
                  onChange={(e) => updateFieldAt(index, { defaultValue: e.target.value })}
                  placeholder="Default value (optional)"
                />
                <button
                  type="button"
                  onClick={() => insertIntoDocument(field)}
                  className="mt-1 flex items-center justify-center gap-1 text-sm font-medium hover:underline"
                >
                  <Plus className="size-3.5" /> Insert into document
                </button>
              </div>
            </div>
          ))}

          {draft.fields.length === 0 && (
            <p className="text-sm text-muted-foreground">No fields yet. Click "Add" to create one.</p>
          )}
        </div>
      </div>
    </div>
  )
}