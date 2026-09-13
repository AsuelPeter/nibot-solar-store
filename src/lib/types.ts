export type CategoryId =
  | "inverters"
  | "batteries"
  | "all-in-one"
  | "c-and-i"
  | "panels";

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  unit: string;
  description: string;
  features: string[];
  image: string;
  tag?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Customer {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  notes?: string;
  delivery: "delivery" | "pickup";
}

export type OrderStatus =
  | "new"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "bank-transfer" | "cash-on-delivery";

export type PaymentStatus = "pending" | "paid";

export interface Order {
  id: string;
  createdAt: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transferReference?: string;
  receiptImage?: string;
}

export type ServiceType =
  | "residential"
  | "commercial"
  | "maintenance"
  | "consultation";

export interface ServiceRequest {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  serviceType: ServiceType;
  message: string;
}
