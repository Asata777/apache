import express from 'express';
import { getUrl } from '../controllers/auxiliary';
const router = express.Router();
router.get('*', (req, res) => {
    // res.sendFile(getUrl(__dirname, '../../dist/index.html'));
    res.send('teest')
});

export { router as main };