// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar />
      <main className="p-4">
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
}
