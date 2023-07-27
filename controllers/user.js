

const User = require('../models/user')


//Render the Signin Page
module.exports.Signin = function (req, res) {
   res.render('./signinPage');
}

//Render the SignUp Page
module.exports.SignUp = function (req, res) {
   res.render('./signupPage');
}


//Get the sign up Data 
module.exports.create = async function (req, res) {
   try {
      if (req.body.password != req.body.confirm_password) {
         req.flash('error','Passwords do not match');
         return res.redirect('back');
      }

     

      let user = await User.findOne({ email: req.body.email });
      if (!user) {
         await User.create(req.body);
         req.flash('success', 'User Created succesfully');
         return res.redirect('back');
      }
      else {
         req.flash('error', 'User Already exits,Try signing in');
         return res.redirect('back');
      }

   }
   catch (error) {

      console.log('Error', error);
      return res.redirect('back');
   }

}

//Sign in and create the session for the user
module.exports.createSession = function (req, res) {
   return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
   req.logout(function (error) {
      if (error) {
         console.log('Error while signing out');
         return res.redirect('back');
      }

      return res.redirect('/users/Signin');
   });

}


