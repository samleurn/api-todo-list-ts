import { _sql } from './db'

interface IInterfaceProps {
  uuid?: string
  name?: string
  description?: string
  favorite?: boolean
}

export class Interface {
  uuid?: string
  name?: string
  description?: string
  favorite?: boolean

  constructor(props?: IInterfaceProps) {
    if (props) {
      this.uuid = props.uuid
      this.name = props.name
      this.description = props.description
      this.favorite = props.favorite
    }
  }

  async onAdd() {
    return new Promise((res) => {
      res(_sql`
        INSERT INTO task (name, description, favorite)
        VALUES (${this.name ?? ''}, ${this.description ?? ''}, ${
        this.favorite ?? ''
      })
    `)
    })
  }

  async onList() {
    return new Promise((res) => {
      res(_sql`
            SELECT * FROM task
      `)
    })
  }

  async onSearch() {
    return new Promise((res) => {
      const data = _sql`
          SELECT
            * 
          FROM
            task
          WHERE
            code = ${this.uuid ?? ''}
      `
      res(data)
    })
  }

  async onUpdate(token: string) {
    if (token == 'name') {
      await _sql`
        UPDATE
          task
        SET
          name = ${this.name ?? ''},
          modified_at = NOW()  
        WHERE code = ${this.uuid ?? ''}
      `
    }
    if (token == 'favorite') {
      await _sql`
        UPDATE
          task
        SET
          favorite = ${this.favorite ?? ''},
          modified_at = NOW()
        WHERE code = ${this.uuid ?? ''}
      `
    }
    if (token == 'description') {
      await _sql`
        UPDATE
          task
        SET
          description = ${this.description ?? ''},
          modified_at = NOW()
        WHERE code = ${this.uuid ?? ''}
      `
    }
    if (token == 'all') {
      await _sql`
        UPDATE
          task
        SET
          name = ${this.name ?? ''},
          description = ${this.description ?? ''},
          favorite = ${this.favorite ?? false},
          modified_at = NOW()  
        WHERE code = ${this.uuid ?? ''}
      `
    }
  }

  async onDelete() {
    await _sql`
      INSERT INTO restore_point (entity_type, entity_id, snapshot)
      SELECT 'Task', code, to_jsonb(task.*)
      FROM task
      WHERE code = ${this.uuid ?? ''};    
    `

    await _sql`
      DELETE FROM task
      WHERE code = ${this.uuid ?? ''}
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
