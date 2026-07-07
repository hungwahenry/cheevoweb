"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ImagePlus, Trash2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { useUpdateWelcome, useWelcome } from "../hooks/use-welcome"
import { welcomeSchema, type WelcomeValues } from "../schemas"

export function WelcomeForm() {
  const { data, isLoading } = useWelcome()
  const update = useUpdateWelcome()
  const fileInput = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)

  const form = useForm<WelcomeValues>({
    resolver: zodResolver(welcomeSchema),
    defaultValues: { headline: "", subheadline: "" },
  })

  useEffect(() => {
    if (data) {
      form.reset({ headline: data.headline, subheadline: data.subheadline })
    }
  }, [data, form])

  const preview = file
    ? URL.createObjectURL(file)
    : (data?.background_url ?? null)

  if (isLoading) return <Skeleton className="h-80 w-full max-w-xl" />

  return (
    <Card className="max-w-xl">
      <CardContent className="space-y-5">
        <Field>
          <FieldLabel>Background image</FieldLabel>
          <div className="space-y-2">
            {preview ? (
              <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
                <img
                  src={preview}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
                No background set
              </div>
            )}
            <div className="flex gap-2">
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                hidden
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInput.current?.click()}
              >
                <ImagePlus />
                {data?.background_url ? "Replace" : "Upload"}
              </Button>
              {data?.background_url && !file && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={update.isPending}
                  onClick={() => update.mutate({ removeBackground: true })}
                >
                  <Trash2 />
                  Remove
                </Button>
              )}
            </div>
          </div>
        </Field>

        <form
          onSubmit={form.handleSubmit((values) =>
            update.mutate(
              { ...values, background: file },
              { onSuccess: () => setFile(null) }
            )
          )}
          className="space-y-4"
        >
          <Field data-invalid={!!form.formState.errors.headline}>
            <FieldLabel htmlFor="headline">Headline</FieldLabel>
            <Input id="headline" {...form.register("headline")} />
            {form.formState.errors.headline && (
              <FieldError>{form.formState.errors.headline.message}</FieldError>
            )}
          </Field>
          <Field data-invalid={!!form.formState.errors.subheadline}>
            <FieldLabel htmlFor="subheadline">Subheadline</FieldLabel>
            <Textarea
              id="subheadline"
              rows={2}
              {...form.register("subheadline")}
            />
            {form.formState.errors.subheadline && (
              <FieldError>
                {form.formState.errors.subheadline.message}
              </FieldError>
            )}
          </Field>
          <Button type="submit" disabled={update.isPending}>
            {update.isPending ? <Spinner /> : "Save"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
