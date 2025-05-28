import express from 'express';
import { syncLogsController, getLogsController } from '../controller/tracking.controller';

const router = express.Router();

router.post('/sync', syncLogsController);
router.get('/fetch', getLogsController);

export default router;