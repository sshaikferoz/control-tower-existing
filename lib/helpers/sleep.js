export default async function sleep(time = 200) {
  return new Promise((r) => setTimeout(r, time))
}
