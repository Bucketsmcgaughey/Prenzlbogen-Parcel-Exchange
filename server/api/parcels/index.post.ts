export default eventHandler(async (event) => {
  const { text } = await readBody(event)
  const db = hubDatabase()

  await db
    .prepare('INSERT INTO parcels (date_created, intended_recipient, current_holder, is_collected_yet, collection_date, notes) VALUES (?1, ?2, ?3, ?4, ?5, ?6)')
    .bind(Date.now())
    .run()

  return {}
})
