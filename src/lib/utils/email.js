const nodemailer = require('nodemailer');

class SendMail {
  /* Info: (20230324 - Julian) 設定不含參數的 constructor */
  constructor() {
    /* Info: (20230324 - Julian) nothing to do */
  }

  static async sendMail(config, comment) {
    /* Info: (20230324 - Julian) create gmail service */
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        /* Info: (20230324 - Julian) 發信的帳號密碼，由 dotenv 傳入以保障安全 */
        user: config.googleClientID,
        pass: config.googleClientPassword,
      },
    });

    /* Info: (20230324 - Julian) 設定信件模板 */
    const mailOptions = {
      /* Info: (20230324 - Julian) 寄件地址 */
      from: config.googleClientID,
      /* Info: (20230324 - Julian) 收信人 */
      to: config.googleClientID,
      /* Info: (20230324 - Julian) 主旨 */
      subject: 'iSunCloud 表單回覆',
      /* Info: (20230324 - Julian) plaintext body */
      text: comment,
      /* Info: (20230324 - Julian) html body */
      html: '<p>' + comment + '</p>',
    };

    /* Info: (20230324 - Julian) send mail with defined transport object */
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw error;
      } else {
        return info.response;
      }
    });

    return {success: true};
  }
}

(module.exports = SendMail),
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
    },
  };
