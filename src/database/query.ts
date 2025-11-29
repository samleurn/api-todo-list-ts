import { _sql } from './db'

export class Task {
  name: string
  folder_id: number
  description: string
  archived: boolean
  complete: boolean

  constructor(
    name: string,
    folder_id: number,
    description: string,
    archived: boolean,
    complete: boolean
  ) {
    this.name = name
    this.folder_id = folder_id
    this.description = description
    this.archived = archived
    this.complete = complete
  }

  async onSave(name: string) {}
}

interface IFolderProps {
  uuid?: string
  name?: string
  favorite?: boolean
}

export class Folder {
  uuid?: string
  name?: string
  favorite?: boolean

  constructor(props?: IFolderProps) {
    if (props) {
      this.uuid = props.uuid
      this.name = props.name
      this.favorite = props.favorite
    }
  }

  async onAdd() {
    await _sql`
      INSERT INTO folder (name, favorite)
      VALUES (${this.name ?? null}, ${this.favorite ?? null})
    `
  }

  async onList() {
    return new Promise((res) => {
      const data = _sql`
      SELECT * FROM folder
      `
      res(data)
    })
  }
  async onSearch() {
    return new Promise((res) => {
      const data = _sql`
          SELECT
            * 
          FROM
            folder
          WHERE
            code = ${this.uuid ?? null}
      `
      res(data)
    })
  }

  async onUpdate(token: string) {
    if (token == 'name') {
      await _sql`
        UPDATE
          folder
        SET
          name = ${this.name ?? null},
          modified_at = NOW()  
        WHERE code = ${this.uuid ?? null}
      `
    }
    if (token == 'fav') {
      await _sql`
        UPDATE
          folder
        SET
          favorite = ${this.favorite ?? null},
          modified_at = NOW()
        WHERE code = ${this.uuid ?? null}
      `
    }
    if (token == 'dual') {
      await _sql`
        UPDATE
          folder
        SET
          name = ${this.name ?? null},
          favorite = ${this.favorite ?? null},
          modified_at = NOW()  
        WHERE code = ${this.uuid ?? null}
      `
    }
  }

  async onDelete() {
    await _sql`
      INSERT INTO restore_point (entity_type, entity_id, snapshot)
      SELECT 'folder', code, to_jsonb(folder.*)
      FROM folder
      WHERE code = ${this.uuid ?? null};    
    `

    await _sql`
      DELETE FROM folder
      WHERE code = ${this.uuid ?? null}
    `
  }

  async onRestore(_uuid?: string | null, table?: string) {
    try {
      //resolver dps
      /* await _sql`
        
      `
      await _sql`
        DELETE FROM restore_point WHERE entity_id = '${_uuid ?? null}';
      ` */
    } catch (err) {}
  }

  async onCreatePoint() {
    return new Promise((res) => {
      res(
        _sql`
          SELECT * FROM restore_point;
        `
      )
    })
  }
}
