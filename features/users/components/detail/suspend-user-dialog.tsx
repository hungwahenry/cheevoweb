"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useSuspendUser } from "../../hooks/detail/use-suspend-user";
import { suspendUserSchema, type SuspendUserValues } from "../../schemas";

interface SuspendUserDialogProps {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SuspendUserDialog({
  userId,
  open,
  onOpenChange,
}: SuspendUserDialogProps) {
  const suspend = useSuspendUser(userId);
  const form = useForm<SuspendUserValues>({
    resolver: zodResolver(suspendUserSchema),
    defaultValues: { reason: "" },
  });

  function onSubmit(values: SuspendUserValues) {
    suspend.mutate(values.reason, {
      onSuccess: () => {
        onOpenChange(false);
        form.reset();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Suspend user</DialogTitle>
          <DialogDescription>
            The account will be blocked from signing in. The reason is recorded
            in the audit log.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Field data-invalid={!!form.formState.errors.reason}>
            <FieldLabel htmlFor="reason">Reason</FieldLabel>
            <Textarea
              id="reason"
              rows={3}
              placeholder="Why is this account being suspended?"
              {...form.register("reason")}
            />
            {form.formState.errors.reason && (
              <FieldError>{form.formState.errors.reason.message}</FieldError>
            )}
          </Field>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={suspend.isPending}
            >
              {suspend.isPending ? <Spinner /> : "Suspend"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
