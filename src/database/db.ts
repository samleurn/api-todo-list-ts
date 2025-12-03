import pg from 'postgres'

const URL: string = Bun.env.DB_URL!

const _sql = pg(URL)

export { _sql }
