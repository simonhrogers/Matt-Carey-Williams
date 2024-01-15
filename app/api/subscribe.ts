import axios from 'axios'

export default async (req, res) => {
  const { email, firstName, lastName } = req.body

  if (!email || !email.length) {
    return res.status(400).json({ error: 'Email is required' })
  }

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
    // marketing_permissions: [
    //   {
    //     marketing_permission_id: 'f6c8a3b7e5',
    //     text: 'Email',
    //     enabled: true
    //   }
    // ],
  }

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `api_key ${API_KEY}`
    }
  }

  try {
    const response = await axios.post(url, data, options)
    // const response = await axios.get(getAudienceInterestLists, options)
    // const response = await axios.get(getAudienceInterestCategories, options)
    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error subscribing to the newsletter.`
      })
    }
    console.log(response)
    return res.status(201).json({ message: 'success', data: response.data })
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ error: error.message })
  }
}


// const fetch = require("node-fetch");

// exports.handler = function (event, context, callback) {
//     const listId = process.env.MAILCHIMP_LIST_ID;
//     if (listId === undefined) {
//         callback(null, {
//             statusCode: 400,
//             body: JSON.stringify({ error: "missing listId" }),
//         })
//         return;
//     }

//     const authHeader = `apikey ${process.env.MAILCHIMP_API_KEY}`;
//     if (process.env.MAILCHIMP_API_KEY === undefined) {
//         callback(null, {
//             statusCode: 400,
//             body: JSON.stringify({ error: "missing api key" }),
//         })
//         return;
//     }

//     const interestId = event.queryStringParameters.interestId;
//     const memberHash = event.queryStringParameters.memberHash;

//     if (interestId === undefined) {
//         console.log(`Missing interestId: ${JSON.stringify(event)}`)
//         callback(null, {
//             statusCode: 400,
//             body: JSON.stringify({ error: "missing interestId" }),
//         })
//         return;
//     }

//     if (memberHash === undefined) {
//         console.log(`Missing member hash: ${JSON.stringify(event)}`)
//         callback(null, {
//             statusCode: 400,
//             body: JSON.stringify({ error: "missing memberHash" }),
//         })
//         return;
//     }

//     const payload = {
//         "interests": {
//             [interestId]: true
//         }
//     };
//     console.log(`Payload: ${JSON.stringify(payload)}`);
//     console.log(`Adding interest ${interestId} to user ${memberHash}`);

//     const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${memberHash}`

//     console.log(`Invoking URL: ${url}`);

//     fetch(url, {
//         method: 'PATCH',
//         headers: {
//             'Authorization': authHeader,
//         },
//         body: JSON.stringify(payload),
//     }).then(x => x.json()).then(data => {
//         console.log(`Request successful: ${JSON.stringify(data)}`);
//         callback(null, {
//             statusCode: 200,
//             body: JSON.stringify({ msg: "Subscription updated" })
//         })
//     })
// };