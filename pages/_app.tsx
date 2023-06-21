import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Rubik } from 'next/font/google';
import ProductsProvider from '@/providers/ProductsProvider';

const rubik = Rubik({ subsets: ['latin'], weight: ['400', '500'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={rubik.className}>
      <ProductsProvider>
        <Component {...pageProps} />
      </ProductsProvider>
    </main>
  );
}
