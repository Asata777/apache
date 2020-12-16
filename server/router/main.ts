import express from 'express';
import { getUrl } from '../controllers/auxiliary';
const router = express.Router();
router.get('*', (req, res) => {
    // res.send('ok')
    res.sendFile(getUrl(__dirname, '../dist/index.html'));
});

export { router as main };