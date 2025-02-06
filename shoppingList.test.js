process.env.NODE_ENV = test;

const request = require("supertest");

const app = require("./app");
let itemsDb = require("./fakeDbTesting");
const { before, beforeEach, afterEach, describe } = require("node:test");

let item2 = {
    id: 1,
    name: "hotdog",
    price: 3.50
};

beforeEach(function () {
    itemsDb.push(item2);
    console.log("Inside beforeEach - itemsDb:", itemsDb);  // Verify if the item is added
});


// afterEach(function () {
//     itemsDb.length = 0; // Clear the database after each test
// });

describe("GET /items", () => {
    test("Get all Items", async () => {
        const res = await request(app).get("/items");
        console.log("Response body: ", res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ itemsDb: [{ id: 1, name: "hotdog", price: 3.50 }] });
    });
});