/////////////////////////////////////////////
////////////////// REQUIRES /////////////////
/////////////////////////////////////////////


const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
var cookieParser = require('cookie-parser');
var i18n = require("i18n");


/////////////////////////////////////////////
////////////////// APP.USE //////////////////
/////////////////////////////////////////////

let public_dir = "/html/one-pages/palazzoalfeo";
app.use(express.static(__dirname + public_dir));
app.use(express.static("html"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// view engine setup
app.set('views', "html/one-pages/palazzoalfeo");
app.set('view engine', 'ejs');

i18n.configure({
    locales:['en', 'it'],
    cookie: 'langCookie',
    directory: __dirname + '/locales'
});

app.use(cookieParser());
app.use(i18n.init);


/////////////////////////////////////////////
///////////////// APP.INIT //////////////////
/////////////////////////////////////////////

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/en', function(req, res) {
    req.setLocale('en');
    res.render('index');
});

app.get('/it', function(req, res) {
    req.setLocale('it');
    res.render('index');
});



/////////////////////////////////////////////
///////////////// APP.POST //////////////////
/////////////////////////////////////////////

app.post('/contactForm', function(req, res) {

    console.log("contact post received...");
    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'clinic.pms@gmail.com',
            pass: 'megliosucochemaleaccompagnato'
        }
    };
    var transporter = nodemailer.createTransport(smtpConfig);

    var messaggio = "...non ha scritto niente";
    var ospiti = "";

    if (req.body.field1_label != null && req.body.field1_label == "guest" && req.body.field1_value != "") {
        ospiti += req.body.field1_value;
    }
    if (req.body.field2_label != null && req.body.field2_label == "guest_1" && req.body.field2_value != "") {
        ospiti += req.body.field2_value;
    }
    if (req.body.field3_label != null && req.body.field3_label == "guest_2" && req.body.field3_value != "") {
        ospiti += ", " + req.body.field3_value;
    }

    if (req.body.msg != null && req.body.msg != "") {
        messaggio = req.body.msg;
    }

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: req.body.fromname + " <annaemasu@info.it>", // sender address
        to: "drew.taglia@gmail.com", // list of receivers
        subject: "Massaggio da Palazzo Alfeo", // Subject line
        html: '<p>Ha scritto <b>' + req.body.name + '</b>!! (con mail: ' + req.body.fromemail + ')</p> <p>Alla domanda chi "Ci sei?" ha detto: <b>' + req.body.field0_value + '</b> </p> <p>Parla a nome di: ' + ospiti + '<p> <p>Ha lasciato questo messaggio: ' + messaggio + '<p>'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('ok');
});


/////////////////////////////////////////////
/////////////////// INIT ////////////////////
/////////////////////////////////////////////

// instantiate the app

let serverPort = process.env.PORT || 5000;
app.set("port", serverPort);

/* Start the server on port 3000 */
app.listen(serverPort, function() {
    console.log(`Server ready ${serverPort}`);
});
