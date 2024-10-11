'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from 'lucide-react';
import { Register } from '@/app/types';
import { useAuthContext } from '@/app/_context/AuthContext';

export default function CreateAccount() {
  const { createAccount, loading, error, errorMessage, setError } =
    useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Register>();
  const password = watch('password');

  const onCreateAccount = (data: Register) => {
    createAccount(data);
  };
  return (
    <div className='bg-lightBackground p-10 items-center flex justify-center'>
      <div className='flex flex-col items-center justify-center bg-white max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800'>
        <div className='mb-8 text-center'>
          <Link href={`/`} className='flex flex-col items-center gap-5'>
            <Image
              alt='logo'
              width={150}
              height={100}
              src='/goldenSkin.svg'
              className='h-10 w-auto'
            />
            <p className='text-primary font-semibold text-xl'>Golden Skin</p>
          </Link>
          <h1 className='my-3 text-4xl font-bold'>Inscription</h1>
          <p className='text-sm dark:text-gray-600'>
            Entrez vos informations pour créer un compte.
          </p>
          {error && <p className=' text-red-600 pt-4'>{errorMessage}</p>}
        </div>
        <form onSubmit={handleSubmit(onCreateAccount)} className='space-y-12'>
          <div className='space-y-4'>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='username'>Username</Label>
              <Input
                type='text'
                className={`${errors.username ? 'border-red-500' : ''}`}
                placeholder='Username'
                {...register('username', {
                  required: "Le nom d'utilisateur est requis",
                })}
              />
              {errors.username && (
                <span className='text-red-500 text-sm'>
                  {errors.username.message?.toString()}
                </span>
              )}
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='email'>Email</Label>
              <Input
                type='email'
                placeholder='Email'
                className={`${errors.email ? 'border-red-500' : ''}`}
                {...register('email', {
                  required: "L'email est requis",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Adresse email invalide',
                  },
                })}
              />
              {errors.email && (
                <span className='text-red-500 text-sm'>
                  {errors.email.message?.toString()}
                </span>
              )}
            </div>

            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='password'>Mot de passe</Label>
              <Input
                type='password'
                placeholder='Mot de passe'
                className={`${errors.password ? 'border-red-500' : ''}`}
                {...register('password', {
                  required: 'Le mot de passe est requis',
                  minLength: {
                    value: 6,
                    message:
                      'Le mot de passe doit contenir au moins 6 caractères',
                  },
                })}
              />
              {errors.password && (
                <span className='text-red-500 text-sm'>
                  {errors.password.message?.toString()}
                </span>
              )}
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='confirmPassword'>Confirmation mot de passe</Label>
              <Input
                className={`${errors.confirmPassword ? 'border-red-500' : ''}`}
                type='password'
                placeholder='Confirmation mot de passe'
                {...register('confirmPassword', {
                  required: 'La confirmation du mot de passe est requise',
                  validate: (value) =>
                    value === password ||
                    'Les mots de passe ne correspondent pas',
                })}
              />
              {errors.confirmPassword && (
                <span className='text-red-500 text-sm'>
                  {errors.confirmPassword.message?.toString()}
                </span>
              )}
            </div>
          </div>
          <div className='space-y-2'>
            <button
              type='submit'
              className={`bg-primary hover:bg-secondary  w-full uppercase flex justify-center text-white font-bold py-4 px-4 rounded-xl`}>
              {loading ? (
                <Loader className='animate-spin' />
              ) : (
                ' Créer un compte'
              )}
            </button>
            <p className='text-sm min-w-72'>
              {`j'ai déjà un compte`}{' '}
              <Link
                onClick={() => setError(false)}
                href={`/sign-in`}
                className=' underline text-secondary'>
                connexion
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
