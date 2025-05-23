// import mongoose from 'mongoose';

// //Function to connect to the MONGODB database

// const connectDB = async() =>{
//     mongoose.connection.on('connected', () => console.log('MongoDb connected'))

//     await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
// }

// export default connectDB



import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const MONGO_URI = "mongodb+srv://haroon:haroongfprasanna@jobportalcluster.tqa3dw3.mongodb.net/jobportal?retryWrites=true&w=majority";

    const conn = await mongoose.connect(MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
