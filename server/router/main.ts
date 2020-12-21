import express from 'express';
import { getUrl } from '../controllers/auxiliary';
import path from 'path';
const router = express.Router();
router.get('*', (req, res) => {
    
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
    // res.send('Nu rabotayet zhe')
});

export { router as main };