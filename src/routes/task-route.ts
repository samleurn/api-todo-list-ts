import { Router, type NextFunction, type Request, type Response } from 'express'
import { _sql } from '../database/db'

const _task = Router()

_task.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    msg: 'Tasks',
    enpoints: {
      list: '/list',
    },
  })
})
_task.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  const list = await _sql`
    SELECT * FROM list
  `
  res.status(200).json({ msg: 'Tasks', list })
})
_task.get('/:uuid', (req: Request, res: Response, next: NextFunction) => {
  const { uuid } = req.params

  res.status(200).json({ msg: 'Succesfull', uuid })
})
_task.post('/', (req: Request, res: Response, next: NextFunction) => {})
_task.get('/', (req: Request, res: Response, next: NextFunction) => {})
_task.get('/', (req: Request, res: Response, next: NextFunction) => {})

export { _task }
