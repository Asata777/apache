import express from 'express';
import path from 'path';
const router = express.Router();
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

export { router as main };