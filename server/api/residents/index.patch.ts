export default eventHandler(async (event) => {
    const body = await readBody(event)
    console.log('received', body)
    const db = hubDatabase()

    const result = await db
        .prepare('UPDATE residents SET surname = ?1, email = ?2, hausnummer = ?3, floor = ?4, klingel = ?5 WHERE email = ?2')
        .bind(body.surname, body.email, body.hausnummer, body.floor, body.klingel)
        .run()

    return result
})
