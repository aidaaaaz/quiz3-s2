let dbUsers = [ 
  {
      username: "Aida",
      password: "123456",
      name: "Aida",
      email: "aidazainuddin@gmail.com",
  },

  {
      username: "Alifah",
      password: "654321",
      name: "Alifah",
      email: "alifahzainuddin@gmail.com",
  },

  {
      username: "Aisyah",
      password: "78910",
      name: "Aisyah",
      email: "aisyahzainuddin@gmail.com",
  }
]
const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken')


app.use(express.json())


app.post('/login', (req, res) => {
  console.log(req.body)

  let result = login(req.body.username, req.body.password)
  let token = generateToken(result)
  res.send(token)
})


app.post('/register', (req, res) => {
  console.log(req.body)
  let result = register (
    req.body.username,
    req.body.password,
    req.body.name,
    req.body.email,
  )
  res.send(result)
})

app.get('/', verifyToken, (req, res) => {
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
      email: reqemail,
  })
}

function generateToken(userData)
{
  const token = jwt.sign
  (
    userData,
    'inipassword',
    {expiresIn: 60} 
  );
  return token
}

function verifyToken(req,res,next) {
  let header = req.headers.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token, 'inipassword', function(err, decoded){
    if(err) {
      res.send("Invalid Token")
    }

  req.user = decoded 
  next()

  });
}















































































































