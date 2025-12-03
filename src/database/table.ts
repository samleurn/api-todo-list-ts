import { _sql } from './db'

await _sql`
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
`

await _sql`
  CREATE TABLE IF NOT EXISTS task (
    id SERIAL NOT NULL PRIMARY KEY,
    code UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL DEFAULT 'Task',
    description VARCHAR(200),
    favorite BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    modified_at TIMESTAMP
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
