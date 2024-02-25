import { Router } from 'express';
import axios from 'axios';
import { config } from 'dotenv';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const router = new Router();
config();

router.post('/send-email', checkRoleMiddleware([2, 3]), async (req, res) => {
  try {
    const { to, templateId, params } = req.body;
    /* const { from_email, to, subject, text } = req.body; */

    const requestData = {
      to,
      params,
    };

    /* const requestData = {
      from_email,
      to,
      subject,
      text,
    }; */

    const response = await axios.post(
      `https://api.notisend.ru/v1/email/templates/${templateId}/messages`,
      /* 'https://api.notisend.ru/v1/email/messages ', */
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NOTISEND_APIKEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
