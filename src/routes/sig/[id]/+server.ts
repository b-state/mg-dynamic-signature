import { redirect } from '@sveltejs/kit';
import { logAccessData } from '$lib/serverHelpers';

export async function GET({ params }) {
	console.log(params);
	logAccessData(params.id, 'imageFetch');
	return redirect(307, '/image/aktuelles-angebot.jpeg');
}
