"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { pageSchema, type PageValues } from "../schemas";
import type { Page } from "../types";

const EMPTY: PageValues = {
  title: "",
  slug: "",
  body_html: "",
  meta_description: "",
};

interface PageFormDialogProps {
  open: boolean;
  page: Page | null;
  pending?: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: PageValues) => void;
}

export function PageFormDialog({
  open,
  page,
  pending,
  onOpenChange,
  onSubmit,
}: PageFormDialogProps) {
  const form = useForm<PageValues>({
    resolver: zodResolver(pageSchema),
    defaultValues: EMPTY,
  });

  useEffect(() => {
    if (open) {
      form.reset(
        page
          ? {
              title: page.title,
              slug: page.slug,
              body_html: page.body_html,
              meta_description: page.meta_description ?? "",
            }
          : EMPTY,
      );
    }
  }, [open, page, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{page ? "Edit page" : "New page"}</DialogTitle>
        </DialogHeader>
        <form
          id="page-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="min-w-0 space-y-4"
        >
          <Field data-invalid={!!form.formState.errors.title}>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input id="title" {...form.register("title")} />
            {form.formState.errors.title && (
              <FieldError>{form.formState.errors.title.message}</FieldError>
            )}
          </Field>
          <Field data-invalid={!!form.formState.errors.slug}>
            <FieldLabel htmlFor="slug">Slug</FieldLabel>
            <Input id="slug" {...form.register("slug")} />
            {form.formState.errors.slug && (
              <FieldError>{form.formState.errors.slug.message}</FieldError>
            )}
          </Field>
          <Field data-invalid={!!form.formState.errors.body_html}>
            <FieldLabel htmlFor="body">Body (HTML)</FieldLabel>
            <Textarea
              id="body"
              rows={10}
              className="font-mono text-xs"
              {...form.register("body_html")}
            />
            {form.formState.errors.body_html && (
              <FieldError>{form.formState.errors.body_html.message}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="meta">Meta description</FieldLabel>
            <Input id="meta" {...form.register("meta_description")} />
          </Field>
        </form>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" form="page-form" disabled={pending}>
            {pending ? <Spinner /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
