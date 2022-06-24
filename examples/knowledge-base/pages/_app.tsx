import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GlobalStyles as FormaGlobalStyles } from "@contentful/f36-components";

import { GlobalStyles } from "../components/GlobalStyles";
import { SiteSettings } from "../types";

export default function App({ Component, pageProps }: AppProps) {
  const siteSettings: SiteSettings | undefined = pageProps.siteSettings;

  return (
    <>
      <FormaGlobalStyles />
      <GlobalStyles />
      {siteSettings && (
        <Head>
          <title>{siteSettings.siteName}</title>
          <meta name="description" content={siteSettings.siteDescription} />
          <meta
            name="keywords"
            content={siteSettings.siteKeywords.join(", ")}
          />
          <link rel="icon" href="/favicon.png" />
        </Head>
      )}

      <Component {...pageProps} />
    </>
  );
}
