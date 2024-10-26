'use client';
import { Poppins } from '@next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { usePathname } from 'next/navigation';
import { CartProvider } from './_context/CartContext';
import { AuthProvider } from './_context/AuthContext';
import { OrderProvider } from './_context/OrderContext';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = usePathname();
  const showHeader = params.includes('/checkout') ? false : true;
  const showFooter = params.includes('/checkout') ? false : true;
  return (
    <html lang='en'>
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>
          <OrderProvider>
            <CartProvider>
              {showHeader && <Header />}
              {children}
              <Toaster />
              {showFooter && <Footer />}
            </CartProvider>
          </OrderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
