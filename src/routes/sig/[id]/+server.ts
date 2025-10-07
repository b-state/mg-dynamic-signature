import { redirect } from '@sveltejs/kit';
import { logAccessData } from '$lib/serverHelpers';

export async function GET({ request, params }) {
	logAccessData(request, params, 'imageFetch');
	return redirect(307, '/image/aktuelles-angebot.jpeg');
}
