export function mapPayload (payload) {
  let query = []

  payload && Object.keys(payload).map(el => {
    payload[el] && query.push(`${el}=${payload[el]}`)
  })

  return query
}
