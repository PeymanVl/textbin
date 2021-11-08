console.log("this is running by nodemon")

const express= require('express')
const app = express()

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

 const Document = require('./models/Document')
const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/wastebin",{
  useUnifiedTopology : true,
  useNewUrlParser : true
}).then(() => console.log("Database connected"))
.catch((error) => console.log(error));

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});


app.get('/',(req,res)=>{
    const code= `Welcome to wasteBin

Use the commands in the top right corner
to create a new file to share with others`
    res.render('code-display', { code ,language : "plaintext" })
    // res.send('hi')
})

app.get('/new',(req,res)=>{
    res.render('new')
})

app.post("/save",async (req,res)=>{
    const value = req.body.value
    try{

        console.log("this is save")
        const document = await Document.create({value})
        res.redirect(`/${document.id}`)
    }
    catch(e) {
        res.render("new",{value})
    }
})
app.get('/:id',async (req,res)=>{
    const id=req.params.id
    try{
        const document = await Document.findById(id)
        res.render('code-display', { code : document.value,id})
    }
    catch (e){
        res.redirect('/')
    }
})

app.get('/:id/duplicate',async (req,res) =>{
    const id=req.params.id
    try{
        const document = await Document.findById(id)
        res.render('new', { value : document.value})
    }
    catch (e){
        res.redirect(`/${id}`)
    }
})
app.listen(3000)