console.log("this is running by nodemon")

const express= require('express')
const app = express()

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

const Document = require('./models/Document')
const mongoose=require('mongoose')
let mongooseDb;
const databaseConnect = async () =>
 {
    mongooseDb = await mongoose.connect("mongodb://localhost/wastebin",{
  useUnifiedTopology : true,
  useNewUrlParser : true
}) .then((result) => {
    
    
app.get('/',(req,res)=>{
    const code= `
    [nodemon] 2.0.14
    [nodemon] to restart at any time, enter rs
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: js,mjs,json`
    res.render('code-display', { code })
    // res.send('hi')
})

app.get('/new',(req,res)=>{
    res.render('new')
})

app.post("/save",async (req,res)=>{
    const value = req.body.value
    try{
        const document = await Document.create({value})
        res.redirect('/${document.id}')
    }
    catch(e) {
        res.render("new",{value})
    }
})

    app.listen(3000)})
.catch((err) => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected to database");
});



};

databaseConnect();
