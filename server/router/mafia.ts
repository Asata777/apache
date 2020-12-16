import express from 'express';
// import { Mafia } from 'server/protected/mafia/main';
const router = express.Router();



/* router.get('/mafia', async (req, res) => {
    Mafia(req.body).then(data => res.json(data));
}); */
router.get('/mafia/vk_auth/:hash', async (req, res) => {
    /*axios.get(`https://oauth.vk.com/access_token?client_id=7249229&redirect_uri=http://localhost:8080/mafia/vk_auth/123abc&client_secret=I9nb0VYeRRhJ4yjQsMPw&code=${req.query.code}`)
       .then(res => console.log(res.data));
   req.query.type = 'vk_auth';
   const hash = req.params.hash;
   console.log(req.query, hash);
   // res.render('vk_auth');
   Mafia(req.query).then(data => {
       console.log(data);
       res.redirect(`/mafia/${hash}/`);
   }); */
});
export { router as mafia };