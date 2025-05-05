export interface Addition {
  title: string;
  substractedHours: number;
}

export interface Counter {
  id: number;
  title: string;
  remainingHours: number;
  substractingOptions: number[];
  additions: Addition[];
}
