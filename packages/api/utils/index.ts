import { z } from "zod";

export const allQuerySchema = z.object({
  sort: z
    .array(z.object({ column: z.string(), direction: z.enum(["desc", "asc"]) }))
    .optional(),
  filter: z.object({ column: z.string(), value: z.string() }).optional(),
});
