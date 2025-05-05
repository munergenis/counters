import {
  DEFAULT_REMAINING_HOURS,
  DEFAULT_SUBSTRACTING_OPTIONS,
} from '../config/consts';

import { Counter } from '../types/counter';

export const initialData: Counter[] = [
  {
    id: Date.now(),
    title: `${new Date().getFullYear()}`,
    remainingHours: DEFAULT_REMAINING_HOURS,
    substractingOptions: DEFAULT_SUBSTRACTING_OPTIONS,
    additions: [],
  },
];
