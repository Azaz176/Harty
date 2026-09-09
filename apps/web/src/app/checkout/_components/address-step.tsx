"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin } from "lucide-react";

const addressSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  line1: z.string().min(5, "Address line 1 is required"),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  country: z.string().min(1),
});

export type AddressFormData = z.infer<typeof addressSchema>;

const SAVED_ADDRESSES: AddressFormData[] = [
  {
    name: "Aarav Sharma",
    phone: "9876543210",
    line1: "42, Prestige Lakeside Habitat",
    line2: "Varthur Main Road",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560103",
    country: "IN",
  },
];

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-sans text-[length:var(--text-meta)] font-medium text-ink mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 font-sans text-[length:var(--text-micro)] text-sale" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function AddressStep({
  onComplete,
  defaultValues,
}: {
  onComplete: (address: AddressFormData) => void;
  defaultValues?: AddressFormData;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues ?? { country: "IN" },
  });

  const fillAddress = (addr: AddressFormData) => {
    (Object.entries(addr) as [keyof AddressFormData, string][]).forEach(
      ([key, val]) => setValue(key, val, { shouldValidate: true })
    );
  };

  const inputClass = (hasError: boolean) =>
    [
      "w-full h-10 px-4 font-sans text-[length:var(--text-body)] text-ink bg-paper-sunk border rounded-[var(--radius-sm)] placeholder:text-ink-faint",
      "transition-[border-color,box-shadow] duration-[var(--dur-micro)] ease-[var(--ease-out-expo)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
      hasError
        ? "border-sale focus-visible:ring-sale"
        : "border-hairline focus-visible:ring-volt",
    ].join(" ");

  return (
    <div className="space-y-6">
      {SAVED_ADDRESSES.length > 0 && (
        <div>
          <h3 className="font-sans text-[length:var(--text-meta)] font-semibold uppercase tracking-[var(--tracking-caps)] text-ink-muted mb-3">
            Saved Addresses
          </h3>
          <div className="space-y-2">
            {SAVED_ADDRESSES.map((addr, i) => (
              <button
                key={i}
                type="button"
                onClick={() => fillAddress(addr)}
                className="flex w-full items-start gap-3 rounded-[var(--radius-sm)] border border-hairline p-4 text-left transition-colors duration-[var(--dur-micro)] hover:border-ink/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-ink-muted" strokeWidth={1.5} />
                <div>
                  <p className="font-sans text-[length:var(--text-body)] font-medium text-ink">
                    {addr.name}
                  </p>
                  <p className="font-sans text-[length:var(--text-meta)] text-ink-muted">
                    {addr.line1}
                    {addr.line2 ? `, ${addr.line2}` : ""}, {addr.city},{" "}
                    {addr.state} — {addr.pincode}
                  </p>
                </div>
              </button>
            ))}
          </div>
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-hairline" />
            <span className="font-sans text-[length:var(--text-micro)] text-ink-faint">
              or enter a new address
            </span>
            <div className="h-px flex-1 bg-hairline" />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onComplete)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Full Name" error={errors.name?.message}>
            <input
              {...register("name")}
              placeholder="Aarav Sharma"
              className={inputClass(!!errors.name)}
            />
          </FormField>
          <FormField label="Phone Number" error={errors.phone?.message}>
            <input
              {...register("phone")}
              placeholder="9876543210"
              type="tel"
              className={inputClass(!!errors.phone)}
            />
          </FormField>
        </div>

        <FormField label="Address Line 1" error={errors.line1?.message}>
          <input
            {...register("line1")}
            placeholder="House/Flat No., Building, Street"
            className={inputClass(!!errors.line1)}
          />
        </FormField>

        <FormField label="Address Line 2 (Optional)" error={errors.line2?.message}>
          <input
            {...register("line2")}
            placeholder="Locality, Landmark"
            className={inputClass(!!errors.line2)}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField label="City" error={errors.city?.message}>
            <input
              {...register("city")}
              placeholder="Bangalore"
              className={inputClass(!!errors.city)}
            />
          </FormField>
          <FormField label="State" error={errors.state?.message}>
            <input
              {...register("state")}
              placeholder="Karnataka"
              className={inputClass(!!errors.state)}
            />
          </FormField>
          <FormField label="Pincode" error={errors.pincode?.message}>
            <input
              {...register("pincode")}
              placeholder="560001"
              maxLength={6}
              className={inputClass(!!errors.pincode)}
            />
          </FormField>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-ink px-6 font-sans text-[length:var(--text-body)] font-medium text-paper transition-opacity duration-[var(--dur-micro)] hover:bg-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-40 active:scale-[0.97]"
        >
          Deliver to this address
        </button>
      </form>
    </div>
  );
}
