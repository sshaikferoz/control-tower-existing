export default function formatCalMonth(calMonth) {
  if (!calMonth) return ''

  const mon = calMonth.toString()
  const field = mon.substr(4, 2) + '/' + mon.substr(2, 2)

  return field
}
