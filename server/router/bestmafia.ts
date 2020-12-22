import express from 'express';
import { getModersOnline } from '../controllers/moders';
import { menuPayment, getQiwiLink } from '../controllers/payments';
import { playerIds, botMenu, verifyMenuAccess } from '../controllers/menu';
import path from 'path';
const router = express.Router();

router.post('/moders', (req, res) => res.json(getModersOnline()));

router.post('/pay', async (req, res) => res.json(await menuPayment(req)));

router.post('/qiwiLink', async (req, res) => res.json(await getQiwiLink(req)));


router.get('/playerIds', (req, res) => res.json({ ids: playerIds() }));
router.get('/success_pay', (req, res) => res.send('Спасибо за покупку! Теперь можете воспользоваться скриптом на платное меню!'));
router.get('/:type.js', (req, res) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', "no-cache");
    res.header('Expires', '0');
    verifyMenuAccess(req, res)

});
router.get('/:hash/:type.js', (req, res) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', "no-cache");
    res.header('Expires', '0');
    botMenu(req, res)
});

export { router as bestmafia };