import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Save, Trash2, Plus, FileText } from "lucide-react"
import PageHeader from "@Components/common/PageHeader"
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

export default function EditTemplate() {
  const { id } = useParams()
  const navigate = useNavigate()

  const templates = useAbcStore((s) => s.templates)
  const updateTemplate = useAbcStore((s) => s.updateTemplate)

  const original = templates.find((t) => t.id === id)

  const [draft, setDraft] = useState<DocTemplate | null>(original ?? null)

  if (!draft) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Template not found.
      </div>
    )
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
    const newField: TemplateField = { label: "New field", type: "text" }
    setDraft({ ...draft, fields: [...draft.fields, newField] })
  }

  const handleSave = () => {
    updateTemplate(draft.id, {
      name: draft.name,
      category: draft.category,
      description: draft.description,
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
          <PageHeader
            title="Edit Template"
            description="Update the details and dynamic fields for this template"
            icon={<FileText className="size-5" />}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/templates")}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="size-4" /> Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
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
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
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

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Dynamic Fields</span>
            <Button size="sm" variant="outline" onClick={addField}>
              <Plus className="size-4" /> Add
            </Button>
          </div>

          {draft.fields.map((field, index) => (
            <div key={index} className="rounded-xl border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Field {index + 1}</span>
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
                  <option value="text">Text</option>
                  <option value="date">Date</option>
                </select>
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