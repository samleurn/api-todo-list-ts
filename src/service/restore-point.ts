import { FORMERR } from 'dns'
import { _sql } from '../database/db'
import { Folder } from '../database/query'

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
    new Folder({})
    // const { snapshot } = this.data
    console.log(snapshot)
  }
}

/* 
{
  "msg": "Folder Restores",
  "data": [
    {
      "id": 1,
      "entity_id": "b8d032ee-ef21-4397-aa9a-f76223143d98",
      "entity_type": "folder",
      "snapshot": {
        "id": 5,
        "code": "b8d032ee-ef21-4397-aa9a-f76223143d98",
        "name": "Folder 3",
        "favorite": true,
        "created_at": "2025-11-23T06:23:40.538477",
        "modified_at": "2025-11-23T06:23:40.538477"
      },
      "created_at": "2025-11-23T11:03:42.129Z"
    }
  ]
}
*/
