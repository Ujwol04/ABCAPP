import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@Components/ui/Dialog"
import { Button } from "@Components/ui/Button"
import { Badge } from "@Components/ui/Badge"
import type { GeneratedDocument, DocTemplate } from "@Types/types"

interface Props {
  document: GeneratedDocument | null
  template: DocTemplate | undefined
  onOpenChange: (open: boolean) => void
}

export default function ViewDocumentDialog({ document, template, onOpenChange }: Props) {
  if (!document) return null

  const entries = Object.entries(document.values).filter(([, v]) => v)

  return (
    <Dialog open={!!document} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{document.title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary">{document.status}</Badge>
            <span>{document.date}</span>
            {template && <span>· From: {template.name}</span>}
          </div>

          <div className="flex flex-col gap-2 rounded-lg border border-border p-3">
            {entries.length > 0 ? (
              entries.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5 text-sm">
                  <span className="text-xs font-medium text-muted-foreground">{label}</span>
                  <span className="text-foreground">{value}</span>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">No fields filled in</div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
