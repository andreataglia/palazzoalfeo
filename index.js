/////////////////////////////////////////////
////////////////// REQUIRES /////////////////
/////////////////////////////////////////////


const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// use it until testing
//process.env.TEST = true;


/////////////////////////////////////////////
////////////////// APP.USE //////////////////
/////////////////////////////////////////////

let public_dir = "/html/one-pages/palazzoalfeo";
app.use(express.static(__dirname + public_dir));
app.use(express.static("html"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



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
    if (req.body.field4_label != null && req.body.field4_label == "guest_3" && req.body.field4_value != "") {
        ospiti += ", " + req.body.field4_value;
    }
    if (req.body.field5_label != null && req.body.field5_label == "guest_4" && req.body.field5_value != "") {
        ospiti += ", " + req.body.field5_value;
    }
    if (req.body.field6_label != null && req.body.field6_label == "guest_5" && req.body.field6_value != "") {
        ospiti += ", " + req.body.field6_value;
    }
    if (req.body.field7_label != null && req.body.field7_label == "guest_6" && req.body.field7_value != "") {
        ospiti += ", " + req.body.field7_value;
    }
    if (req.body.field8_label != null && req.body.field8_label == "guest_7" && req.body.field8_value != "") {
        ospiti += ", " + req.body.field8_value;
    }
    if (req.body.field9_label != null && req.body.field9_label == "guest_8" && req.body.field9_value != "") {
        ospiti += ", " + req.body.field9_value;
    }
    if (req.body.field10_label != null && req.body.field10_label == "guest_9" && req.body.field10_value != "") {
        ospiti += ", " + req.body.field10_value;
    }
    if (req.body.msg != null && req.body.msg != "") {
        messaggio = req.body.msg;
    }

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: req.body.fromname + " <annaemasu@info.it>", // sender address
        to: "anna@gmail.com", // list of receivers
        subject: "Aò! Hanno scritto da annaemasu.it!", // Subject line
        html: '<p>Ha scritto <b>' + req.body.fromname + '</b>!! (con mail: ' + req.body.fromemail + ')</p> <p>Alla domanda chi "Ci sei?" ha detto: <b>' + req.body.field0_value + '</b> </p> <p>Parla a nome di: ' + ospiti + '<p> <p>Ha lasciato questo messaggio: ' + messaggio + '<p>'
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
