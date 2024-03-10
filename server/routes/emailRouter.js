import { Router } from 'express';
import axios from 'axios';
import { config } from 'dotenv';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const router = new Router();
config();

router.post('/send-email', checkRoleMiddleware([2, 3]), async (req, res) => {
  try {
    const { to, templateId, params } = req.body;

    const paramsObject = {};
    params.forEach((item) => {
      paramsObject[item.code] = item.value;
    });

    to.forEach(async (item) => {
      try {
        await axios.post(
          `https://api.notisend.ru/v1/email/templates/${templateId}/messages`,
          { to: item.email, params: paramsObject },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.NOTISEND_APIKEY}`,
            },
          }
        );
      } catch (error) {
        console.log(error.message);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
