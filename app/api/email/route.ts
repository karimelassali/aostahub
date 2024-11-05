import  KoalaWelcomeEmail  from '@/components/component/email-templates';
import { Resend } from 'resend';
import { auth, currentUser } from '@clerk/nextjs/server'

const resend = new Resend('re_KNzDDTwx_8gKv5LreysS8qmpvXThaSmkn');

export async function POST() {
  try {
    const current = await currentUser()
    if(current.fullName){
      const { data, error } = await resend.emails.send({
        from: 'AOSTAHUB <onboarding@resend.dev>',
        to: [`${current.emailAddresses[0].emailAddress}`],
        subject: 'Welcome into AOSTAHUB',
        react: KoalaWelcomeEmail({userFirstname:`${current.fullName}`}),
      });
      if (error) {
        return Response.json({ error }, { status: 500 });
      }
      return Response.json(current);
    }
  } catch (error) {
    return Response.json({ error }, { status: 500 });
    
  }
}
