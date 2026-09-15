import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, KeyRound } from "lucide-react"
import PageHeader from "@Components/common/PageHeader"
import { Button } from "@Components/ui/Button"
import { Input } from "@Components/ui/Input"

export default function ChangePassword() {
  const navigate = useNavigate()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setError("")
    setSuccess(false)

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.")
      return
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.")
      return
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.")
      return
    }

    setIsSubmitting(true)
    try {
      // TODO: replace with a real API call, e.g.:
      // await fetch("/api/auth/change-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ currentPassword, newPassword }),
      // })
      await new Promise((resolve) => setTimeout(resolve, 700))
      setSuccess(true)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

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
          title="Change Password"
          description="Update your account password"
          icon={<KeyRound className="size-5" />}
        />
      </div>

      <div className="flex max-w-md flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">Current password</label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">New password</label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">Confirm new password</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter new password"
          />
        </div>

        {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        {success && (
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            Password updated successfully.
          </p>
        )}

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  )
}