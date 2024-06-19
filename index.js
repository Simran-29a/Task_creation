const express=require('express');
const app = express();
const path=require('path');
const fs=require('fs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
 
app.set('view engine','ejs');

app.get("/",function(req,res){
    //ye files wale folder k file ko read krne k liye
    fs.readdir(`./files`,function(err,files){
        //ab jb mne file read krli to views wale folder me kuch v render kr skta hu
        // to hm yha obj k roop me index.ejs ko files name se is created files ka data bhej rha hu
        res.render("index",{files:files});
    })
})
app.get('/file/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err,filedata){
        res.render('show',{filename: req.params.filename, filedata:filedata});
    })
});
//ab files folder k andr file ko create krenge by fs.writeFile with title and second one for details tab
// finally hua ye ki jb hm dono tabs m type krenge then create p click krenge to "/" route change
  // hokr "/create" route p chla jayga then file create honge or wo redirect kr dega "/" route p jo ki file ko read krke show krega.
app.post("/create",function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
          res.redirect("/");
    })  
});

app.listen(3000);