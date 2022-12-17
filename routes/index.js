import express from 'express';
import { generateImageFromPrompt } from '../api/open_ai_requests.js';
import { validateReqBody } from '../lib/helpers.js';
const router = express.Router();

router.post('/imagegen', async (req, res) => {
  if (
    validateReqBody({
      body: req.body,
      expectedProperties: ['prompt'],
    })
  ) {
    let imageData = null;
    try {
      imageData = await generateImageFromPrompt(req.body.prompt);
    } catch (err) {
      console.log(err);
    }

    if (imageData) return res.json({ result: true, imageData });
    res.json({ result: false, error: 'Failed to generate image' });
  }
});

export default router;
