import { Router, type Request, type Response, type NextFunction } from 'express'
import { _sql } from '../database/db'
import { FolderController } from '../controller/folder-controller'

const _folder = Router()

const _controller = new FolderController()

_folder.get('/', _controller.home)
_folder.post('/', _controller.add)

_folder.get('/restore', _controller.toRestore)
_folder.post('/restore', _controller.restoreItems)

_folder.get('/:uuid', _controller.findByUuid)
_folder.put('/:uuid', _controller.update)
_folder.delete('/:uuid', _controller.del)

export { _folder }
