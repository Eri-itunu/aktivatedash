import { z } from "zod";

export const campaignFormSchema = z.object({
  campaignName: z
    .string()
    .min(3, "Campaign name must be at least 3 characters long")
    .max(100, "Campaign name cannot exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description cannot exceed 500 characters"),
  creatorsCount: z
    .number()
    .min(1, "There must be at least 1 creator")
    .max(100, "Creators count cannot exceed 100"),
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters long")
    .max(100, "Company name cannot exceed 100 characters"),
  websiteOrSocialLink: z
    .string()
    .url("Please enter a valid URL"),
  brandInfo: z
    .string()
    .max(300, "Brand info cannot exceed 300 characters")
    .optional(),
  applicationCloseDate: z.date({ required_error: "Application close date is required" }),
  contentApprovalDate: z.date({ required_error: "Content approval date is required" }),
  campaignStartDate: z.date({ required_error: "Campaign start date is required" }),
  campaignEndDate: z.date({ required_error: "Campaign end date is required" }),
});
