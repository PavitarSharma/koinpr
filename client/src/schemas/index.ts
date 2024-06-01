import * as z from 'zod';

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
    value: z.string().min(1, { message: "Required"}),
    label: z.string().min(1, { message: "Required"}),
  }),
  mediaKitPrice: z.string().trim().min(1, "Media Kit Price is required"),
  discountPrice: z.string().trim().optional(),
  features: z
    .array(
      z.string().trim(),
    ).min(1, { message: "At least 1 feature is required" }),
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

