"use client"

import { Play } from "lucide-react"
import { useState } from "react"
import { ConfirmDialog } from "@/components/admin/common/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { useCommands } from "../hooks/use-commands"
import { useRunCommand } from "../hooks/use-run-command"

export function OpsCommands() {
  const { data, isLoading } = useCommands()
  const run = useRunCommand()
  const [confirming, setConfirming] = useState<string | null>(null)

  if (isLoading || !data) {
    return <Skeleton className="h-48 w-full" />
  }

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        {data.map((command) => (
          <Card key={command.command}>
            <CardContent className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <code className="text-sm font-medium">{command.command}</code>
                <p className="text-xs text-muted-foreground">
                  {command.description}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={run.isPending}
                onClick={() => setConfirming(command.command)}
              >
                {run.isPending && run.variables === command.command ? (
                  <Spinner />
                ) : (
                  <Play className="size-4" />
                )}
                Run
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <ConfirmDialog
        open={confirming !== null}
        onOpenChange={(open) => !open && setConfirming(null)}
        title={`Run ${confirming}?`}
        description="Runs this maintenance task immediately on the server."
        confirmLabel="Run"
        destructive={false}
        pending={run.isPending}
        onConfirm={() => {
          if (confirming) {
            run.mutate(confirming, { onSuccess: () => setConfirming(null) })
          }
        }}
      />
    </>
  )
}
