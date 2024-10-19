'use client';
import { Poppins } from '@next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { usePathname } from 'next/navigation';
import { CartProvider } from './_context/CartContext';
import { ProductProvider } from './_context/ProductListContext';
import { AuthProvider } from './_context/AuthContext';
import { OrderProvider } from './_context/OrderContext';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'], // Vous pouvez spécifier les poids que vous voulez
  subsets: ['latin'], // Support des caractères latins
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = usePathname();
  const showHeader = ['/checkout'].includes(params) ? false : true;
  const showFooter = ['/checkout'].includes(params) ? false : true;
  return (
    <html lang='en'>
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>
          <ProductProvider>
            <OrderProvider>
              <CartProvider>
                {showHeader && <Header />}
                {children}
                <Toaster />
                {showFooter && <Footer />}
              </CartProvider>
            </OrderProvider>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
