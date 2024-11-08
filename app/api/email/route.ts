import  KoalaWelcomeEmail  from '@/components/component/email-templates';
import { Resend } from 'resend';
import { auth, currentUser } from '@clerk/nextjs/server'

const resend = new Resend('re_KNzDDTwx_8gKv5LreysS8qmpvXThaSmkn');

/**
 * POST /api/email
 *
 * Send a welcome email to the user using resend.
 *
 * @returns {Promise<Response>}
 */
export async function POST() {
  const current = await currentUser();
  if(current.fullName){
    await resend.emails.send({
      from: 'AOSTAHUB <onboarding@resend.dev>',
      to: [current.emailAddresses[0].emailAddress],
      subject: 'Welcome into AOSTAHUB',
      react: KoalaWelcomeEmail({userFirstname: current.fullName}),
    });
    return Response.json(current);
  }
}