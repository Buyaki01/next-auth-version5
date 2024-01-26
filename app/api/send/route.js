import { NextResponse } from "next/server"
import { Resend } from 'resend'

export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { data } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: 'rittahbuyaki@gmail.com',
      subject: 'Testing Mail GET method after calling Get in register page',
      html: `<p>Click to confirm email.</p>`
    })

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error })
  }
}

export async function POST(request) {
  console.log("We are inside the POST mail route")

  const { tokenResponseToken, tokenResponseEmail } = await request.json()

  console.log("This is the email from POST api/send route: ", tokenResponseEmail)
  
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${tokenResponseToken}`

  const resend = new Resend(process.env.RESEND_API_KEY)
  console.log("This is the resend from api/send: ", resend)

  try {
    const { data } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: tokenResponseEmail,
      subject: 'Confirm your email',
      html: `<p>Click <a href=" ${confirmLink}">here</a> to confirm email.</p>`
    })

    if(data.status === 'success') {
      return NextResponse.json({ message: 'Email successfully sent!' })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.log("Error: ", error)
    return NextResponse.json({ error })
  }
}
