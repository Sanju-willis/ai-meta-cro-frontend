// src\types\company.ts
import type { Item } from '@/types/item';

export type Company = {
  _id: string;
  name: string;
  logoUrl?: string;
  industry: string;
  type: string;
  size?: string;
  website?: string;
  targetMarket?: string;
  address?: string;
  socialLinks?: string[];
  userRole?: string;
  description?: string;
  targetAudience?: string;
  brandGuideUrl?: string;
  logoAssetsUrl?: string;
  pressKitUrl?: string;
  portfolioUrl?: string;
  contentLibraryUrl?: string;
  productPages?: string[];
  items?: Item[];
};
