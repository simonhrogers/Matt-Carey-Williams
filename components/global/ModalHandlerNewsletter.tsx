import { useState } from 'react'
import axios from 'axios'
// import styles from './ModalHandler.module.scss'
import LongArrow from '@/components/shared/LongArrow'
// import Link from 'components/shared/Link'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Link from 'next/link'

export default function NewsletterModal() {

  const [state, setState] = useState('idle')
  const [errorMsg, setErrorMsg] = useState(null)

  let validationSchemaShape = {
    firstName: Yup.string()
      .required('First name is required'),
    lastName: Yup.string()
      .required('Last name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    gdpr: Yup.boolean()
      .required('Please agree to the privacy policy')
      .oneOf([true], 'Please agree to the privacy policy')
  }

  const validationSchema = Yup.object().shape(validationSchemaShape)

  const formOptions = { 
    resolver: yupResolver(validationSchema),
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState

  const onSubmit = async (data) => {
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4))
    const { email, firstName, lastName, gdpr } = data
    setState('Loading')
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter an email address.')
      setState('Error')
      return
    }
    if (!gdpr) {
      setErrorMsg('Please agree to the privacy policy.')
      setState('Error')
      return
    }
    try {
      // const response = await axios.post('/api/subscribe', { email, firstName, lastName })
      fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email, firstName, lastName }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response)
      })
      setState('Success')
      reset()
    } catch (e) {
      setErrorMsg('generic')
      setState('Error')
    }
  }

  return (
    <div className={"modalHandlerNewsletter"}>
      {/* Newsletter sign up woo woo */}
      <p className={"title"}>
        Newsletter
      </p>
      <p className={"formIntro"}>
        Please fill out the form below to subscribe to our newsletter to get our latest updates on upcoming exhibitions, events and more.
      </p>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className={"form"}
        noValidate
      >
        <fieldset className={"fieldset"}>
          {/* <legend className={"legend"}>Your Details</legend> */}
          <div className={"field"}>
            <label className={"label"} htmlFor="first-name-input">First Name</label>
            <input
              className={`${"input"} ${errors.firstName ? "isInvalid" : ''}`}
              id="first-name-input"
              name="firstName"
              type="text"
              placeholder="First Name"
              {...register('firstName')}
            />
            {errors.firstName?.message && <div className={"invalidFeedback"}>{errors.firstName?.message}</div>}
          </div>
          <div className={"field"}>
            <label className={"label"} htmlFor="last-name-input">Last Name</label>
            <input
              className={`${"input"} ${errors.lastName ? "isInvalid" : ''}`}
              id="last-name-input"
              name="lastName"
              type="text"
              placeholder="Last Name"
              {...register('lastName')}
            />
            {errors.lastName?.message && <div className={"invalidFeedback"}>{errors.lastName?.message}</div>}
          </div>
          <div className={"field"}>
            <label className={"label"} htmlFor="email-input">Email Address</label>
            <input 
              className={`${"input"} ${errors.email ? "isInvalid" : ''}`}
              required
              id="email-input"
              name="email"
              type="email"
              placeholder="Email Address"
              {...register('email')}
            />
            {errors.email?.message && <div className={"invalidFeedback"}>{errors.email?.message}</div>}
          </div>
        </fieldset>
        <fieldset className={"fieldset"}>
          {/* <legend className={"legend"}>Privacy Policy</legend> */}
          <div className={"checkboxOption"}>
            <input
              className={`${"checkbox"} ${errors.gdpr ? "isInvalid" : ''}`}
              required
              id="gdpr-checkbox"
              name="gdpr"
              type="checkbox"
              {...register('gdpr')}
            />
            <label 
              className={"checkboxLabel"} 
              htmlFor="gdpr-checkbox"
            >
              I agree to Matt Carey-Williams’ <Link href="/privacy-policy">Privacy Policy</Link>
            </label>
          </div>
          {errors.gdpr?.message && <div className={"invalidFeedback"}>{errors.gdpr?.message}</div>}
        </fieldset>
        <button
          disabled={state === 'Loading'}
          type="submit"
          className={"submitButton"}
        >
          Subscribe
        </button>
        {state === 'Error' && (
          <p className={"errorMessage"}>
            {errorMsg === 'generic' ? (
              <>Sorry, we were unable to subscribe you. This may be because you have already subscribed. Email <a href="mailto:info@mattcareywilliams.com">info@mattcareywilliams.com</a> for information.</>
            ) : (
              errorMsg
            )}
          </p> 
        )}
        {state === 'Success' && (
          <p className={"completeMessage"}>Thank you, you have successfully been subscribed.</p>
        )}
      </form>
    </div>
  )
}