const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser("This is my signed key"))

const students = [{"id": 1, "name": ["mac", "kane"], "grades": [{"cs4033": "A+"}]}]

/*

Create an Express application that sets a cookie when routed to /login with their name. 

If a cookie is present with a name key, then it says "Welcome {name}! when the user routes to /hello".

*/
// GET /students?search=<query> - returns a list of students filtered on name matching the given query
app.get('/hello', (req, res) => {
    /* GET a user by their name from cookie */
    let name = req.query.name
    console.log(req.query)
    console.log(name)

    if (Object.keys(req.query).length !== 0) {
        if (name !== null) {
            res.cookie("name", name, {signed: true})
            res.send("cookie Set")

        } else {
            res.send("missing name query")
        }
    } else {
        res.send("no queries with associated get request")
    }
})

app.get('/login', (req, res) => {
    /* POST user data using the request body */
    var username = req.signedCookies.name

     // Validate supplied body
     var valid = true

     if (username === undefined) {
         valid = false
     }

    if (valid) {
        res.send("Welcome " + username)
    } else {
        res.status(400).send("unable to find singed cookie for name")
    }

})


const port = 3003
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

