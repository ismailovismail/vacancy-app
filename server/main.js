import { Meteor } from 'meteor/meteor'
import '../imports/startup/server/index'

Accounts.emailTemplates.resetPassword = {
  subject() {
    return "Reset your password!";
  },
  html(user, url) {
    let urlWithoutHash = url.replace('#/', '');

    //  TAPi18n.setLanguage(lng)
     
    return `  <head>
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
     <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
     <!--[if !mso]--><!-- -->
     <link href='https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700' rel="stylesheet">
     <link href='https://fonts.googleapis.com/css?family=Quicksand:300,400,700' rel="stylesheet">
     <!-- <![endif]-->
 
     <title>Reset password</title>
     <body>
     <h1>Hello, ${user.username}</h1>
     <a href="${urlWithoutHash}">Click me to reset<a/>
     </body>
     `;


  }

}





Meteor.startup(() => {
  // code to run on server at startup
  process.env.MAIL_URL = "smtp://ismayili662@gmail.com:rntvgjquehsulyeu@smtp.gmail.com:587";
  console.log('Server side');
});
