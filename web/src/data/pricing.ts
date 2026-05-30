export type PricingItem = {
  id: string;
  label: string;
  price: number;
  /** Optional secondary line shown under the label */
  sub?: string;
};

export const pricing = {
  items: [
    { id: 'tee',    label: 'Adult Tees',                price: 15 },
    { id: 'polo',   label: 'Adult Polos',               price: 20 },
    { id: 'youth',  label: 'Youth / Toddler / Onesie',  price: 10 },
    { id: 'hoodie', label: 'Hoodies',                   price: 30 },
    { id: 'jogger', label: 'Joggers',                   price: 15 },
    { id: 'apron',  label: 'Aprons',                    price: 15 },
  ] satisfies PricingItem[],
  customNote: 'Need a design? DM or email for custom work.',
  paymentMethods: ['Cash', 'Venmo'] as const,
} as const;
