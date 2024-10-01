const express = require("express");

const teste = (req, res)=>{
    res.send("Back-end respondendo ");
}

const app = express();

app.get("/",teste);

app.listen(3000,()=>{
    console.log("Back-end respondendo na porta 3000");
});