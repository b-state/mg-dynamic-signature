import { appendFileSync, existsSync, writeFileSync } from 'fs';

export function logAccessData(senderID: string, type: 'imageFetch' | 'offerPageRedirect') {
	const timestamp = new Date().toISOString();
	const filePath = './log/access-log.csv';

	if (!existsSync(filePath)) {
		writeFileSync(filePath, 'timestamp,senderID,type\n', 'utf-8');
	}

	appendFileSync(filePath, `${timestamp},${senderID},${type}\n`, 'utf-8');
}
