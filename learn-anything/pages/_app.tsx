import { Auth } from "@supabase/ui";
import type { AppProps } from "next/app";
import Error from "next/error";
import Head from "next/head";
import React from "react";
import "tailwindcss/tailwind.css";
import Layout from "../components/layout";
import { supabase } from "../lib/initSupabase";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.error) {
    return (
      <Error
        statusCode={pageProps.error.statusCode}
        title={pageProps.error.message}
      />
    );
  }

  return (
    <>
      <Head>
        <title>Learn Anything</title>
      </Head>

      <Layout>
        <Auth.UserContextProvider supabaseClient={supabase}>
          <Component {...pageProps} />
        </Auth.UserContextProvider>
      </Layout>
    </>
  );
}
export default MyApp;
