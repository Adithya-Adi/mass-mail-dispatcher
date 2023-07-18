const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const Sib = require('sib-api-v3-sdk');

const client = Sib.ApiClient.instance;

const apiKey = client.authentications['api-key'];
apiKey.apiKey = "API_KEY";

app.use(bodyParser.json());
app.use(cors());
app.post('/api/users', (req, res) => {
  console.log(req.body);
  const validEmails = req.body.validEmails;
  for(var i=0;i<validEmails.length;i++)
  {
     sendInBlue(req.body,validEmails[i]);
  }
  res.json({ message: 'Mail Sent successfully' });
});


const sendInBlue = (mailBody,mail) => {
  console.log(mail);
  const sender = {
    email: mailBody.fromMail,
    name: mailBody.name,
  };
  const transactionalEmailApi = new Sib.TransactionalEmailsApi();
  transactionalEmailApi
      .sendTransacEmail({
        subject: mailBody.subject,
        sender,
        to: [
          {
            email: mail,
          },
        ],
        textContent: 'Hello ',
        htmlContent: `<h3>${mailBody.message}</h1>`,
        params: {
          role: 'frontend',
        },
      })
      .then(console.log)
      .catch(console.log);
};

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
