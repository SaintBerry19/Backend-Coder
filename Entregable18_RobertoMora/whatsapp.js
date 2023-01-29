import twilio from 'twilio'
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = twilio(accountSid, authToken);
 
export  async function whatsapptext(phone,mail,body) {
let array =[]
body.forEach((object)=>{
  let newObject={producto:object.nombre,cantidad:object.cantidad,subtotal:object.subtotal}
  array.push(newObject)
})
client.messages 
      .create({ 
         body: `Nuevo pedido de ${mail}, se muestra a continuacion: \n 
         ${JSON.stringify(array)}
         `, 
         from: process.env.TWILIO_WHATSAPP_NUMBER,       
         to: phone 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
    }