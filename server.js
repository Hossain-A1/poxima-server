require('dotenv').config()
const express = require('express')
const app = express()
// port
const PORT =process.env.PORT || 4000
// Listen for request
app.listen(PORT, ()=>{
  console.log(`Listeing on port ${PORT}`);
})