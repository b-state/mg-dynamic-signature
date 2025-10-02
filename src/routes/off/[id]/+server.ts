import { logAccessData } from '$lib/serverHelpers';

export async function GET({ params }) {
	logAccessData(params.id, 'offerPageRedirect');

	return new Response(null, {
		status: 302,
		headers: {
			Location: 'https://verkauf.m-goetz.de/kaufen/'
		}
	});
}
