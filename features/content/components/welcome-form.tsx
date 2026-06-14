"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateWelcome, useWelcome } from "../hooks/use-welcome";
import { welcomeSchema, type WelcomeValues } from "../schemas";

export function WelcomeForm() {
  const { data, isLoading } = useWelcome();
  const update = useUpdateWelcome();
  const form = useForm<WelcomeValues>({
    resolver: zodResolver(welcomeSchema),
    defaultValues: { headline: "", subheadline: "" },
  });

  useEffect(() => {
    if (data) {
      form.reset({ headline: data.headline, subheadline: data.subheadline });
    }
  }, [data, form]);

  if (isLoading) return <Skeleton className="h-64 w-full max-w-xl" />;

  return (
    <Card className="max-w-xl">
      <CardContent>
        <form
          onSubmit={form.handleSubmit((values) => update.mutate(values))}
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
  );
}
