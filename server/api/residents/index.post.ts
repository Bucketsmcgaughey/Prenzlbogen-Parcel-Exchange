export default eventHandler(async (event) => {
  const { text } = await readBody(event)
  const db = hubDatabase()
  const resident = text.resident

  await db
    .prepare('INSERT INTO residents (date_created, intended_recipient, current_holder, is_collected_yet, collection_date, notes) VALUES (?1, ?2, ?3, ?4, ?5, ?6)')
    .bind(Date.now())
    .run()

  return {}
})
