const express = require('express');
const router = new express.Router();
const ExpressError = require('./expressError');
let itemsDb = require('./fakeDb');
 


// Get all items
router.get('/', (req, res, next) => {
    console.log("Items in db:", itemsDb);  // Logs the array just before returning the response
    res.json({ items: itemsDb });
    console.log("Items in db:", itemsDb); 
});
// Get a single item by ID
router.get('/:id', (req, res, next) => {
    const item = itemsDb.find(item => item.id === +req.params.id);
    // if (!item) {
    //     throw new ExpressError("Not a valid id!", 400);
    // }
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

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    console.log('Requested ID:', id);
    const item = itemsDb.find(item => item.id === parseInt(id, 10));
    console.log('Found item:', item);
    console.log('Request body:', req.body);

    if (!item) {
        return res.status(404).json({ error: "Item not found" });
    }

    item.name = req.body.name || item.name;
    item.price = req.body.price || item.price;

    return res.status(200).json({
        item: { 
            id: item.id,
            name: item.name,
            price: item.price
        }
    });
});



router.delete("/:name", function(req, res, next) {
    const itemToRemove = itemsDb.findIndex(item => item.name === req.params.name);
    itemsDb.splice(itemToRemove, 1)
    res.json({ message: "Deleted"})
})



module.exports = router;