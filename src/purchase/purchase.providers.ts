import { Purchase } from './purchase.entity';

export const purchaseProvider = [
  {
    provide: 'PURCHASE_REPOSITORY',
    useValue: Purchase,
  },
];
