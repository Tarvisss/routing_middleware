const express = require('express');
const router = new express.Router();
let itemsDb = require('./fakeDbTesting');
const ExpressError = require('./expressError');

// Get all items
router.get('/', (req, res, next) => {
    console.log("Items in db:", itemsDb);  // Logs the array just before returning the response
    res.json({ items: itemsDb });
    console.log("Items in db:", itemsDb); 
});
// Get a single item by ID
router.get('/:id', (req, res, next) => {
    const item = itemsDb.find(item => item.id === +req.params.id);
    if (!item) {
        throw new ExpressError("Not a valid id!", 400);
    }
    res.json({ item });
});


router.post('/', (req, res, next) => {
    //gererate a id for added item
    const newId = itemsDb.length ? Math.max(...itemsDb.map(item => item.id)) + 1 : 1;
    const newItem = { 
        id: newId,
        name: req.body.name,
        price: req.body.price
 }
     
    itemsDb.push(newItem);
    res.status(201).json({ message: "New Item added", item: newItem});
})

router.patch("/:name", (req, res, next) => {
    // Find the item by the name from the URL parameter
    const itemToAlter = itemsDb.find(item => item.name.toLowerCase() === req.params.name.toLowerCase());

    if (itemToAlter === undefined) {
        return next(new ExpressError("Item not Found", 404)); 
    }
    itemToAlter.name = req.body.name;
    itemToAlter.price = req.body.price;

    // Return the updated item
    res.json({ item: itemToAlter });
});


router.delete("/:name", function(req, res, next) {
    const itemToRemove = itemsDb.findIndex(item => item.name === req.params.name);
    if (itemToRemove === -1) {
        throw new ExpressError("item not found", 404)
    }
    itemsDb.splice(itemToRemove, 1)
    res.json({ message: "deleted"})
})



module.exports = router;