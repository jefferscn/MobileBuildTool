import express from 'express';
import pack from './pack';
const router = express.Router();
const status = {
    busy: false,
};
router.get('/', (req, res) => {
    res.render('pack', { title: '打包' });
});
router.get('/status', (req, res) => {
    res.json(status);
});
router.post('/', (req, res) => {
    status.busy = true;
    (function () {
        pack()
            .then(
            )
            .then(() => {
                status.busy = false;
                res.send('打包成功');
            })
            .catch(() => {
                status.busy = false;
                res.send('打包失败');
            });
        res.send('打包中');
    }());
});
export default router;
