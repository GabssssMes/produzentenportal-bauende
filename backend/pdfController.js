const { unlinkSync } = require("fs");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const email = process.env.E_MAIL;
const emailpasswort = process.env.E_MAIL_PASSWORT;
dotenv.config();

exports.uploadFile = async (req, res) => {
  // console.log(req.body);
  //console.log(req.file.filename);
  res.send(req.file.filename);
};
exports.uploadSpi = async (req, res) => {
  res.send(req.file.filename);
}; /*
exports.uploadStromrechnung = async (req, res) => {
  res.send(req.file.filename);
};
exports.uploadKataster = async (req, res) => {
  res.send(req.file.filename);
};*/
exports.sendData = async (req, res) => {
  //console.log(req.body);
  let textWechselrichter =
    "\n\n\nTechnische Daten des Wechselrichters\n" +
    req.body.Wechselrichter.map((element) => {
      return (
        "\nSeriennummer:" +
        element.Seriennummer +
        "\nFirmware:" +
        element.Firmware +
        "\nMarke:" +
        element.Marke +
        "\nModell:" +
        element.Modell +
        "\n"
      );
    });
  const PVData = req.body.PVDaten;
  const Konformfilename = req.body.Erklärung.filename;
  const SpiFilename = req.body.Spi.filename;
  if (PVData.length === 0) return "error, to many empty fields";

  await sendMail(
    PVData["Vorname"].content + " " + PVData["Nachname"].content,
    PVData["Bauende"].content,
    Konformfilename,
    SpiFilename,
    textWechselrichter
  ).then(() => {
    res.send(
      "Vielen Dank, Ihre Daten wurden erfolgreich übermittelt! Sie können das Portal jetzt verlassen!"
    );
  });
};

sendMail = async (
  FullName,
  Bauende,
  Konformfilename,
  SpiFilename,
  textWechselrichter
) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:  {
      user: email,
      pass: emailpasswort,
    },
  });
  const info = await transporter.sendMail({
    from: email,
    to: "formulare.automatisiert@gmail.com",
    subject: "Bauende von " + FullName,
    text: "Bauende: " + Bauende + "\n" + textWechselrichter,
    attachments: [
      {
        filename: Konformfilename[Konformfilename.length - 1],
        path:
          "./backend/Documents/Uploads/" +
          Konformfilename[Konformfilename.length - 1],
      },
      {
        filename: SpiFilename[SpiFilename.length - 1],
        path:
          "./backend/Documents/Uploads/" + SpiFilename[SpiFilename.length - 1],
      },
    ],
  });

  console.log("Ihre Daten wurden erfolgreich gespeichert!");
  for (let i = Konformfilename.length - 1; i > -1; i--) {
    unlinkSync("./backend/Documents/Uploads/" + Konformfilename[i]);
    Konformfilename.pop();
  }
  for (i = SpiFilename.length - 1; i > -1; i--) {
    unlinkSync("./backend/Documents/Uploads/" + SpiFilename[i]);
    SpiFilename.pop();
  }
};
