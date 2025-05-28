import { Request, Response } from 'express';
import { saveLogsForUser, getLogsForUser } from '../services/log.service';

export const syncLogsController = async (req: Request, res: Response) => {
  const { sessionKey, logs } = req.body;

  if (!sessionKey || !logs) {
    res.status(400).json({ error: 'sessionKey and logs are required' });
    return;
  }

  try {
    await saveLogsForUser(sessionKey, logs);
    res.status(200).json({ message: 'Logs synced successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getLogsController = async (req: Request, res: Response) => {
  const { sessionKey } = req.query;

  if (!sessionKey || typeof sessionKey !== 'string') {
    res.status(400).json({ error: 'sessionKey is required' });
    return;
  }

  try {
    const data = await getLogsForUser(sessionKey);
    res.status(200).json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};