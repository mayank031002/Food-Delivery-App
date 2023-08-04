const express = require('express')
const app = express()
const port = 5000
const mongoDB=require("./db");
app.use((req,res,next)=>{
   res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
   res.header(
    "Access-Control-Allow-Headers",
     "Origin,X-Requested-With,Content-Type,Accept"
   );
   next();
});

app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
/***JWT(Json web token) ****/
// JSON Web Token (JWT) is a compact, URL-safe means of representing
//    claims to be transferred between two parties.  The claims in a JWT
//    are encoded as a JSON object that is used as the payload of a JSON
//    Web Signature (JWS) structure or as the plaintext of a JSON Web
//    Encryption (JWE) structure, enabling the claims to be digitally
//    signed or integrity protected with a Message Authentication Code
//    (MAC) and/or encrypted.