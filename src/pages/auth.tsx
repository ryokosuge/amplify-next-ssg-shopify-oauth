import type { GetServerSideProps, NextPage } from 'next'
import Shopify, { ApiVersion } from "@shopify/shopify-api";

type Props = {
}

const Page: NextPage<Props> = () => (
	<div>auth</div>
);

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	const session = await Shopify.Utils.loadCurrentSession(context.req, context.res, true);
	if (session != null) {
		return {
			redirect: {
				statusCode: 302,
				destination: "/"
			}
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

export default Page;

