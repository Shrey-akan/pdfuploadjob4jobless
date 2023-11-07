const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    uid: {
        type: String,
        required: true,
        unique: true,
      },
    image: {
      publicId: String,
        url: String,
      },
  },
 
);

module.exports = mongoose.model("Job4joblesscloudniary", userSchema);
