import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Shopify, { ApiVersion } from "@shopify/shopify-api";
import { Session } from '@shopify/shopify-api/dist/auth/session';

type Props = {
  session: {
    shop: string;
    state: string;
    scope: string;
    accessToken?: string;
    onlineAccessInfo?: {
      associatedUser: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        emailVerified: boolean;
        accountOwner: boolean;
        locale: string;
        collaborator: boolean;
      };
    };
  };
}

const Home: NextPage<Props> = ({ session }) => (
  <div className={styles.container}>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <dl className={styles.description}>
        <dt>shop</dt>
        <dd>{session.shop}</dd>
        <dt>state</dt>
        <dd>{session.state}</dd>
        <dt>scope</dt>
        <dd>{session.scope}</dd>
        <dt>accessToken</dt>
        <dd>{session.accessToken ?? "-"}</dd>
        <dt>accessInfo.user.id</dt>
        <dd>{session.onlineAccessInfo?.associatedUser.id}</dd>
        <dt>accessInfo.user.firstName</dt>
        <dd>{session.onlineAccessInfo?.associatedUser.firstName}</dd>
        <dt>accessInfo.user.lastName</dt>
        <dd>{session.onlineAccessInfo?.associatedUser.lastName}</dd>
        <dt>accessInfo.user.email</dt>
        <dd>{session.onlineAccessInfo?.associatedUser.email}</dd>
        <dt>accessInfo.user.emailVerified</dt>
        <dd>{`${session.onlineAccessInfo?.associatedUser.emailVerified}`}</dd>
        <dt>accessInfo.user.accountOwner</dt>
        <dd>{`${session.onlineAccessInfo?.associatedUser.accountOwner}`}</dd>
        <dt>accessInfo.user.locale</dt>
        <dd>{session.onlineAccessInfo?.associatedUser.locale}</dd>
        <dt>accessInfo.user.collaborator</dt>
        <dd>{`${session.onlineAccessInfo?.associatedUser.collaborator}`}</dd>
      </dl>
    </main>

    <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  </div>
);

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const session = await Shopify.Utils.loadCurrentSession(context.req, context.res, true);
  if (session != null) {
    console.log(session);
    return {
      props: {
        session: {
          shop: session.shop,
          state: session.state,
          scope: session.scope,
          accessToken: session.accessToken,
          onlineAccessInfo: session.onlineAccessInfo == null ? undefined : {
            associatedUser: {
              id: session.onlineAccessInfo.associated_user.id,
              firstName: session.onlineAccessInfo.associated_user.first_name,
              lastName: session.onlineAccessInfo.associated_user.last_name,
              email: session.onlineAccessInfo.associated_user.email,
              emailVerified: session.onlineAccessInfo.associated_user.email_verified,
              accountOwner: session.onlineAccessInfo.associated_user.account_owner,
              locale: session.onlineAccessInfo.associated_user.locale,
              collaborator: session.onlineAccessInfo.associated_user.collaborator,
            },
          },
        },
      },
    };
  }

  const authRoute = await Shopify.Auth.beginAuth(context.req, context.res, process.env.SHOP, '/auth/callback', true);
  return {
    redirect: {
      statusCode: 302,
      destination: authRoute,
    }
  }
};

export default Home
