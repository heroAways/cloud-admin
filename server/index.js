import http from 'http'
const prot = 8989
const server = http.createServer((req, res) => {
  res.end(JSON.stringify({
    name: 'zhangsan',
    age: 18
  }))
})
server.listen(prot, () => {
  console.log(`server is running at http://localhost:${prot}`)
})