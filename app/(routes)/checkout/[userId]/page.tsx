'use client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutSection from '../../../../components/CheckoutSection';
import convertToSubcurrency from '../../../_utils/convertToCurrency';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useCartContext } from '@/app/_context/CartContext';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY!);

export default function App() {
  const { cart } = useCartContext();
  const [subTotal, setSubTotal] = useState(0);
  const Shipping = 8;

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    if (!jwt) {
      redirect('/');
    }
    let total = 0;
    cart.forEach((item) => {
      total = total + item.quantity * item.price;
    });
    setSubTotal(total);
  }, [cart]);

  const options = {
    //clientSecret: '{{CLIENT_SECRET}}',
    mode: 'payment' as never,
    currency: 'usd',
    amount: convertToSubcurrency(subTotal + Shipping),
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {subTotal > 0 ? (
        <CheckoutSection
          shippingFees={Shipping}
          subTotal={subTotal}
          cartItemList={cart}
        />
      ) : (
        <Skeleton />
      )}
    </Elements>
  );
}
