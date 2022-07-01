const mongoose = require("mongoose");
const password = encodeURIComponent("")
const username = manishReddy;
module.exports = async() => {
     try {
         await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.xnkhp.mongodb.net/?retryWrites=true&w=majorit`, {
                useUnifiedtopology: true,
                useNewUrlParser: true
             });
             console.log('DB Connected......');
     } catch (error) {
          console.log(error.message)
     }
}