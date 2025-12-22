export default function findBexQueryByTitle(queries, titleText) {
  const found = queries
    .filter(({ title }) => title.match(new RegExp(titleText, 'i')))
    .pop()
  if (found) return found
  return titleText
    .split(/\s\|_/i)
    .reduce((cum, cur) => {
      const filtered = queries
        .filter(
          ({ title, techname }) =>
            title.match(new RegExp(cur, 'i')) || techname.match(new RegExp(cur, 'i'))
        )
        .pop()
      if (filtered) cum.push(filtered)
      return cum
    }, [])
    .pop()
}
