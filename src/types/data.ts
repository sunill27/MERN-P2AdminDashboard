import { Status } from './status';

export interface User {
  id: string;
  email: string;
  username: string;
}

interface Category {
  id: string;
  categoryName: string;
}

export interface Product {
  id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productStock: number;
  productImage: string;
  createdAt: string;
  updatedAt: string;
  userId: UserActivation;
  Category: Category;
}

export enum PaymentMethod {
  COD = 'cod',
  KHALTI = 'khalti',
}

interface ItemDetails {
  productId: string;
  quantity: number;
}

export enum OrderStatus {
  Pending = 'pending',
  Delivered = 'Delivered',
  Ontheway = 'ontheway',
  Cancelled = 'cancelled',
  Preparation = 'preparation',
  All = 'all',
}

interface Payment {
  paymentMethod: PaymentMethod;
}

export interface OrderData {
  phoneNumber: string;
  shippingAddress: string;
  totalAmount: number;
  paymentDetails: Payment;
  items: ItemDetails[];
}

export interface InitialState {
  products: Product[];
  users: User[];
  orders: OrderData[];
  status: Status;
  singleProduct: Product | null;
}
