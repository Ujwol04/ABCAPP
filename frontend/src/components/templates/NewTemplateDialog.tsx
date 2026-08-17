import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@Components/ui/Dialog"
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
import type { TemplateCategory, TemplateField } from "@Types/ABC"

const CATEGORIES: TemplateCategory[] = ["Invoice", "Letter", "Report", "Other"]

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewTemplateDialog({ open, onOpenChange }: Props) {
  const addTemplate = useAbcStore((s) => s.addTemplate)
  const [name, setName] = useState("")
  const [category, setCategory] = useState<TemplateCategory>("Invoice")
  const [description, setDescription] = useState("")
  const [fields, setFields] = useState<TemplateField[]>([{ label: "", type: "text" }])

  const reset = () => {
    setName("")
    setCategory("Invoice")
    setDescription("")
    setFields([{ label: "", type: "text" }])
  }

  const handleCreate = () => {
    if (!name.trim()) return
    addTemplate({
      name,
      category,
      description,
      fields: fields.filter((f) => f.label.trim()),
    })
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New template</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Template name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Freelance Invoice" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Category</label>
            <Select value={category} onValueChange={(v) => setCategory(v as TemplateCategory)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Description</label>
            <textarea
              className="min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this template for?"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted-foreground">Dynamic fields</label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setFields((f) => [...f, { label: "", type: "text" }])}
            >
              <Plus className="size-3.5" /> Add field
            </Button>
          </div>
          {fields.map((f, i) => (
            <div key={i} className="flex gap-2">
              <Input
                className="flex-[2]"
                value={f.label}
                onChange={(e) =>
                  setFields((fl) => fl.map((x, idx) => (idx === i ? { ...x, label: e.target.value } : x)))
                }
                placeholder="Field label"
              />
              <Select
                value={f.type}
                onValueChange={(v) =>
                  setFields((fl) => fl.map((x, idx) => (idx === i ? { ...x, type: v as "text" | "date" } : x)))
                }
              >
                <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setFields((fl) => fl.filter((_, idx) => idx !== i))}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleCreate}>Create template</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NewTemplateDialog