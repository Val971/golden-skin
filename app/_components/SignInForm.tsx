'use client';
import React, { useContext } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { AuthContext, AuthContextType } from '../_context/AuthContext';
import { LogIn } from '../types';
import Link from 'next/link';

export default function SignInForm() {
  const { login, loading, error, errorMessage, setError } = useContext(
    AuthContext
  ) as AuthContextType;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogIn>();

  const onLogIn = async (data: LogIn) => {
    await login(data);
  };

  return (
    <div>
      {error && <p className=' text-red-600 pt-4'>{errorMessage}</p>}
      <form onSubmit={handleSubmit(onLogIn)} className='space-y-12'>
        <div className='space-y-4'>
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
        </div>
        <div className='space-y-2'>
          <button
            type='submit'
            className={` bg-primary hover:bg-secondary w-full uppercase flex justify-center text-white font-bold py-4 px-4 rounded-xl`}>
            {loading ? <Loader className='animate-spin' /> : 'Connexion'}
          </button>
          <p className='text-sm min-w-72'>
            {`je n'est pas encore de compte`}{' '}
            <Link
              href={'/auth/create-account'}
              onClick={() => setError(false)}
              className=' underline text-secondary'>
              inscription
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
