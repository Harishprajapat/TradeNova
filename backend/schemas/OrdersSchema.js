const {Schema}= require ("mongoose");

const OrdersSchema= new Schema({
    name: String,
    price: Number,
    percent: String,
    isDown: Boolean,
});

module.exports={OrdersSchema};