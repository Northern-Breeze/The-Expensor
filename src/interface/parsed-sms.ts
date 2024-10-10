export interface ParsedSMS {
  price: number;
  transaction: 'withdrawal' | 'purchase' | 'transfer';
  priceString: string;
  date: number;
  entity: string;
  entityId: string;
}
