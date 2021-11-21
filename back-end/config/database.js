const mongoose = require('mongoose');

const connectDB = () => {
      mongoose.connect(process.env.MONGOOSE_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
      }).then(res => {
          console.log(`Database connected to ${process.env.MONGOOSE_URL}`);
      })
}

module.exports = connectDB;