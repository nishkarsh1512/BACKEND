// // const { Configuration, OpenAIApi } from "openai";
// const { Configuration, OpenAIApi } = require('openai')
// const configuration = new Configuration({
//   apiKey: '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',
// })
// const openai = new OpenAIApi(configuration)
// // const response = await openai.listEngines()
// const fs = require('fs')
const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const Card = require('./User.js')
const History = require('./History')
const { ppid } = require('process')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const dbUrl =
  'mongodb+srv://test:test1@cluster0.0m748e0.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Database connected')
})

app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.send('hello guys im, express')
})

app.post('/', async (req, res) => {
  console.log('recieved')
  if (req.body) {
    res.send('okay')
  }
  const name = req.body.name
  const url = req.body.url
  const category = req.body.cat
  // const terminal = req.body.terminal
  // const gateNumber = req.body.gateNumber
  // const departureDate = req.body.departureDate
  // const departureTime = req.body.departureTime
  const cardEntry = new Card({
    name,
    url,
    category,
  })
  cardEntry.save()
  // const fligh = new Flight({flight, airline})
  console.log('saved')
})

app.get('/show', async (req, res) => {
  console.log('sending the data')
  const cards = await Card.find({})
  res.send(cards)
})

app.get('/history', async (req, res) => {
  const history = await History.find({})
  res.send(history)
})

app.post('/history', async (req, res) => {
  console.log('recieved')
  if (req.body) {
    res.send('okay')
  }
  const name = req.body.name
  const time = req.body.time

  // const terminal = req.body.terminal
  // const gateNumber = req.body.gateNumber
  // const departureDate = req.body.departureDate
  // const departureTime = req.body.departureTime
  const historyEntry = new History({
    name,
    time,
  })
  historyEntry.save()
  // const fligh = new Flight({flight, airline})
  console.log('saved')
})

app.get(`/edit`, async (req, res) => {
  const cards = await Card.find({})
  // if (card) {
  //   res.send(card)
  // }
  res.send(cards)
})

app.post(`/edit`, async (req, res) => {
  if (req.body.data) {
    console.log('yehhhho')
  }
  console.log(req.body.data)
  const ID = req.body.data._id
  console.log(ID)
  await Card.findByIdAndDelete(ID)
  res.send('ok')
})

app.get(`/edit/:id`, async (req, res) => {
  const { id } = req.params
  const card = await Card.findById(id)
  // if (card) {
  //   res.send(card)
  // }
  res.send(card)
})

app.post(`/edit/:id`, async (req, res) => {
  console.log(req.params)
  const name = req.body.name
  const cat = req.body.cat
  const url = req.body.url
  if (req.body.name && req.body.cat && req.body.url) {
    const { id } = req.params
    const camp = await Card.findByIdAndUpdate(id, {
      name,
      cat,
      url,
    })
    await camp.save()
    console.log('saved')
    res.send('ok')
  }
  // if (card) {
  //   res.send(card)
})

// app.post('/chat', async (req, res) => {
//   const msg = req.body.message
//   const arr = ['hello', 'bhaiya']

//   // const response = await openai.createFile(
//   //   fs.createReadStream('./myData.jsonl'),
//   //   'fine-tune',
//   // )

//   // console.log(response.data)
//   /////////////////////////////////
//   // const response = await openai.createFineTune({
//   //   training_file: 'file-CTTurtMK0Gs8wK5KB87IrgUH',
//   //   model: 'davinci',
//   // })

//   // const response = await openai.listFineTunes()
//   // console.log(response.data)

// const response = await openai.createCompletion({
//   model: 'davinci:ft-personal-2023-03-21-19-37-07',
//   prompt: `Answer questions based on my given data only, dont think anything besides my data: There are only 2 mountains in the world and there name is Mount Nishkarsh and Mount Niushkarsh. 5+ 1 =7. and the question is${msg}.Answer only in one sentence`,
//   max_tokens: 200,
// })

// console.log(response.data.choices)

// console.log(response1.data.choices)

// console.log(response1.data.choices)

////////////////////////////////////
// })

app.listen('https://vercel.com/nishkarsh1512/backend/', function (req, res) {
  console.log('server is running on your HP PAB')
})
