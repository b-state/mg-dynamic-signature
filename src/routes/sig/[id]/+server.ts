import { redirect } from '@sveltejs/kit';
import { logAccessData } from '$lib/serverHelpers';
import fs from 'fs/promises';
import path from 'path';

export async function GET({ request, params }) {
	logAccessData(request, params, 'imageFetch');

	const imageDir = path.resolve('static/image');
	const files = await fs.readdir(imageDir);

	let newestFile = '';
	let newestTime = 0;

	for (const file of files) {
		const filePath = path.join(imageDir, file);
		const stat = await fs.stat(filePath);
		if (stat.isFile() && stat.mtimeMs > newestTime) {
			newestTime = stat.mtimeMs;
			newestFile = file;
		}
	}

	if (!newestFile) {
		return new Response('No image found', { status: 404 });
	}

	return redirect(307, `/image/${newestFile}`);
}
