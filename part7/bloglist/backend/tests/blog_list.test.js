const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const helper = require("./test_helper")
const Blog = require("../models/blog")

const loginAuth = async (user) => {
    const resp = await api
        .post("/api/login")
        .send(user)
    return resp.body.token
}

beforeEach(async () => {
    await Blog.deleteMany({})
    const token = await loginAuth(helper.initialUsers[1])

    await api.post("/api/blogs").
    set("Authorization", "bearer " + token)
    .send(helper.initialBlogs[0])

    await api.post("/api/blogs")
    .set("Authorization", "bearer " + token)
    .send(helper.initialBlogs[1])
})


test("Correct amount of blogs returned", async () => {
    const resp = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
  
    expect(resp.body).toHaveLength(helper.initialBlogs.length)
})

test("Verify blog unique identifier property", async () => {
    const resp = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)

    resp.body.forEach(i => {
        expect(i.id).toBeDefined()
    })
})

test("Succesfully make a POST request", async () => {
    const newBlog = {
        title: "A really cool blog",
        author: "Tester mcTester",
        url: "https://test.com",
        likes: 44
    }
    const token = await loginAuth(helper.initialUsers[1])
    await api
        .post("/api/blogs")
        .set("Authorization", "bearer " + token)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const end = await helper.blogsInDb()
    expect(end).toHaveLength(helper.initialBlogs.length + 1)
})

test("If likes property missing from request default to zero", async () => {
    const newBlog = {
        title: "A really cool blog",
        author: "Tester mcTester",
        url: "https://test.com"
    }
    const token = await loginAuth(helper.initialUsers[1])
    const resp = await api
        .post("/api/blogs")
        .set("Authorization", "bearer " + token)
        .send(newBlog)
        .expect(201)
    expect(resp.body.likes).toEqual(0)
})

test("Verify if title and url missing receive 400", async () => {
    const newBlog = {
        url: "https://test.com",
        likes: 0
    }
    const token = await loginAuth(helper.initialUsers[1])
    await api
        .post("/api/blogs")
        .set("Authorization", "bearer " + token)
        .send(newBlog)
        .expect(400)
})

test("Deleting blog succesfully", async () => {
    const id = await helper.idFromDb()
    const token = await loginAuth(helper.initialUsers[1])
    await api
        .delete("/api/blogs/" + id)
        .set("Authorization", "bearer " + token)
        expect(204)
    const end = await helper.blogsInDb()
    expect(end).toHaveLength(helper.initialBlogs.length - 1)
})

test("Update existing likes succesfully", async () => {
    const id = await helper.idFromDb()

    const newLikes = { likes: 1000}

    const result = await api
        .put("/api/blogs/" + id)
        .send(newLikes)
        .expect(200)
    expect(result.body.likes).toEqual(newLikes.likes)
})

test("Fail creating blog with no auth", async () => {
    const newBlog = {
        title: "A really cool blog",
        author: "Tester mcTester",
        url: "https://test.com",
        likes: 44
    }
    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(401)
        .expect("Content-Type", /application\/json/)

    const end = await helper.blogsInDb()
    expect(end).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})