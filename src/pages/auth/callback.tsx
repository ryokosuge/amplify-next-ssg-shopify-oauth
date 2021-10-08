import type { GetServerSideProps, NextPage } from 'next'
import Shopify, { AuthQuery } from "@shopify/shopify-api";

type Props = {
}

const Page: NextPage<Props> = () => (
	<div>auth/callback</div>
);

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	try {
		const query = context.query as any
		await Shopify.Auth.validateAuthCallback(context.req, context.res, query as AuthQuery);
		return {
			redirect: {
				statusCode: 302,
				destination: '/'
			}
		};
	} catch (e: any) {
		console.error(e);
		return {
			notFound: true
		}
	}
};

export default Page

