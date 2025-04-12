import type { NextApiRequest, NextApiResponse } from 'next';
import { sendDailyUpdateEmails } from '~/server/jobs/getEmails';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    await sendDailyUpdateEmails();
    return res
      .status(200)
      .json({ success: true, message: 'Daily update emails sent.' });
  } catch (error: any) {
    console.error('Error in API route:', error);
    return res.status(500).json({ error: error.message });
  }
}
