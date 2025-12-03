import { Request, Response, NextFunction } from 'express'
import { Controllers } from './index-controller'
import { Interface } from '../database/query'
import { _sql } from '../database/db'

export class TaskController extends Controllers {
  async home(req: Request, res: Response, next: NextFunction): Promise<void> {
    const data = await new Interface().onList()
    res.status(200).json({ msg: 'Task', data })
  }

  async add(req: Request, res: Response, next: NextFunction): Promise<void> {
    const {
      name,
      description,
      favorite = false,
    }: { name: string; description: string; favorite: boolean } = req.body
    try {
      const returned = await new Interface({
        name,
        description,
        favorite,
      }).onAdd()
      res.status(201).json({ msg: 'Task Created', returned })
    } catch (err) {
      res.status(400).json({ msg: 'Error' })
    }
  }

  async findByUuid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { uuid } = req.params
    const data = await new Interface({ uuid }).onSearch()
    res.status(200).json({ msg: 'Task', data })
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { uuid } = req.params
    const { token, name, description, favorite } = req.body
    new Interface({ uuid, name, description, favorite }).onUpdate(token)
    res.status(200).json({ msg: 'Task Updated' })
  }

  async toRestore(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = await new Interface().onCreatePoint()
    res.status(200).json({ msg: 'Task to Restore', data })
  }

  async del(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { uuid } = req.params
    new Interface({ uuid }).onDelete()
    res.status(200).json({ msg: 'Task Deleted' })
  }
}
