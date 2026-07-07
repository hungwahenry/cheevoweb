"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { useCatalog } from "../hooks/use-catalog";
import { useCatalogMutations } from "../hooks/use-catalog-mutations";
import type { SimpleCatalogValues } from "../schemas";
import type { SimpleCatalogItem } from "../types";
import { CatalogTable } from "./catalog-table";
import { SimpleCatalogForm } from "./simple-catalog-form";

interface SimpleCatalogProps {
  resource: string;
  singular: string;
  hasBaseUrl?: boolean;
}

export function SimpleCatalog({
  resource,
  singular,
  hasBaseUrl,
}: SimpleCatalogProps) {
  const { data, isLoading } = useCatalog<SimpleCatalogItem>(resource);
  const { create, update, remove } = useCatalogMutations(resource, singular);
  const [editing, setEditing] = useState<SimpleCatalogItem | null | undefined>(
    undefined,
  );
  const [deleting, setDeleting] = useState<SimpleCatalogItem | null>(null);

  const columns: ColumnDef<SimpleCatalogItem>[] = [
    { accessorKey: "name", header: "Name" },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => (
        <code className="text-muted-foreground text-xs">
          {row.original.slug}
        </code>
      ),
    },
    ...(hasBaseUrl
      ? [
          {
            id: "base_url",
            header: "URL",
            cell: ({ row }) => (
              <span className="text-muted-foreground text-sm">
                {row.original.base_url ?? "—"}
              </span>
            ),
          } satisfies ColumnDef<SimpleCatalogItem>,
        ]
      : []),
    { accessorKey: "sort_order", header: "Order" },
    {
      id: "active",
      header: "Active",
      cell: ({ row }) =>
        row.original.is_active ? (
          <Badge variant="outline">Active</Badge>
        ) : (
          <Badge variant="secondary">Hidden</Badge>
        ),
    },
  ];

  function submit(values: SimpleCatalogValues) {
    const payload = hasBaseUrl
      ? { ...values, base_url: values.base_url || null }
      : {
          name: values.name,
          slug: values.slug,
          sort_order: values.sort_order,
          is_active: values.is_active,
        };

    if (editing) {
      update.mutate(
        { id: editing.id, payload },
        { onSuccess: () => setEditing(undefined) },
      );
    } else {
      create.mutate(payload, { onSuccess: () => setEditing(undefined) });
    }
  }

  return (
    <>
      <CatalogTable
        singular={singular}
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        onAdd={() => setEditing(null)}
        onEdit={setEditing}
        onDelete={setDeleting}
      />
      <SimpleCatalogForm
        open={editing !== undefined}
        item={editing ?? null}
        singular={singular}
        hasBaseUrl={hasBaseUrl}
        pending={create.isPending || update.isPending}
        onOpenChange={(open) => {
          if (!open) setEditing(undefined);
        }}
        onSubmit={submit}
      />
      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => {
          if (!open) setDeleting(null);
        }}
        title={`Delete ${deleting?.name ?? ""}?`}
        description="This removes it from the catalog. Existing references are unaffected."
        pending={remove.isPending}
        onConfirm={() => {
          if (deleting) {
            remove.mutate(deleting.id, { onSuccess: () => setDeleting(null) });
          }
        }}
      />
    </>
  );
}
