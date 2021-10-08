/// <reference types="node" />

declare namespace NodeJS {
	interface ProcessEnv {
		PORT: string;
		SHOPIFY_API_KEY: string;
		SHOPIFY_API_SECRET: string;
		SCOPES: string;
		HOST: string;
		SHOP: string;
	}
}