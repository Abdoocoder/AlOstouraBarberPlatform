import { Router } from 'express';
import { Webhook } from 'svix';
import type { Request, Response } from 'express';

const router = Router();

router.post('/clerk', async (req: Request, res: Response) => {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    res.status(500).json({ error: 'Webhook secret not configured' });
    return;
  }

  const wh = new Webhook(secret);
  let event: any;

  try {
    event = wh.verify(JSON.stringify(req.body), {
      'svix-id': req.headers['svix-id'] as string,
      'svix-timestamp': req.headers['svix-timestamp'] as string,
      'svix-signature': req.headers['svix-signature'] as string,
    });
  } catch {
    res.status(400).json({ error: 'Invalid webhook signature' });
    return;
  }

  // Handle Clerk user events
  if (event.type === 'user.created') {
    console.log('New user created:', event.data.id);
    // You can sync user data to Convex here if needed
  }

  if (event.type === 'user.deleted') {
    console.log('User deleted:', event.data.id);
    // You can clean up user bookings here if needed
  }

  res.json({ received: true });
});

export default router;
