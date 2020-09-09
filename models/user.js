const crypto = require('crypto');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is Required"
  },

  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  hash:String,
  salt:String

});

UserSchema.methods.setPassword = (password)=>{ 
       this.salt = crypto.randomBytes(16).toString('hex'); 
       this.hash = crypto.pbkdf2Sync(password, this.salt,  
       1000, 64, `sha512`).toString(`hex`); 
   }; 
     

   UserSchema.methods.validatePassword =(password) =>{ 
      let hash = crypto.pbkdf2Sync(password,  
       this.salt, 1000, 64, `sha512`).toString(`hex`); 
       return this.hash === hash; 
   }; 

const User = mongoose.model("User", UserSchema);
module.exports = User;
