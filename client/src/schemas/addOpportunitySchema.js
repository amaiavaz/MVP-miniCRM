import { z } from "zod";

export const opportunitySchema = z.object({
  title: z
    .string({ message: "El título es obligatorio" })
    .min(2, { message: "El título debe tener al menos 2 caracteres" })
    .max(100, { message: "El título no puede superar 100 caracteres" }),

  amount: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "El monto debe ser un número válido mayor o igual a 0"
    })
    .refine((val) => val <= 1000000, {
      message: "El monto es demasiado alto"
    }),

  status: z
    .number()
    .int()
    .min(1)
    .max(3)
});