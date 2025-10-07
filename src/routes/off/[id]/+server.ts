import { logAccessData } from '$lib/serverHelpers';

export async function GET({ request, params }) {
	logAccessData(request, params, 'offerPageRedirect');

	return new Response(null, {
		status: 302,
		headers: {
			Location: 'https://verkauf.m-goetz.de/kaufen/'
		}
	});
}
