import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app';

import "isomorphic-fetch";
import Shopify, { ApiVersion } from "@shopify/shopify-api";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  if (typeof window === 'undefined') {
    // server side running
    const {
      SHOPIFY_API_KEY,
      SHOPIFY_API_SECRET,
      SCOPES,
      HOST,
    } = process.env;

    try {
      // 1回しか初期化したくないからinitialiedかどうかのチェック
      Shopify.Context.throwIfUninitialized();
    } catch (e: any) {
      // していない場合はerrorをthrowsしてくれるからcatchして初期化
      Shopify.Context.initialize({
        API_KEY: SHOPIFY_API_KEY,
        API_SECRET_KEY: SHOPIFY_API_SECRET,
        SCOPES: SCOPES.split(","),
        HOST_NAME: HOST.replace(/https:\/\//, ""),
        API_VERSION: ApiVersion.October20,
        IS_EMBEDDED_APP: true,
        SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
      });
    }
  }
  return { ...appProps };
}

export default MyApp
