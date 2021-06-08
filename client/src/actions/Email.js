import emailjs from 'emailjs-com'

const Email = (subject, email, body, signature) => {
  var templateParams = {
    subject: subject,
    email: email,
    body: body,
    signature: signature,
  }

  const serviceID = 'service_dod96eb'
  const templateID = 'template_h8af3yb'
  const userID = 'user_EY6nMH0QMSyeSbCdl9Dyi'

  try {
    console.log('Got it')
    emailjs.send(serviceID, templateID, templateParams, userID)
  } catch (error) {
    console.log(error.message)
  }
}

export default Email
