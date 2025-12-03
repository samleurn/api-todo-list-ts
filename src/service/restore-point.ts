import { _sql } from '../database/db'
import { Interface } from '../database/query'

interface IRestoreItemsProps {
  data: string | any
}

export class RestoreItems {
  data: string | any

  constructor({ data }: IRestoreItemsProps) {
    this.data = data
  }

  async restoreItem() {
    const { snapshot } = JSON.parse(this.data)[0]
    new Interface({})
    // const { snapshot } = this.data
    console.log(snapshot)
  }
}
