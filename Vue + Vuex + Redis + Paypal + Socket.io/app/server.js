/**
 * "StAuth10222: I Alec Pasion, 000811377 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else."
 */
import express from "express";
import * as paypal from "./paypal.js";
import redis from "redis";
import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const client = redis.createClient({
  url: "redis://redis-12617.c8.us-east-1-4.ec2.cloud.redislabs.com:12617"
  ,password: "3gtR14vX9PBDgmV0zkUp0A19tqIv0Kl0"
})
let allItems=[];
let breads = []
let fruits = []
let vegetables = []
let food_id_count = 0;
client.subscribe("breads");
client.subscribe("vegetables");
client.subscribe("fruits");
app.use(express.static("./"));
app.post("/create-order", async (req,res) => {
  let items = JSON.parse(req.headers.body);
  const purchase_units = [
    {
      amount: {
        currency_code: "CAD",
        value: 0,
        breakdown: {
          item_total: {
            currency_code: "CAD",
            value: 0,
          }
        },
      },

      items: [
      ],
    },
  ];
  await items.forEach(element => {
    let serverItem = allItems.filter(x=>x.id == element.item.id)
    purchase_units[0].amount.value += serverItem[0].price;
    purchase_units[0].amount.breakdown.item_total.value += serverItem[0].price;
    purchase_units[0].items.push({name:serverItem[0].type,unit_amount:{currency_code:"CAD",value:serverItem[0].price},quantity:1})
  });
  try
  {
    let order = await paypal.createOrder(purchase_units);
    res.json({ id: order.id })
  } 
  catch (e) {
    res.status(500).json({ error: e.message })
  }
});
io.on('connection', function(socket){
  io.emit("loaddata", {"breads":JSON.stringify(breads),"vegetables":JSON.stringify(vegetables),"fruits":JSON.stringify(fruits)})
  socket.on("remove", function(data)
  {
    let cart = JSON.parse(data);
    cart.forEach(element => {
      let i = allItems.findIndex(p=>p.id == element.item.id);
      allItems.splice(i,1);
      if(element.food_type=="bread"){
        let index = breads.findIndex(p => p.id == element.item.id);
        breads.splice(index,1);
      }else if(element.food_type=="vegetable"){
        let index = vegetables.findIndex(p => p.id == element.item.id);
        vegetables.splice(index,1);
      }else{
        let index = fruits.findIndex(p => p.id == element.item.id);
        fruits.splice(index,1);
      }
    });
  });
});
client.on("message", function(channel, message) {
  let data = JSON.parse(message)
  food_id_count += 1
  data.id = food_id_count
  if(channel =="breads"){
    breads.push(data)
    io.sockets.emit("newbread",data)
  }else if(channel == "vegetables"){
    vegetables.push(data)
    io.sockets.emit("newveg",data)
  }else {
    fruits.push(data)
    io.sockets.emit("newfruit",data)
  }
  allItems.push(data)
});
app.set('port', process.env.PORT || 3000);
httpServer.listen(app.get('port'), function () {
  var port = httpServer.address().port;
  console.log('Running on : ', port);
});