require('dotenv').config();
const nodemailer = require('nodemailer');

export default (req, res) => {
    console.log(req.method);

    if (req.method !== 'POST') return res.send({ status: 404, success: false });

    const { from, to, name, phone, message, articles, total } = JSON.parse(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    let productos = '';
    articles.forEach((element) => {
        productos += `-> ${element.title}    ${element.amount}    €${element.total} \n`;
    });

    const mailOption = {
        from: process.env.EMAIL_USER,
        to: from,
        subject: `Nuevo pedido de ${name}`,
        text: `
            Contacto ${name}
            Teléfono: ${phone}
            E-mail: ${to}

            Mensaje:

            ${message}

            Productos:
            ----------------
            ${productos}
            ----------------

            Total: €${total.toFixed(2)}
    `,
    };

    transporter.sendMail(mailOption, (err) => {
        if (err) {
            console.log(err);
            res.send({ status: 500, success: false });
        } else {
            res.send({ status: 200, success: true });
        }
    });
};
