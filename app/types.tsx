export interface Category {
  id: number;
  name: string;
  description: string;
  images: { url: string };
}
export interface IProduct {
  documentId: string;
  name: string;
  categories: string;
  description: string;
  state: string;
  sizes: Size[];
  price: number;
  discountPrice: number;
  images: { url: string };
}
export interface CartItem {
  documentId: string;
  name: string;
  categories: string;
  description: string;
  state: string;
  sizes: Size;
  price: number;
  quantity: number;
  discountPrice: number;
  images: { url: string };
}

export interface Size {
  documentId: string;
  name: string;
  price: number;
  stock: number;
}

export type User = {
  id: string;
  username: string;
  email: string;
};
export type LogIn = {
  password: string;
  email: string;
};
export type Register = {
  confirmPassword: string;
  email: string;
  password: string;
  username: string;
};

export type Order = {
  id: string;
  userId: string;
  products: CartItem[];
  totalAmount: number;
  date: Date;
  phone: string;
  name: string;
  email: string;
  address: string;
};

export type Hero = {
  id: string;
  title: string;
  description: string;
  image: { url: string };
  button: Button;
};
export type Section = {
  id: string;
  title: string;
  description: string;
  image: { url: string };
  button: Button;
};
export type Button = {
  title: string;
  link: string;
};

export type Checkout = {
  address: string;
  email: string;
  username: string;
  phoneNumber: string;
  selectedCountries: string;
  zip: string;
};
