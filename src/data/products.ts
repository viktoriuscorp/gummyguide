export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  pricePerServing?: string;
  rating: number;
  reviewCount: number;
  image: string;
  affiliateUrl: string;
  amazonUrl?: string;
  servings: number;
  keyIngredient: string;
  dosage: string;
  thirdPartyTested: boolean;
  certifications: string[];
  flavor: string;
  pros: string[];
  cons: string[];
  featured?: boolean;
  badge?: string;
}

// Products will be added as content is created for each category
export const products: Product[] = [];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getAllProducts(): Product[] {
  return [...products].sort((a, b) => b.rating - a.rating);
}
