import { z } from "zod";

export const clientSchema = z.object({
  name: z
    .string({ message: "El nombre es obligatorio" })
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre no puede superar 50 caracteres" }),

  lastname: z
    .string({ message: "El apellido es obligatorio" })
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" })
    .max(50, { message: "El apellido no puede superar 50 caracteres" }),

  email: z
    .email({ message: "Formato de email no válido" }),

  phone_number: z
    .string({ message: "El teléfono es obligatorio" })
    .min(7, { message: "El teléfono debe tener al menos 7 caracteres" })
    .max(30, { message: "El teléfono no puede superar 30 caracteres" })
    .regex(/^\+?\d*$/, "El teléfono solo puede contener números y, opcionalmente, un '+' al inicio."),

  company: z
    .string()
    .max(100, { message: "El nombre de la empresa no puede superar 100 caracteres" })
    .optional(),
});
