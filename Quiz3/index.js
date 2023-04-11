let dbUsers = [ 
    {
        username: "Aida",
        password: "123456",
        name: "Aida",
        email: "aidazainuddin@gmail.com"
    },
  
    {
        username: "Alifah",
        password: "654321",
        name: "Alifah",
        email: "alifahzainuddin@gmail.com"
    },
  
    {
        username: "Aisyah",
        password: "78910",
        name: "Aisyah",
        email: "aisyahzainuddin@gmail.com"
    }
  ]

  const express = require('express')
  const app = express()
  const port = 3000
  
  app.use(express.json())
  
  
  app.post('/login', (req, res) => {
    console.log(req.body)

    let result = login (
      req.body.reqUsername,
      req.body.reqPassword
    )
    res.send(result)
  })
  
  app.post('/register', (req, res) => {
    console.log(req.body)

    let result = register (
      req.body.requsername,
      req.body.reqpassword,
      req.body.reqname,
      req.body.reqemail
    )
    res.send(result)
  })
  
  app.get('/', (req, res) => {
    res.send('Hello UTeM!')
  })
  
  
  app.get('/bye', (req, res) => {
    res.send('Bye Bye UTeM!')
  })
  
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  

  function login (reqUsername, reqPassword){
    let matchUser = dbUsers.find(
        user => user.username == reqUsername 
    )
    if (!matchUser) return "User not found!"
    if (matchUser.password ==reqPassword) {
        return matchUser 
    } else {
        return "Invalid Password"
    }
  }
  
  function register (requsername, reqpassword, reqname, reqemail) {
    dbUsers.push({
        username: requsername,
        password : reqpassword,
        name : reqname,
        email: reqemail
    })
  }