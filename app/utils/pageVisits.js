export function getPageVisitsKey(pdfName) {
  return `pageVisits_${pdfName}`
}

export function getPageVisits(pdfName) {
  const key = getPageVisitsKey(pdfName)
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

export function savePageVisits(pdfName, visits) {
  const key = getPageVisitsKey(pdfName)
  localStorage.setItem(key, JSON.stringify(visits))
}

export function getDailyCount(pdfName) {
  const visits = getPageVisits(pdfName)
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todayStartTime = todayStart.getTime()

  const todayVisits = visits.filter(visit => visit.timestamp >= todayStartTime)
  return todayVisits.length
}

export function getHourlyCount(pdfName) {
  const visits = getPageVisits(pdfName)
  const oneHourAgo = Date.now() - 60 * 60 * 1000

  const hourlyVisits = visits.filter(visit => visit.timestamp >= oneHourAgo)
  return hourlyVisits.length
}
