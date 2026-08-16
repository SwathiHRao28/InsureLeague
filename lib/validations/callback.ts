import { z } from "zod";

// Indian mobile number: optional +91, then a 10-digit number starting 6-9.
const phoneRegex = /^(\+91[-\s]?)?[6-9]\d{9}$/;

export const callbackFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name can only contain letters and spaces"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  customerType: z.enum(["individual", "corporate"], {
    errorMap: () => ({ message: "Select a customer type" }),
  }),
  insuranceCategory: z.enum(["corporate", "individual", "employee-benefits"], {
    errorMap: () => ({ message: "Select an insurance category" }),
  }),
  insuranceProduct: z.string().min(1, "Select an insurance product"),
  callbackTime: z.enum(["morning", "afternoon", "evening"], {
    errorMap: () => ({ message: "Select a preferred callback time" }),
  }),
  message: z.string().trim().max(1000, "Message is too long").optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted" }),
  }),
  // Honeypot field — must stay empty. Bots that fill every field trip this.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type CallbackFormValues = z.infer<typeof callbackFormSchema>;

export const callbackStatusValues = [
  "New",
  "Contacted",
  "In Progress",
  "Completed",
  "Closed",
] as const;
export type CallbackStatus = (typeof callbackStatusValues)[number];
