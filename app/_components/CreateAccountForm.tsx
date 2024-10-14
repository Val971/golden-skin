import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from 'lucide-react';
import { useAuthContext } from '@/app/_context/AuthContext';
import { Register } from '../types';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

export default function CreateAccountForm() {
  const { createAccount, errorMessage, loading } = useAuthContext();
  const [error, setError] = useState(false);

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
    <div>
      {error && <p className=' text-red-600 pt-4'>{errorMessage}</p>}
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
            {loading ? <Loader className='animate-spin' /> : ' Créer un compte'}
          </button>
          <p className='text-sm min-w-72'>
            {`j'ai déjà un compte`}{' '}
            <Link
              href={'/sign-in'}
              onClick={() => setError(false)}
              className=' underline text-secondary'>
              connexion
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
