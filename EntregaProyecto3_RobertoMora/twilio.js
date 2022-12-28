import twilio from 'twilio'
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = twilio(accountSid, authToken);

export  async function sms(phone) {
  client.messages
    .create({
      body: "Su pedido ha sido recibido y se encuentra en proceso.",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    })
    .then((message) => console.log(message.sid))
    .done();
}
