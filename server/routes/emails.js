const express = require('express');
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config({path: '.env'});
//const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey(process.env.SEND_GRID_KEY);

const Sib =  require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apikey = client.authentications['api-key'];
apikey.apiKey = process.env.API_KEY_SIB;
const tranEmailApi = new Sib.TransactionalEmailsApi();




router.post("/sendmails", async (req, res) => {
    const {
        to,
        email,
        body,
        subject
    } = req.body

    const content = {
        to,
        from: email,
        subject,
        html: body
    }

    try {
        await tranEmailApi.sendTransacEmail({content})
        return res.status(200).send('Message sent successfully.')
    } catch (error) {
        // console.log('ERROR', error.message)
        return res.status(400).send('Message not sent.')
    }

})

router.post("/contact", async (req, res) => {

    const {
        email,
        body,
        subject
    } = req.body

    const content = {
        to: "hamiz.ali686@gmail.com",
        from: email,
        subject,
        text: body
    }

    try {
        await  tranEmailApi.sendTransacEmail({content})
        res.status(200).send('Message sent successfully.')
    } catch (error) {
        // console.log('ERROR', error.message)
        res.status(400).send('Message not sent.')
    }
});

module.exports = router