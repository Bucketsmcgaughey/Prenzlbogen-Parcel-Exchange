// const { getCurrentUser } = useServerAuth()
// console.log(getCurrentUser)


export default eventHandler(async (event) => {
  const db = hubDatabase()
  const query = getQuery(event)
  const email = query.email
  // TODO: move it a a Server Task
  await db.exec('CREATE TABLE IF NOT EXISTS residents (id INTEGER PRIMARY KEY, date_created TEXT, email TEXT, surname TEXT, hausnummer TEXT, floor TEXT, klingel TEXT)')

  const { results } = await db.prepare('SELECT * FROM residents ORDER BY surname').all()

  return results
})

