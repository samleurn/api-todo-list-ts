import { Router } from 'express'

import { _task } from './task-route'
import { _folder } from './folder-route'

const _api = Router()

_api.use('/task', _task)
_api.use('/folder', _folder)
_api.get('/health', (_, __) => __.send('ok'))

export { _api }
