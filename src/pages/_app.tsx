import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>SiteHoarder</title>
        <meta name="description" content="A site to hoard your sites." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster
        position="bottom-center"
      />
      <Component {...pageProps} />
    </ClerkProvider>
  )
};

export default api.withTRPC(MyApp);
