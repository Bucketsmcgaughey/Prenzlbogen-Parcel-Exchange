export default eventHandler(async (event) => {
  const db = hubDatabase()
  const query = getQuery(event)
  const email = query.email
  // TODO: move it a a Server Task
  await db.exec('CREATE TABLE IF NOT EXISTS parcels (id INTEGER PRIMARY KEY, date_created TEXT, intended_recipient TEXT, current_holder TEXT, is_collected_yet NUMERIC, collection_date TEXT, notes TEXT)')

  const { results } = await db.prepare('SELECT * FROM parcels WHERE intended_recipient = ?1 ORDER BY date_created DESC').bind(email).all()

  return results
})