'use client';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { useForm, Controller } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import convertToSubcurrency from '../../../_utils/convertToCurrency';
import { Input } from '@/components/ui/input';
import { CartItem, Checkout } from '@/app/types';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useOrderContext } from '@/app/_context/OrderContext';
import { toast } from 'sonner';
import { useCartContext } from '@/app/_context/CartContext';
import { useAuthContext } from '@/app/_context/AuthContext';

interface checkoutSectionProps {
  subTotal: number;
  shippingFees: number;
  cartItemList: CartItem[];
}

const countries = [
  { value: 'FR', label: 'France' },
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'DE', label: 'Germany' },
  { value: 'GB', label: 'United Kingdom' },
];
export default function CheckoutSection({
  subTotal,
  shippingFees,
  cartItemList,
}: checkoutSectionProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [loader, setLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { addOrder } = useOrderContext();
  const { clearCart } = useCartContext();
  const { user } = useAuthContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Checkout>();

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: convertToSubcurrency(subTotal + shippingFees),
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [subTotal]);

  const checkout = async (data: Checkout) => {
    setLoader(true);
    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError && submitError.message) {
      setErrorMessage(submitError.message);
      setLoader(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `http://localhost:3000/payment-confirm`,
        },
        redirect: 'if_required',
      });

      if (error && error.message) {
        setErrorMessage(error.message);
        toast('Une erreur est survenue lors du paiement.');
      } else {
        addOrder({
          id: paymentIntent ? paymentIntent.id : '',
          totalAmount: subTotal + shippingFees,
          date: new Date(),
          products: cartItemList,
          phone: data.phoneNumber,
          email: data.email,
          name: data.username,
          userId: user ? user?.id : '',
          address: `${data.address} ${data.zip} ${data.selectedCountries}`,
        });
        clearCart();
        router.push(
          `/payment-confirm/${paymentIntent?.id}?amount=${
            subTotal + shippingFees
          }`
        );
      }
    } catch {
      toast('Une erreur inattendue est survenue.');
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className=' items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32'>
      <div className='flex mb-14 gap-5'>
        <div
          onClick={() => router.push('/')}
          className='text-2xl flex gap-5 font-bold text-gray-800 cursor-pointer'>
          <Image
            alt='logo'
            width={90}
            height={100}
            src='/goldenSkin.svg'
            className='h-8 w-auto'
          />{' '}
          Golden Skin
        </div>
        <div className='mt-4 py-2 text-xs sm:mt-0 sm:ml-20 sm:text-base'>
          <div className='relative'>
            <ul className='relative flex w-full items-center justify-between space-x-2 sm:space-x-4'>
              <li className='flex items-center space-x-3 text-left sm:space-x-4'>
                <a
                  className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700'
                  href='#'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                </a>
                <span className='font-semibold text-gray-900'>Boutique</span>
              </li>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 5l7 7-7 7'
                />
              </svg>
              <li className='flex items-center space-x-3 text-left sm:space-x-4'>
                <a
                  className='flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2'
                  href='#'>
                  3
                </a>
                <span className='font-semibold text-gray-900'>Paiement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='grid  lg:grid-cols-2'>
        <div className='px-4 pt-8'>
          <p className='text-xl font-medium'>Récapitulatif de la commande</p>
          <p className='text-gray-400'>
            {`Vérifiez vos articles et sélectionnez un mode d'expédition adapté.`}
          </p>
          <div className='mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6'>
            {cartItemList.map((item) => {
              return (
                <div
                  key={item.documentId}
                  className='flex flex-col rounded-lg bg-white sm:flex-row'>
                  <Image
                    alt='item cart'
                    width={150}
                    height={100}
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + item.images.url
                    }
                    className='m-2 h-24 w-28 rounded-md border object-cover object-center'
                  />
                  <div className='flex w-full flex-col px-4 py-4'>
                    <span className='font-semibold'>{item.name}</span>
                    <span className='float-right text-gray-400'>
                      {item.sizes.name}
                    </span>
                    <div className='flex gap-2 items-center'>
                      <p className='text-lg font-bold'>{item.price}$</p>
                      <p>x {item.quantity}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className='mt-8 text-lg font-medium'>Shipping Methods</p>
          <div className='mt-5 grid gap-6'>
            <div className='relative'>
              <Input
                className='peer hidden'
                id='radio_1'
                type='radio'
                name='radio'
                checked
              />
              <span className='peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white'></span>
              <label
                className='peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4'
                htmlFor='radio_1'>
                <img
                  className='w-14 object-contain'
                  src='/images/naorrAeygcJzX0SyNI4Y0.png'
                  alt=''
                />
                <div className='ml-5'>
                  <span className='mt-2 font-semibold'>Livraison DHL</span>
                  <p className='text-slate-500 text-sm leading-6'>
                    Livraison: 2-4 jours
                  </p>
                </div>
              </label>
            </div>
            <div className='relative'>
              <Input
                className='peer hidden'
                id='radio_2'
                type='radio'
                name='radio'
                checked
              />
              <span className='peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white'></span>
              <label
                className='peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4'
                htmlFor='radio_2'>
                <img
                  className='w-14 object-contain'
                  src='/images/oG8xsl3xsOkwkMsrLGKM4.png'
                  alt=''
                />
                <div className='ml-5'>
                  <span className='mt-2 font-semibold'>Livraison Fedex</span>
                  <p className='text-slate-500 text-sm leading-6'>
                    Livraison: 2-4 jours
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(checkout)}
          className='mt-10 bg-gray-50 px-4 pt-8 lg:mt-0'>
          <p className='text-xl font-medium'>Détails de paiement</p>
          <p className='text-gray-400'>
            Complétez votre commande en fournissant vos informations de
            paiement.
          </p>
          <div className=''>
            <label
              htmlFor='name'
              className='mt-4 mb-2 block text-sm font-medium'>
              Nom
            </label>
            {errors.username && (
              <span className='text-red-500 text-sm'>
                {errors.username.message?.toString()}
              </span>
            )}
            <div className='relative'>
              <Input
                type='text'
                className={`${
                  errors.username ? 'border-red-500' : 'border-gray-200'
                } w-full rounded-md border  px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                placeholder='Nom complet'
                {...register('username', {
                  required: 'Le nom est requis',
                })}
              />
              <div className='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                <svg
                  className='h-4 w-4 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                  xmlns='http://www.w3.org/2000/svg'>
                  <circle
                    cx='12'
                    cy='9'
                    r='3'
                    stroke='#9ca3af '
                    strokeWidth='1.5'
                  />
                  <path
                    d='M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20'
                    stroke='#9ca3af '
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  />
                  <path
                    d='M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7'
                    stroke='#9ca3af '
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor='email'
              className='mt-4 mb-2 block text-sm font-medium'>
              Email
            </label>
            {errors.email && (
              <span className='text-red-500 text-sm'>
                {errors.email.message?.toString()}
              </span>
            )}
            <div className='relative'>
              <Input
                type='text'
                className={`${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                } w-full rounded-md border  px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                placeholder='Email'
                {...register('email', {
                  required: "L'email est requis",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Adresse email invalide',
                  },
                })}
              />
              <div className='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor='email'
              className='mt-4 mb-2 block text-sm font-medium'>
              Téléphone
            </label>
            {errors.phoneNumber && (
              <span className='text-red-500 text-sm'>
                {errors.phoneNumber.message?.toString()}
              </span>
            )}
            <div className='relative'>
              <Controller
                name='phoneNumber'
                control={control}
                defaultValue=''
                rules={{
                  required: 'Le numéro de téléphone est requis',
                }}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <PhoneInput
                    country={'ca'} // Change le pays par défaut ici si nécessaire
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    inputProps={{
                      ref: ref,
                      placeholder: 'Entrer votre numéro',
                      className: `${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      } w-full rounded-md border  px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`,
                    }}
                  />
                )}
              />
            </div>
            <label
              htmlFor='billing-address'
              className='mt-4 mb-2 block text-sm font-medium'>
              Billing Address
            </label>
            {errors.username && (
              <span className='text-red-500 text-sm'>
                {errors.username.message?.toString()}
              </span>
            )}

            <div className='flex flex-col'>
              {(errors.address || errors.zip || errors.selectedCountries) && (
                <span className='text-red-500 text-sm'>
                  {`L'adresse complete est requis`}
                </span>
              )}
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <div className='relative flex-shrink-0 sm:w-7/12'>
                <Input
                  type='text'
                  {...register('address', {
                    required: `L'adresse complete est requis`,
                  })}
                  className={`${
                    errors.address ? 'border-red-500' : 'border-gray-200'
                  } w-full rounded-md border px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                  placeholder='Street Address'
                />
                <div className='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z'
                    />
                  </svg>
                </div>
              </div>
              <select
                {...register('selectedCountries', {
                  required: `L'adresse complete est requis`,
                })}
                className='w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'>
                <option value=''>Pays</option>
                {countries.map((countrie, index) => {
                  return (
                    <option key={index} value={countrie.value}>
                      {countrie.label}
                    </option>
                  );
                })}
              </select>
              <Input
                type='text'
                {...register('zip', {
                  required: `L'adresse complete est requis`,
                })}
                className={`${
                  errors.zip ? 'border-red-500' : 'border-gray-200'
                } flex-shrink-0 rounded-md border  px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500`}
                placeholder='Zip'
              />
            </div>
            <label
              htmlFor='card-no'
              className='mt-4 mb-2 block text-sm font-medium'>
              Détails de la carte
            </label>
            {clientSecret && <PaymentElement />}
            {/* <!-- Total --> */}
            <div className='mt-6 border-t border-b py-2'>
              <div className='flex items-center justify-between'>
                <p className='text-sm font-medium text-gray-900'>Subtotal</p>
                <p className='font-semibold text-gray-900'>{subTotal}$</p>
              </div>
              <div className='flex items-center justify-between'>
                <p className='text-sm font-medium text-gray-900'>Shipping</p>
                <p className='font-semibold text-gray-900'>{shippingFees}$</p>
              </div>
            </div>
            <div className='mt-6 flex items-center justify-between'>
              <p className='text-sm font-medium text-gray-900'>Total</p>
              <p className='text-2xl font-semibold text-gray-900'>
                {subTotal + shippingFees}$
              </p>
            </div>
          </div>

          <button
            disabled={!stripe || loader || !clientSecret}
            className={`${
              !stripe || loader || !clientSecret
                ? 'bg-gray-500'
                : 'bg-primary hover:bg-secondary'
            } mt-4 mb-8 w-full rounded-md  px-6 py-3 font-medium text-white`}>
            {loader ? (
              <div className='flex justify-center'>
                {`paiement de ${subTotal + shippingFees}$ en cour...`}
                <Loader className='animate-spin' />
              </div>
            ) : (
              'Passer une commande'
            )}
          </button>
          {errorMessage && <div>{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
}
