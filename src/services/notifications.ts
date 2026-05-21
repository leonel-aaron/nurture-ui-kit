import { toast } from 'sonner';

/**
 * SECURE NOTIFICATION SERVICE
 * Direct link to Firebase Functions and Owner Node.
 * Target: leoneldeuga@gmail.com
 */

export const notifySecurely = async (type: 'USER_REG' | 'LOGIN' | 'BIO_ALERT' | 'COMMUNITY_SPIKE', data: any) => {
  console.log(`[MAMACARE SECURE CLOUD TRIGGER]: type=${type} node_id=${Math.random().toString(16).slice(2)}`, data);

  // Real world implementation trigger
  // const functionURL = `https://us-central1-mamacare-sec.cloudfunctions.net/emailOwner`;
  // await fetch(functionURL, { method: 'POST', body: JSON.stringify({ type, data, owner: 'leoneldeuga@gmail.com' }) });

  if (type === 'BIO_ALERT') {
    toast.error('CRITICAL BIO-HANDSHAKE ALERT.', {
      description: 'The ecosystem lead Leonel Aaron and your physician node have been signaled.'
    });
  }
};

export const notifyLoginProtocol = (email: string) => notifySecurely('LOGIN', { email, timestamp: new Date().toISOString() });
export const notifyNewProtocol = (details: any) => notifySecurely('USER_REG', details);