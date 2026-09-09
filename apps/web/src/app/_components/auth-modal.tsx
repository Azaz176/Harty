"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  Globe,
  Smartphone,
} from "lucide-react";
import { Dialog } from "@harty/ui";
import { useAuthStore } from "@/stores/auth-store";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((v) => v, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type LoginData = z.infer<typeof loginSchema>;
type SignupData = z.infer<typeof signupSchema>;

type AuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "signup">("login");

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="max-w-md p-0 overflow-hidden">
        <div className="p-6">
          <Dialog.Title className="text-center font-display text-[length:var(--text-title)] font-bold">
            {tab === "login" ? "Welcome Back" : "Create Account"}
          </Dialog.Title>
          <Dialog.Description className="text-center">
            {tab === "login"
              ? "Sign in to your Harty account"
              : "Join Harty for the best fashion experience"}
          </Dialog.Description>

          <div className="mt-6 flex border-b border-hairline">
            <button
              type="button"
              onClick={() => setTab("login")}
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${
                tab === "login"
                  ? "border-b-2 border-volt text-ink"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setTab("signup")}
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${
                tab === "signup"
                  ? "border-b-2 border-volt text-ink"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="mt-6">
            {tab === "login" ? (
              <LoginForm onOpenChange={onOpenChange} />
            ) : (
              <SignupForm onOpenChange={onOpenChange} />
            )}
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

function LoginForm({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((s) => s.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginData) => {
    login({
      id: "user-" + Math.random().toString(36).slice(2, 9),
      name: data.email.split("@")[0],
      email: data.email,
    });
    toast.success("Welcome back to Harty!");
    onOpenChange(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            type="email"
            placeholder="Enter your email"
            className="h-11 w-full rounded-lg border border-hairline bg-paper-sunk pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-volt"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-sale">{errors.email.message}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="h-11 w-full rounded-lg border border-hairline bg-paper-sunk pl-10 pr-10 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-volt"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-sale">{errors.password.message}</p>
        )}
      </div>

      <div className="text-right">
        <button type="button" className="text-xs text-volt hover:underline">
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-lg bg-volt font-semibold text-volt-ink transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        Login
      </button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-hairline" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-paper px-4 text-xs text-ink-faint">OR</span>
        </div>
      </div>

      <button
        type="button"
        className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-hairline text-sm font-medium text-ink transition-colors hover:bg-paper-sunk"
      >
        <Globe className="size-4" />
        Continue with Google
      </button>

      <button
        type="button"
        className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-hairline text-sm font-medium text-ink transition-colors hover:bg-paper-sunk"
      >
        <Smartphone className="size-4" />
        Continue with Phone
      </button>
    </form>
  );
}

function SignupForm({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((s) => s.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupData>({ resolver: zodResolver(signupSchema) });

  const onSubmit = (data: SignupData) => {
    login({
      id: "user-" + Math.random().toString(36).slice(2, 9),
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
    });
    toast.success("Welcome to Harty! Your account has been created.");
    onOpenChange(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <div className="relative">
          <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            type="text"
            placeholder="Full Name"
            className="h-11 w-full rounded-lg border border-hairline bg-paper-sunk pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-volt"
            {...register("name")}
          />
        </div>
        {errors.name && (
          <p className="mt-1 text-xs text-sale">{errors.name.message}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            type="email"
            placeholder="Email Address"
            className="h-11 w-full rounded-lg border border-hairline bg-paper-sunk pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-volt"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-sale">{errors.email.message}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            type="tel"
            placeholder="Phone Number (optional)"
            className="h-11 w-full rounded-lg border border-hairline bg-paper-sunk pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-volt"
            {...register("phone")}
          />
        </div>
      </div>

      <div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="h-11 w-full rounded-lg border border-hairline bg-paper-sunk pl-10 pr-10 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-volt"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-sale">{errors.password.message}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            type="password"
            placeholder="Confirm Password"
            className="h-11 w-full rounded-lg border border-hairline bg-paper-sunk pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-volt"
            {...register("confirmPassword")}
          />
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-sale">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <label className="flex items-start gap-2 text-xs text-ink-muted">
        <input
          type="checkbox"
          className="mt-0.5 accent-volt"
          {...register("terms")}
        />
        <span>
          I agree to the{" "}
          <span className="text-volt underline">Terms & Conditions</span> and{" "}
          <span className="text-volt underline">Privacy Policy</span>
        </span>
      </label>
      {errors.terms && (
        <p className="text-xs text-sale">{errors.terms.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-lg bg-volt font-semibold text-volt-ink transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        Create Account
      </button>
    </form>
  );
}
