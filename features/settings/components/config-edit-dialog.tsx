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
import { useConfigMutations } from "../hooks/use-config-mutations";
import type { SystemConfig } from "../types";

export function ConfigEditDialog({
  config,
  onOpenChange,
}: {
  config: SystemConfig | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { update } = useConfigMutations();
  const [value, setValue] = useState("");
  const [boolValue, setBoolValue] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  function handleOpenChange(next: boolean) {
    if (next && config) {
      setValue(config.value === null ? "" : String(config.value));
      setBoolValue(config.value === true);
      setIsPublic(config.is_public);
    }
    onOpenChange(next);
  }

  function coerced(): unknown {
    if (!config) return null;
    if (config.type === "bool") return boolValue;
    if (config.type === "int") return Number.parseInt(value, 10);
    if (config.type === "decimal") return Number.parseFloat(value);
    return value;
  }

  return (
    <Dialog open={config !== null} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{config?.key}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {config?.description && (
            <p className="text-muted-foreground text-sm">{config.description}</p>
          )}
          <Field>
            <FieldLabel htmlFor="config-value">Value</FieldLabel>
            {config?.type === "bool" ? (
              <Switch checked={boolValue} onCheckedChange={setBoolValue} />
            ) : (
              <Input
                id="config-value"
                type={
                  config?.type === "int" || config?.type === "decimal"
                    ? "number"
                    : "text"
                }
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
            )}
          </Field>
          <Field orientation="horizontal" className="items-center justify-between">
            <FieldLabel htmlFor="config-public">Visible to clients</FieldLabel>
            <Switch
              id="config-public"
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
              config &&
              update.mutate(
                { id: config.id, payload: { value: coerced(), is_public: isPublic } },
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
