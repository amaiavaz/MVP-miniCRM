import { z } from "zod";

export const opportunitySchema = z.object({
  title: z
    .string({ message: "El título es obligatorio" })
    .min(2, { message: "El título debe tener al menos 2 caracteres" })
    .max(100, { message: "El título no puede superar 100 caracteres" }),

  amount: z
    .number({ invalid_type_error: "El monto debe ser un número" })
    .min(0, { message: "El monto no puede ser negativo" })
    .max(1000000, { message: "El monto es demasiado alto" }),

  status: z
    .number()
    .int()
    .min(1)
    .max(3)
});