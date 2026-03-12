const {Schema}= require ("mongoose");

const OrdersSchema= new Schema({
    name: String,
    price: Number,
    percent: String,
    mode: String,
});

module.exports={OrdersSchema};