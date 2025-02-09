import express from 'express';
import Parti from './Parti.js';
import Data from './Data.js';
let router = express.Router();
export default router;

router.post('/create-parti', async (req, res) => {
  let { schedule, ...others } = req.body;
  let _p = new Parti(schedule, others);
  res.json(await _p.save());
});

router.post('/schedule-visit/:id', async (req, res) => {
  let _p = await Parti.findByIdAndUpdate(req.params.id);
});
