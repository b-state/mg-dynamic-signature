import { appendFileSync, existsSync, writeFileSync } from 'fs';
import type { RouteParams } from '$app/types';

export function logAccessData(request:Request, params: RouteParams<any>, type: 'imageFetch' | 'offerPageRedirect') {
	const timestamp = new Date().toISOString();
	const userAgent = request.headers.get('user-agent') || 'unknown';
	const filePath = './log/access-log.csv';

	if (!existsSync(filePath)) {
		writeFileSync(filePath, 'timestamp,senderID,type,userAgent\n', 'utf-8');
	}

	appendFileSync(filePath, `${timestamp},${params.id},${type},"${userAgent}"\n`, 'utf-8');
}
