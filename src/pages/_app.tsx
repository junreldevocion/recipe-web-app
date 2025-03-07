import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "@/redux/provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Navbar />
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </Provider>
  );
}
