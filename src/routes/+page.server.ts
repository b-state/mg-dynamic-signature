import type { PageServerLoad } from '../../.svelte-kit/types/src/routes/$types';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { fromEnv } from '@aws-sdk/credential-providers';
import 'dotenv/config'
import type { Openimmo } from '$lib/types';

const client = new DynamoDBClient({credentials:fromEnv()});
const docClient = DynamoDBDocumentClient.from(client);

export const load: PageServerLoad = async () => {
	const command = new ScanCommand({
		ExpressionAttributeValues: {
			":k": "kauf"
		},
		FilterExpression: "property_marketing_type = :k",
		TableName: process.env.DYNAMODB_TABLE_NAME
	});

	const response = await docClient.send(command);
	const tableItems = response.Items?.sort((a, b) => b.timestamp - a.timestamp).slice(0, 3).map(a => a.property_data.openimmo) as Openimmo[];

	return { tableItems};
};
