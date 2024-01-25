//import { EmailTemplate } from '../../components/EmailTemplate'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
console.log("This is the resend from api/send: ", resend)

export const POST = async (request) => {
  console.log("We are inside the POST send route")
  const { email, token } = await request.json()

  console.log("This is the email from POST api/send route: ", email)
  
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href=" ${confirmLink}">here</a> to confirm email.</p>`
  })
}
