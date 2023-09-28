import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Inter } from "next/font/google";
export let InterInstance = Inter();

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
