import * as z from 'zod';

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const LoginFormSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).email().trim(),
    password: z
      .string()
      .min(1, { message: "Password is required" }),

  });

export const SignUpFormSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }).trim(),
    email: z.string().min(1, { message: "Email is required" }).email().trim(),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .regex(passwordRegex, {
        message:
          "Password must be at least eight characters, at least one letter, one number and one special character",
      }),
  });

export const AddOfferinfStepFormSchema = z.object({
  category: z.object({
    value: z.string(),
    label: z.string()
  }),
  websiteName: z.string().trim(),
  websiteUrl: z.string().trim(),
  websiteDescription: z.string().trim(),
  officialEmail: z.string().email().trim(),
  telegramId: z.string().trim().optional(),
  contentLanguages: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ).min(1, { message: "At least 1 language is required" }),
  regions: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ).min(5, { message: "At least 5 regions are required" }),
  gambling: z.string().trim(),
  adultContent: z.string().trim(),
  crypto: z.string().trim(),
})

export const AddContentOfferinfStepFormSchema = z.object({
  offering: z.object({
    value: z.string().min(1, { message: "Required" }),
    label: z.string().min(1, { message: "Required" }),
  }),
  mediaKitPrice: z.string().trim().min(1, "Media Kit Price is required"),
  discountPrice: z.string().trim().optional(),
  features: z
    .array(
      z.string().trim(),
    ).min(1, { message: "At least 1 feature is required" }),
})

export const BillingFormSchema = z.object({
  firstName: z.string().trim().min(1, "First Name is required"),
  lastName: z.string().trim().min(1, "Last Name is required"),
  email: z.string().min(1, "Email is required").email().trim(),
  telegramId: z.string().trim().min(1, "Telegram Id is required"),
  country: z.object({
    value: z.string().min(1, { message: "State is required" }),
    label: z.string().min(1, { message: "State is required" }),
    isoCode: z.string()
  }),
  state: z.object({
    value: z.string().min(1, { message: "City is required" }),
    label: z.string().min(1, { message: "City is required" }),
  })
})

// export const AddContentOfferingStepFormSchema = z.object({
//   offerings: z.array(z.object({
//     offering: z.object({
//       value: z.string().min(1, { message: "Required"}),
//       label: z.string().min(1, { message: "Required"})
//     }),
//     mediaKitPrice: z.string().trim().min(1, "Media Kit Price is required"),
//     discountPrice: z.string().trim().optional(),
//     features: z
//       .array(
//         z.string().trim(),
//       ).min(1, { message: "At least 1 feature is required" }),
//   }))
// });

