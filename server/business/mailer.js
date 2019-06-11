const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');


const sendEmail = function(req,res){
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
    from: 'tabbnabbers@gmail.com', 
    to: req.body.mail,
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!',
    template: 'index',
    context: {
        name: req.body.name,
        code: req.body.code

    } 
};
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log('Email sent!!!');
});
res.send("1");
}

module.exports.sendEmail = sendEmail;