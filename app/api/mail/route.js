//import { EmailTemplate } from '../../components/EmailTemplate'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
console.log("This is the resend from api/send: ", resend)

export async function POST(request) {
  console.log("We are inside the POST mail route")
  const { tokenResponseToken, tokenResponseEmail } = await request.json()

  console.log("This is the email from POST api/mail route: ", tokenResponseEmail)
  
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${tokenResponseToken}`

  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['rittahbuyaki@gmail.com'], //tokenResponseEmail
      subject: 'Confirm your email',
      html: `<p>Click <a href=" ${confirmLink}">here</a> to confirm email.</p>`
    })

    return Response.json(data)
  } catch (error) {
    return Response.json({ error })
  }
}
