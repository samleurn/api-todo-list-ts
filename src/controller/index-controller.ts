import { type Request, type Response, type NextFunction } from 'express'

export class Controllers {
  async home(req: Request, res: Response, next: NextFunction) {}
  async add(req: Request, res: Response, next: NextFunction) {}
  async findByUuid(req: Request, res: Response, next: NextFunction) {}
  async update(req: Request, res: Response, next: NextFunction) {}
  async del(req: Request, res: Response, next: NextFunction) {}
  async toRestore(req: Request, res: Response, next: NextFunction) {}
  async restoreItems(req: Request, res: Response, next: NextFunction) {}
}
