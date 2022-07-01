const moongoose = require("mongoose");
const password = encodeURIComponent("manish@123")
module.exports = async() => {
     try {
         await moongoose.connect(`mongodb+srv://manishReddy:${password}@cluster0.xnkhp.mongodb.net/?retryWrites=true&w=majorit`, {
                useUnifiedtopology: true,
                useNewUrlParser: true
             });
             console.log('DB Connected......');
     } catch (error) {
          console.log(error.message)
     }
}