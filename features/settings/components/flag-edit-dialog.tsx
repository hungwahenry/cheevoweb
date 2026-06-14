"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { useUpdateFlag } from "../hooks/use-update-flag";
import type { FeatureFlag } from "../types";

export function FlagEditDialog({
  flag,
  onOpenChange,
}: {
  flag: FeatureFlag | null;
  onOpenChange: (open: boolean) => void;
}) {
  const update = useUpdateFlag();
  const [rollout, setRollout] = useState(0);
  const [isPublic, setIsPublic] = useState(false);

  function handleOpenChange(next: boolean) {
    if (next && flag) {
      setRollout(flag.rollout_pct);
      setIsPublic(flag.is_public);
    }
    onOpenChange(next);
  }

  return (
    <Dialog open={flag !== null} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{flag?.key}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Field>
            <FieldLabel htmlFor="rollout">Rollout %</FieldLabel>
            <Input
              id="rollout"
              type="number"
              min={0}
              max={100}
              value={rollout}
              onChange={(event) => setRollout(Number(event.target.value))}
            />
          </Field>
          <Field orientation="horizontal" className="items-center justify-between">
            <FieldLabel htmlFor="flag-public">Visible to clients</FieldLabel>
            <Switch
              id="flag-public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={update.isPending}
            onClick={() =>
              flag &&
              update.mutate(
                { id: flag.id, payload: { rollout_pct: rollout, is_public: isPublic } },
                { onSuccess: () => onOpenChange(false) },
              )
            }
          >
            {update.isPending ? <Spinner /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
