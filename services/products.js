const express = require("express")
const fs = require("fs-extra")
const shortid = require("shortid")
const multer = require("multer")
const{join} = require("path")
const connection = require("../db")
const Request = require("tedious").Request


const router = express.Router()


router.post("/", async (req, res) => { 
 
    var selectProducts = `INSERT INTO OnlineShoppingProducts3 (Name, Description, Brand, ImageURL, Price, Category)
                       VALUES ('${req.body.Name}', '${req.body.Description}', 
                       '${req.body.Brand}','${req.body.ImageURL}',${req.body.Price},'${req.body.Category}')`

    var request = new Request(selectProducts, (err) =>{ 
        if(err) res.send(err)
        else res.send("ITEM ADDED")
     })
    connection.execSql(request); 
})
   
//PRODUCT REVIEW POST

router.post("/:productId/reviews", async (req, res) => { 
    
    var selectReviews = `INSERT INTO OnlineShoppingReviews4 (Comment, Rate, ElementId)
                       VALUES ('${req.body.Comment}',${req.body.Rate},
                       ${req.body.ElementId})`

    var request = new Request(selectReviews, (err) =>{ 
        if(err) res.send(err)
        else res.send("Review ADDED")
     })
    connection.execSql(request); 
})
//END PRODUCT REVIEW POST

router.get("/", async (req, res)=>{ 

    var selectProducts = "SELECT * FROM OnlineShoppingProducts3"
    var request = new Request (selectProducts,(err, rowCount,rows)=>{ 
        if (err) res.send(err)
        else res.send(products)
    })
    
    var products= [];
    request.on("row", (columns)=>{
        var product = {}
    columns.forEach(column=>{
        product[column.metadata.colName] = column.value
    })
    products.push(product);
    })
    
    connection.execSql(request);
    })



router.get("/:id", async (req, res) => {
    
    var selectProducts = "SELECT * FROM OnlineShoppingProducts3 WHERE _id = " + req.params.id 
    //CALLBACK
    var request = new Request(selectProducts, (err, rowCount, rows) => {
        if (err) res.send(err)
        else {
            if (rowCount == 1) {
                res.send(product)
            } else {
                res.status(404).send("CURRENTLY PRODUCT IS NOT IN THE SHOP _id:" + req.params.id)
            }
        }
    })

    var product = {}
    request.on("row", (columns) => {
        columns.forEach(column => {
            product[column.metadata.colName] = column.value
        })
    })

    connection.execSql(request);
})
    //PRODUCT REVIEW GET
router.get("/:productId/reviews", async (req, res) => {
    
    var selectReviews = "SELECT * FROM OnlineShoppingReviews4 WHERE ElementId = " + req.params.productId
   
    var request = new Request(selectReviews, (err, rowCount, rows) => {
        if (err) res.send(err)
        else res.send(reviews)
    })

    var reviews = [];
    request.on("row", (columns) => {
        var review = {}
        columns.forEach(column => {
            review[column.metadata.colName] = column.value
        })
        reviews.push(review);
    })

    connection.execSql(request);
})

// END PRODUCT REVIEW GET

router.put("/:id", async (req,res)=>{


    var updateStaticProduct = `UPDATE OnlineShoppingProducts3

    SET 
    Name = '${req.body.Name}',
    Description = '${req.body.Description}',
    Brand = '${req.body.Brand}',
    ImageURL = '${req.body.ImageURL}',
    Price = ${req.body.Price},
    Category = '${req.body.Category}'
    
    WHERE _id = ${req.params.id}`


    var request = new Request(updateStaticProduct, (err, rowCount, rows) =>{ 
        if(err) res.send(err)
        else res.send("ROWS MODIFIED" + rowCount)
    })
    connection.execSql(request); 


 })

router.delete("/:id", async (req,res)=>{

    var request = new Request(`DELETE FROM OnlineShoppingProducts3 
    WHERE _id = ${req.params.id}`, (err, rowCount, rows)=>{
        if (err) res.send(err)
        else res.send("Rows deleted:"+ rowCount)
    })

connection.execSql(request);
})

  //PRODUCT REVIEW DELETE
router.delete("/:productId/reviews/:id", async (req,res)=>{

    var request = new Request(`DELETE FROM OnlineShoppingReviews4
    WHERE _id = ${req.params.id}`, (err, rowCount, rows)=>{
        if (err) res.send(err)
        else res.send("Review DELETED:"+ rowCount)
    })

connection.execSql(request);
})

 //END PRODUCT REVIEW DELETE



module.exports = router