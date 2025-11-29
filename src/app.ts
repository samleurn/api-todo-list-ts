import express from 'express'

import { _api } from './routes/index-route'

const app = express()

app.use(express.json())

app.use('/api', _api)

export { app }
