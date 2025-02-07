process.env.NODE_ENV = test;

const request = require("supertest");

const app = require("./app");


let itemsDb = require("./fakeDb");


let item2 = {
    id: 1,
    name: "hotdog",
    price: 3.50
};

beforeEach(function () {
    itemsDb.push(item2);
    console.log("Inside beforeEach - itemsDb:", itemsDb);  // Verify if the item is added
});


afterEach(function () {
    itemsDb.length = 0; // Clear the database after each test
});

describe("GET /items", function() {
    test("Get all Items", async () => {
        const res = await request(app).get("/items");
        console.log("Response body: ", res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual( {items: [item2]} );
    });
});



describe("GET /items/:name", function() {
    test("Gets a single item", async function() {
      const res = await request(app).get('/items/1');
      console.log("Response body: ", res.body);
      expect(res.statusCode).toBe(200);
  
      expect(res.body).toEqual({
        item: {
        id: 1,
        name: "hotdog",
        price: 3.50
    }});
    });
  
    test("Responds with 404 if can't find item", async function() {
      const resp = await request(app).get(`/item/0`);
      expect(resp.statusCode).toBe(404);
    });
  });
  
  
  describe("POST /items", function() {
    test("Creates a new item", async function() {
        const newItem = {
            name: "Pot",
            price: 15
        };

        const res = await request(app)
            .post('/items')
            .send(newItem);

        console.log("Response body: ", res.body);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            item: {
                id: 2,
                name: "Pot",
                price: 15
            },
            message: "New Item added"
        });
    });
});
  
  describe("PATCH /items/1", function() {
    test("Updates a single item", async () => {
        const resp = await request(app)
            .patch("/items/1")  // Update the item with ID 1
            .send({ name: "butt nuggets", price: 3.50 });  // New data for the item 
    
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            item: { 
                id: 1,
                name: "butt nuggets", 
                price: 3.50  
            }
        });
    });
    test("Responds with 404 if id invalid", async function() {
        const resp = await request(app).patch(`/items/0`);
        expect(resp.statusCode).toBe(404);
      });
});
    
  
   


  
  describe("DELETE /:name", function() {
    test("Deletes a single a item", async function() {
      const resp = await request(app).delete(`/items/${item2.name}`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({ message: "Deleted" });
    });
  });
