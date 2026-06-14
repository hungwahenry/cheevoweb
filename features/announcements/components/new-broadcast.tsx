"use client";

import { useCreateAnnouncement } from "../hooks/use-create-announcement";
import { BroadcastComposer } from "./broadcast-composer";

export function NewBroadcast() {
  const create = useCreateAnnouncement();
  return (
    <BroadcastComposer
      submitLabel="Save draft"
      pending={create.isPending}
      onSubmit={(input) => create.mutate(input)}
    />
  );
}
