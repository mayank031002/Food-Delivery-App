const mongoose = require("mongoose");
//const mongoURI =
  //"mongodb+srv://mayanktripathi12568:cQaGWjLxkiOUQieC@cluster0.caozf30.mongodb.net/gofoodmern?retryWrites=true&w=majority";
const mongoURI="mongodb://mayanktripathi12568:cQaGWjLxkiOUQieC@ac-lu9rilp-shard-00-00.caozf30.mongodb.net:27017,ac-lu9rilp-shard-00-01.caozf30.mongodb.net:27017,ac-lu9rilp-shard-00-02.caozf30.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-bdsd25-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoDB = async() => {
    await mongoose.connect(mongoURI, {useNewUrlParser:true},async(err,result) => {
    if(err) console.log("---",err);
    else{
    console.log("connected");
    const fetched_data=await mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray(async function(err,data){
        const foodCategory=await mongoose.connection.db.collection("foodCategory");
        foodCategory.find({}).toArray(function(err,catData){
            if (err) console.log(err);
            else {
                //By declaring global we can use/update it anywhere in our application
                global.food_items = data;
                global.foodCategory = catData;
            }
        })
        // if(err) console.log(err);
        // else{
        //     //By declaring global we can use/update it anywhere in our application
        //     global.food_items=data;
        // }
     })
    }
  });
}
//mongodb://mayanktripathi12568:cQaGWjLxkiOUQieC@ac-lu9rilp-shard-00-00.caozf30.mongodb.net:27017,ac-lu9rilp-shard-00-01.caozf30.mongodb.net:27017,ac-lu9rilp-shard-00-02.caozf30.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-bdsd25-shard-0&authSource=admin&retryWrites=true&w=majority
module.exports=mongoDB();
