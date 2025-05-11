// src\types\item.ts
export type Item = {
  _id: string;
  name: string;
  type: 'product' | 'service';
  category?: string;
  description?: string;
  pricePositioning?: string;
  features?: string[];
  painPoints?: string[];
  useCases?: string[];
  topCompetitors?: string[]; // ✅ renamed
  uniqueSellingPoints?: string[];
  targetAudience?: string[]; // ✅ renamed
};
