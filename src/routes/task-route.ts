import { Router, type Request, type Response, type NextFunction } from 'express'
import { _sql } from '../database/db'
import { TaskController } from '../controller/task-controller'

const _task = Router()

const _controller = new TaskController()

_task.get('/', _controller.home)
_task.post('/', _controller.add)

_task.get('/restore', _controller.toRestore)
_task.post('/restore', _controller.restoreItems)

_task.get('/:uuid', _controller.findByUuid)
_task.put('/:uuid', _controller.update)
_task.delete('/:uuid', _controller.del)

export { _task }
