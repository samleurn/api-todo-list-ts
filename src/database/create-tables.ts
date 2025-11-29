import { _sql } from './db'

await _sql`
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
`

await _sql`
  CREATE TABLE IF NOT EXISTS folder (
    id SERIAL NOT NULL PRIMARY KEY,
    code UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL DEFAULT 'Folder',
    favorite BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    modified_at TIMESTAMP DEFAULT NOW()
  )
`

await _sql`
  CREATE TABLE IF NOT EXISTS task (
    id SERIAL NOT NULL PRIMARY KEY,
    code UUID DEFAULT uuid_generate_v4(),
    folder_id INT NOT NULL REFERENCES folder(id),
    name VARCHAR(100) NOT NULL DEFAULT 'Task',
    description VARCHAR(200) NOT NULL DEFAULT '',
    archived BOOLEAN NOT NULL DEFAULT false,
    complete BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    modified_at TIMESTAMP DEFAULT NOW()
  )
`

await _sql`
  CREATE TABLE IF NOT EXISTS restore_point (
    id SERIAL NOT NULL PRIMARY KEY,
    entity_id TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    snapshot JSONB,
    created_at TIMESTAMP DEFAULT NOW()
  )
`

/* await _sql`
CREATE TABLE IF NOT EXISTS history_folder {
    id SERIAL NOT NULL PRIMARY KEY,
    code UUID NOT NULL;
    name VARCHAR(50) NOT NULL,
    favorite BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NOW()
}
`
await _sql`
CREATE TABLE IF NOT EXISTS history_task {
    id SERIAL NOT NULL PRIMARY KEY,
    code UUID NOT NULL;
    folder_id INT NOT NULL REFERENCES folder(id),
    name VARCHAR(100) NOT NULL DEFAULT 'Task',
    description VARCHAR(200) NOT NULL DEFAULT '',
    archived BOOLEAN NOT NULL DEFAULT false,
    complete BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    modified_at TIMESTAMP DEFAULT NOW()
}
`
await _sql`
CREATE TABLE IF NOT EXISTS history {

}
` */

/* 
Todo 
Para rota PUT
* UPDATE clientes
* SET modificado_em = NOW()
* WHERE id = 1;
*/
/* 
Todo .
* Create a table for backup auto
*/
