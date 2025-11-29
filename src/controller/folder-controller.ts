import { Request, Response, NextFunction } from 'express'
import { Controllers } from './index-controller'
import { Folder } from '../database/query'

export class FolderController extends Controllers {
  async home(req: Request, res: Response, next: NextFunction): Promise<void> {
    const data = new Folder().onList()

    res.status(200).json({ msg: 'Folder', data })
  }

  async add(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, favorite = false }: { name: string; favorite: boolean } =
      req.body

    new Folder({ name, favorite }).onAdd()

    res.status(201).json({ msg: 'Folder Created' })
  }

  async findByUuid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { uuid } = req.params
    const data = await new Folder({ uuid }).onSearch()
    res.status(200).json({ msg: 'Folder', data })
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { uuid } = req.params
    const { token, name, favorite } = req.body
    new Folder({ uuid, name, favorite }).onUpdate(token)
    res.status(200).json({ msg: 'Folder Updated' })
  }

  async toRestore(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = await new Folder().onCreatePoint()
    res.status(200).json({ msg: 'Folder Restores', data })
  }

  async del(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { uuid } = req.params
    new Folder({ uuid }).onDelete()
    res.status(200).json({ msg: 'Folder Deleted' })
  }
}
