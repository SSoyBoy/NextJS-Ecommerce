// import mongoose from "mongoose";

// const configOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// const connectToDB = async () => {
//   const connectionUrl = process.env.NEXT_PUBLIC_MONGODB_URI;

//   mongoose
//     .connect(connectionUrl, configOptions)
//     .then(() => console.log("Ecommerce database connected successfully!"))
//     .catch((err) =>
//       console.log(`Getting Error from DB connection ${err.message}`)
//     );
// };

// export default connectToDB;

import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const connectionUrl = process.env.NEXT_PUBLIC_MONGODB_URI;

    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Ecommerce database connected successfully!");
  } catch (err) {
    console.error(`Error from DB connection: ${err.message}`);
  }
};

export default connectToDB;
