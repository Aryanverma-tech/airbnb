const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");


const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connect to db");
})
.catch((err) => {
    console.log(err)}
    );

async function main() {
  await mongoose.connect(MONGO_URL);
}

const  initDb = async()=>{

    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"6605505bd668cb47287dc72c",
}));
    await Listing.insertMany(initData.data);
    console.log("data was initalized");
};
initDb();