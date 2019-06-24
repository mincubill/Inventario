const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');


const sendEmail = function(mail){
let transporter = nodemailer.createTransport({
service: 'gmail',
auth:{
    user: process.env.EMAIL || 'ecocvhackathon@gmail.com', // TODO: your gmail account 
    pass: process.env.PASSWORD || 'duoc.2019' // TODO: your gmail password
}
});

const handlebarOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: './views/',
      layoutsDir: './views/',
      defaultLayout: 'index.handlebars',
    },
    viewPath: './views/',
    extName: '.handlebars',
  };

transporter.use('compile', hbs(handlebarOptions));
let mailOptions = {
    from: 'noreplyPrestamoDuoc@gmail.com', 
    to: mail.mail,
    subject: 'Pedido',
    text: 'Tu Pedio esta Listo',
    template: 'index',
    context: {
        name: mail.name,
        code: mail.code

    } 
};
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log('Email sent!!!');
});
}

module.exports.sendEmail = sendEmail;