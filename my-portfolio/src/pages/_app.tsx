// pages/_app.tsx
import type { AppProps } from 'next/app'
import '../../styles/globals.css'  // adjust path if your CSS lives elsewhere

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}