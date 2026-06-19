"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { useLogin } from "../hooks/use-login";
import { useSendOtp } from "../hooks/use-send-otp";
import { emailSchema, type EmailValues } from "../schemas";

export function SignInForm() {
  const [email, setEmail] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const sendOtp = useSendOtp();
  const login = useLogin();

  const form = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  async function onSubmitEmail(values: EmailValues) {
    await sendOtp.mutateAsync(values.email);
    setEmail(values.email);
  }

  function onSubmitCode(value: string) {
    if (!email) return;
    login.mutate({ email, code: value });
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{email ? "Enter your code" : "Sign in"}</CardTitle>
        <CardDescription>
          {email
            ? `We sent a 6-digit code to ${email}.`
            : "Sign in to the cheevo admin panel."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {email ? (
          <div className="flex flex-col items-center gap-4">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={setCode}
              onComplete={onSubmitCode}
              disabled={login.isPending}
            >
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <Button
              className="w-full"
              onClick={() => onSubmitCode(code)}
              disabled={code.length !== 6 || login.isPending}
            >
              {login.isPending ? <Spinner /> : "Verify"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setEmail(null);
                setCode("");
              }}
            >
              Use a different email
            </Button>
          </div>
        ) : (
          <form
            onSubmit={form.handleSubmit(onSubmitEmail)}
            className="flex flex-col gap-4"
          >
            <Field data-invalid={!!form.formState.errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@cheevo.vip"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <FieldError>{form.formState.errors.email.message}</FieldError>
              )}
            </Field>
            <Button type="submit" disabled={sendOtp.isPending}>
              {sendOtp.isPending ? <Spinner /> : "Send code"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
