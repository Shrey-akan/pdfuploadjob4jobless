const mongoose = require("mongoose");
module.exports = async () => {
   const mongourl= "mongodb+srv://bhardwajashwani601:BmyRSfvE77XQ74tz@cluster0.mplvtqb.mongodb.net/?retryWrites=true&w=majority"
    try {
        const connect = await mongoose.connect(mongourl, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log("mongoose connected successfully");
    } catch (e) {
        console.log(error);
        process.exit(1);
    }
}