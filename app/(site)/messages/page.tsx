import type { Metadata } from 'next';
import { MessagesClient } from './MessagesClient';

// /messages — real lead-capture backend (see app/api/messages/route.ts).
// Visual style ported from the DCLogic mockup at
// "Celebrity website project/Messages.dc.html"; see MessagesClient.tsx for
// the behavior differences from that mockup (real name/email capture, no
// scripted fake replies).

export const metadata: Metadata = {
  title: 'Messages',
  description: "Send Eugine Micah's team a booking inquiry, brand partnership request or general message.",
  alternates: { canonical: '/messages' },
};

export default function MessagesPage() {
  return <MessagesClient />;
}
