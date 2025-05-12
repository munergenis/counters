import {
  MAX_COUNTER_TITLE_LENGTH,
  MAX_HOURS,
  MIN_HOURS,
} from '../config/consts';

import { z } from 'zod';

export type NewCounterFormValues = z.infer<typeof newCounterSchema>;
export const newCounterSchema = z.object({
  title: z
    .string({
      required_error: 'Obligatòri',
      invalid_type_error: 'Text no vàlid',
    })
    .min(1, 'Mínim 1 caràcter')
    .max(
      MAX_COUNTER_TITLE_LENGTH,
      `Màxim ${MAX_COUNTER_TITLE_LENGTH} caràcters`
    ),
  remainingHours: z
    .number({
      required_error: 'Obligatòri',
      invalid_type_error: 'Número no vàlid',
    })
    .int('No pot tenir decimals')
    .lte(MAX_HOURS, `No pot ser major a ${MAX_HOURS}`)
    .gte(MIN_HOURS, `No pot ser menor a ${MIN_HOURS}`),
  substractingOptions: z
    .array(
      z
        .number({
          required_error: 'Obligatòri',
          invalid_type_error: 'Número no vàlid',
        })
        .int('No pot tenir decimals')
        .positive('Ha de ser major a 0')
    )
    .min(1, 'Un torn mínim'),
});
