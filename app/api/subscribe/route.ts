import axios from 'axios'

export const dynamic = 'force-dynamic'

export async function POST(req, res) {

  const request = await new Response(req.body).json();

  const { email, firstName, lastName } = request

  const API_KEY = process.env.MAILCHIMP_API_KEY
  const API_SERVER = process.env.MAILCHIMP_API_SERVER
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
  
  const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`

  const data = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName
    },
    marketing_permissions: [
      {
        marketing_permission_id: '0dc22df99b',
        text: 'Email',
        enabled: true
      }
    ]
  }

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `api_key ${API_KEY}`
    }
  }

  try {
    const res = await axios.post(url, data, options)
    if (res.status >= 400) {
      return new Response(
        `There was an error subscribing to the newsletter. Shoot me an email at hello@simonrogers.info and I'll add you to the list.`, 
        { status: res.status}
      )
    }
    console.log(res.data);
    return new Response(
      JSON.stringify(res.data), 
      { status: 201 }
    )
  } catch (error) {
    console.log(error)
    return new Response(
      error.message, 
      { status: 500 }
    )
  }
}


// export default async (req, res) => {
//   const { email, firstName, lastName } = req.body

//   if (!email || !email.length) {
//     return res.status(400).json({ error: 'Email is required' })
//   }

//   const API_KEY = process.env.MAILCHIMP_API_KEY
//   const API_SERVER = process.env.MAILCHIMP_API_SERVER
//   const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
  
//   const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`

//   const data = {
//     email_address: email,
//     status: 'subscribed',
//     merge_fields: {
//       FNAME: firstName,
//       LNAME: lastName
//     }
//   }

//   const options = {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `api_key ${API_KEY}`
//     }
//   }

//   try {
//     const response = await axios.post(url, data, options)
//     if (response.status >= 400) {
//       return res.status(400).json({
//         error: `There was an error subscribing to the newsletter. Shoot me an email at ogbonnakell@gmail and I'll add you to the list.`
//       })
//     }
//     return res.status(201).json({ message: 'success' })
//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({ error: error.message })
//   }
// }
