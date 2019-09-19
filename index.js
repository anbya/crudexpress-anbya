const express = require("express"); // import express library
const app = express(); // initialize express app
const items = require("./data");
const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
// setup a `/` endpoint
app.get("/items", (req, res) => {
  let newItemsArray = items.sort(function(first, second) {
    let a = first.id;
    let b = second.id;
    
    if(a > b) {
        return 1;
    } else if(a < b) {
        return -1;
    } else {
        return 0;
    }
  });
  res.status(200).send(newItemsArray);
});
app.post("/items", (req, res) => {
  lastID=items.length+1
  const newItems = {
    id: lastID,
    text: req.body.text
  }
  items.push(newItems)
  let newItemsArray = items.sort(function(first, second) {
    let a = first.id;
    let b = second.id;
    
    if(a > b) {
        return 1;
    } else if(a < b) {
        return -1;
    } else {
        return 0;
    }
  });
  res.status(200).send(newItemsArray);
});
app.put("/items", (req, res) => {
  updateId=req.body.id-1
  items.splice(updateId,1)
  const updateItems = {
    id: req.body.id,
    text: req.body.text
  }
  items.push(updateItems)
  let newItemsArray = items.sort(function(first, second) {
    let a = first.id;
    let b = second.id;
    
    if(a > b) {
        return 1;
    } else if(a < b) {
        return -1;
    } else {
        return 0;
    }
  });
  res.status(200).send(newItemsArray);
});
app.delete("/items", (req, res) => {
  let newItemsArray = items.sort(function(first, second) {
    let a = first.id;
    let b = second.id;
    
    if(a > b) {
        return 1;
    } else if(a < b) {
        return -1;
    } else {
        return 0;
    }
  });
  newItemsArray.splice(req.body.id-1,1)
  res.status(200).send(newItemsArray);
});
// setup a `/hello` endpoint
app.get("/", (request, response) => {
  response.send({
    message: "Hello world!"
  });
});

// setup server to listen on port :3131
app.listen(3000, () =>
  console.log("Express server is ready on localhost:3131")
);