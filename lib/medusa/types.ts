// Image type
export type Image = {
  url: string;
  alt?: string;
};

// Money type
export type Money = {
  amount: string;
  currencyCode: string;
};

// Base Product type from Medusa
export type MedusaProduct = {
  id: string;
  title: string;
  handle: string;
  description?: string;
  thumbnail?: string;
  images?: Image[];
  variants?: MedusaVariant[];
  collection_id?: string;
  type_id?: string;
  created_at?: string;
  updated_at?: string;
  tags?: MedusaProductTag[];
  metadata?: Record<string, any>;
};

// Product Variant
export type MedusaVariant = {
  id: string;
  title: string;
  product_id: string;
  sku?: string;
  barcode?: string;
  prices?: MedusaPrice[];
  options?: MedusaProductOption[];
  inventory_quantity?: number;
  created_at?: string;
  updated_at?: string;
};

// Product Price
export type MedusaPrice = {
  id: string;
  variant_id: string;
  amount?: number;
  currency_code?: string;
  region_id?: string;
  min_quantity?: number;
  max_quantity?: number;
};

// Product Option
export type MedusaProductOption = {
  option_id: string;
  value: string;
};

// Product Tag
export type MedusaProductTag = {
  id: string;
  value: string;
};

// Product Collection
export type MedusaCollection = {
  id: string;
  title: string;
  handle: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  metadata?: Record<string, any>;
};

// Cart Item
export type MedusaCartItem = {
  id: string;
  cart_id: string;
  product_id: string;
  variant_id: string;
  quantity: number;
  title?: string;
  description?: string;
  thumbnail?: string;
  unit_price?: number;
  price?: number;
  variant?: MedusaVariant;
  product?: MedusaProduct;
};

// Cart
export type MedusaCart = {
  id: string;
  customer_id?: string;
  region_id: string;
  items: MedusaCartItem[];
  email?: string;
  currency_code?: string;
  subtotal?: number;
  tax_total?: number;
  shipping_total?: number;
  discount_total?: number;
  total?: number;
  created_at?: string;
  updated_at?: string;
};

// Cart to conform to existing types
export type Cart = {
  id: string;
  checkoutUrl?: string;
  cost: {
    subtotalAmount: Money;
    totalTaxAmount: Money;
    totalAmount: Money;
    totalDutyAmount?: Money;
  };
  lines: CartItem[];
  note?: string;
};

// CartItem to conform to existing component types
export type CartItem = {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProduct;
  };
};

// CartProduct
export type CartProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: Image;
};

// Product to conform to existing component types
export type Product = MedusaProduct & {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description?: string;
  descriptionHtml?: string;
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Array<{
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
    price: Money;
  }>;
  featuredImage: Image;
  images: Image[];
  seo?: {
    title?: string;
    description?: string;
  };
  tags: string[];
  updatedAt: string;
};

// Collection with path
export type Collection = MedusaCollection & {
  path: string;
};

// Menu
export type Menu = {
  title: string;
  path: string;
};

// Page
export type Page = {
  id: string;
  title: string;
  handle: string;
  body?: string;
  bodySummary?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Generic API response
export type MedusaResponse<T> = {
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
};

// For list responses
export type MedusaListResponse<T> = {
  products?: T[];
  collections?: T[];
  data?: T[];
  limit?: number;
  offset?: number;
  count?: number;
};
