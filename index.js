const express = require("express");
const app = express();
const port = 5173;
const path = require("path");
const { v4: uuidv4 } = require("uuid");   // 
const methodOverride = require("method-override");
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () =>{
    console.log(`Listening on port : ${port}`);
})

// login page 
app.get("/", (req, res)=>{
    // res.json("Building a new Project!!");
    res.render("login.ejs");
})

let posts = [
    {
        id: uuidv4(),
        username: "aryangupta",
        img: "https://images.unsplash.com/photo-1761839258657-457dda39b5cc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670",
        caption: "Attitude killer",
        likes: 980,
        comments: 140,
    },
    {
        id: uuidv4(),
        username: "abhaygupta",
        img: "https://plus.unsplash.com/premium_photo-1761295133736-8c68192dd522?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670",
        caption: "Attitude killer",
        likes: 900,
        comments: 102,
    },
    {
        id: uuidv4(),
        username: "safalchaubey",
        img: "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3264",
        caption: "Attitude killer",
        likes: 89,
        comments: 112,
    },
    {
        id: uuidv4(),
        username: "avnigupta",
        img: "https://images.unsplash.com/photo-1513682121497-80211f36a7d3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1288",
        caption: "Attitude killer",
        likes: 90,
        comments: 112,
    },
    {
        id: uuidv4(),
        username: "symuncorpo",
        img: "https://images.unsplash.com/photo-1735753817845-a85f65b94df7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1287",
        caption: "Attitude killer",
        likes: 90,
        comments: 112,
    },
    {
        id: uuidv4(),
        username: "icrowreus",
        img: "https://images.unsplash.com/photo-1762319981432-609103ab4a75?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2675",
        caption: "Attitude killer",
        likes: 90,
        comments: 112,
    }
];

app.get("/posts", (req, res) => {
    // console.log(req.query);
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res)=>{
    // res.send("creating a new post");
    res.render("new.ejs");  // get request to display our form page 
});

app.post("/posts", (req, res) => {
    let{username, img, caption, likes, comments} = req.body; // recall in post req extrace data from req.body using deconstruc method
    posts.push({id: uuidv4(), username, img, caption, likes, comments});    // for emage enter link of image from unsplash
    // console.log(posts); 
    res.redirect("/posts");
    
})
app.get("/posts/:id", (req,res)=>{  // get request on post-id to get view of that post only 
    let {id} = req.params;
    // console.log("id: " + id);
    let post = posts.find((p) => id === p.id);
    // console.log(post);
    res.render("show.ejs",{post}); // this is wrong becoz i am sending whole of the posts array 
    // instead identify post with the help of id first then send that post only 

})
app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});

app.post("/posts/:id/edit", (req,res) => {
    const {id} = req.params;
    // let {newCaption} = req.body.caption;
    let newCaption = req.body.caption;   // note imp when we have strings don't do deconstruction 
    let post = posts.find((p) => id === p.id);
    // console.log(id);
    post.caption = newCaption;
    res.redirect("/posts");
});

// note when pushings object in post in object each property is a key value pair like username is username: "aryan"
// so to send uuidv4() make it also key value pair id: uuidv4();



// then view post ka option  
// -> show post -> get req on posts/id: -> renders -> show.ejs
// now post ko edit option dedo jisme caption edit ho sake 
// delete post ka option hai ik 
app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p)=> p.id !== id);
    // res.send("Deleting post");
    // console.log(posts);
    res.redirect("/posts");
})