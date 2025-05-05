import { MAX_HOURS, MIN_HOURS } from '../config/consts';

import { z } from 'zod';

export type NewCounterFormValues = z.infer<typeof newCounterSchema>;
export const newCounterSchema = z.object({
  title: z
    .string({
      required_error: 'Obligatorio',
      invalid_type_error: 'Texto no válido',
    })
    .min(1, 'Mínimo 1 caracter')
    .max(10, 'Máximo 10 caracteres'),
  remainingHours: z
    .number({
      required_error: 'Obligatorio',
      invalid_type_error: 'Numero no válido',
    })
    .int('No puede tener decimales')
    .lte(MAX_HOURS, `No puede ser mayor a ${MAX_HOURS}`)
    .gte(MIN_HOURS, `No puede ser menor a ${MIN_HOURS}`),
  substractingOptions: z
    .array(
      z
        .number({
          required_error: 'Obligatorio',
          invalid_type_error: 'Numero no válido',
        })
        .int('No puede tener decimales')
        .positive('Debe ser mayor a 0')
    )
    .min(1, 'Un turno mínimo'),
});
