const express = require('express')
const app = express()
const port =process.env.PORT ||5000 ;

app.get('/', (req, res) => {
  res.send('Simple crud server served!')
})

app.listen(port, () => {
  console.log(`Simple crud server running ${port}`)
})
