import { useNavigate } from "react-router-dom"
import { ArrowLeft, History, LogIn, FileText, Pencil, Trash2, Plus } from "lucide-react"
import PageHeader from "@Components/common/PageHeader"

interface ActivityEntry {
  id: string
  action: string
  detail: string
  timestamp: string
  icon: "login" | "create" | "edit" | "delete" | "generate"
}

const ICONS = {
  login: LogIn,
  create: Plus,
  edit: Pencil,
  delete: Trash2,
  generate: FileText,
}

const mockActivity: ActivityEntry[] = [
  { id: "1", action: "Signed in", detail: "Logged in successfully", timestamp: "Today, 10:42 AM", icon: "login" },
  { id: "2", action: "Generated document", detail: "Invoice - Meridian Co.", timestamp: "Today, 9:15 AM", icon: "generate" },
  { id: "3", action: "Edited template", detail: "Freelance Invoice", timestamp: "Yesterday, 4:03 PM", icon: "edit" },
  { id: "4", action: "Created template", detail: "Meeting Notes", timestamp: "Aug 9, 2026, 2:20 PM", icon: "create" },
  { id: "5", action: "Deleted document", detail: "DOC-0025", timestamp: "Aug 8, 2026, 11:47 AM", icon: "delete" },
]

export default function ActivityLog() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-md p-1 hover:bg-muted"
        >
          <ArrowLeft className="size-5" />
        </button>
        <PageHeader
          title="Activity Log"
          description="Recent actions on your account"
          icon={<History className="size-5" />}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {mockActivity.map((entry, index) => {
          const Icon = ICONS[entry.icon]
          return (
            <div
              key={entry.id}
              className={`flex items-center gap-3 p-4 ${
                index !== mockActivity.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Icon className="size-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{entry.action}</div>
                <div className="text-sm text-muted-foreground">{entry.detail}</div>
              </div>
              <div className="text-xs text-muted-foreground">{entry.timestamp}</div>
            </div>
          )
        })}

        {mockActivity.length === 0 && (
          <div className="px-4 py-16 text-center text-sm text-muted-foreground">
            No activity yet.
          </div>
        )}
      </div>
    </div>
  )
}