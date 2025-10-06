import { json, type RequestHandler } from '@sveltejs/kit';
import puppeteer from 'puppeteer';

export const GET: RequestHandler = async ({ url }) => {
	const browser = await puppeteer.launch({        args: [
			'--no-sandbox',
			'--disable-setuid-sandbox'
		]});
	const page = await browser.newPage();

	// Load the page
	await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

	// Take screenshot
	await page.screenshot({
		path: './static/image/aktuelles-angebot.jpeg',
		type: 'jpeg',
		quality: 80, // 0–100
		fullPage: true
	});

	await browser.close();
	return json({"message":"ok"});
};
