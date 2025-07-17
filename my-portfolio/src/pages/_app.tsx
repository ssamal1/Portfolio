// pages/_app.tsx
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import '../../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Handle base path for static exports
  useEffect(() => {
    // Add base path to all router.push and router.replace calls
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (url, as, options) => {
      return originalPush(url, as ? `${as}` : undefined, options);
    };

    router.replace = (url, as, options) => {
      return originalReplace(url, as ? `${as}` : undefined, options);
    };
  }, [router]);

  return (
    <>
      <Head>
        <base href={process.env.NEXT_PUBLIC_BASE_PATH || '/'} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}