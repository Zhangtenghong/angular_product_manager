var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('express-flash');
var path = require('path');

app.use(flash());
app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

mongoose.connect('mongodb://localhost/products');
var ProductSchema = new mongoose.Schema({
  title:  { type: String, required: true, minlength:4},
  price: { type: Number, required: true},
  image: { type: String}
 } , {timestamps:true});
mongoose.model('Product', ProductSchema);
var Product = mongoose.model('Product'); 

app.get('/api/products', function(req, res) {
  Product.find({}, function(err, products){
    if(err){
      console.log("Returned error", err);
      return res.json({message:"Error", error:err})
    } else {
      return res.json(products)
    }
  })
})

app.get('/api/products/:id', function(req, res) {
  Product.findOne({_id:req.params.id}, function(err, product){
    if(err){
      console.log("Returned error", err);
      return res.json({message:"Error", error:err})
    } else {
      console.log("the product is", product)
      return res.json(product)
    }
  })
})

app.post('/api/products', function(req, res) {
  console.log("POST DATA", req.body);
  var product = new Product({title: req.body.title, price: req.body.price, image: req.body.image});
  product.save(function(err) {
    if(err) {
      console.log("Returned error", err);
      for(var key in err.errors){
        req.flash('registration', err.errors[key].message)
      }
      return res.json({message:"Error", error:err})
    } else { 
      return res.json({message:"Success"})
    }
  })
})

app.put('/api/products/:id', function(req, res){
  console.log("888888888888888888888888888888888888")
  console.log(req.body);
  console.log("POST DATA", req.body);
  Product.update({_id:req.params.id}, {title: req.body.title, price: req.body.price, image: req.body.image}, function(err){
    if(err){
      console.log("Returned error", err);
      return res.json({message:"Error", error:err})
    } else {
      return res.json({message:"Success"})
    }
  })
})

app.delete('/api/products/:id', function(req, res){
  console.log("POST DATA", req.body);
  Product.remove({_id:req.params.id}, function(err){
    if(err){
      console.log("Returned error", err);
      return res.json({message:"Error", error:err})
    } else {
      return res.json({message:"Success"})
    }
  })
})

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(8000, function() {
    console.log("listening on port 8000");
})