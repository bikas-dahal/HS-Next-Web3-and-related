const crypto = require('crypto')

const input = 'web3'
const hash = crypto.createHash('sha256').update(input).digest('hex')

console.log(hash)

for (let i = 0; i < 10000000; i++) {
    let prefix = 'web3'
    let input = i.toString()
    let t = prefix + input
    // console.log(t)
    const hash = crypto.createHash('sha256').update(t).digest('hex')
    if (hash.startsWith('00000')){
        console.log(hash)
        console.log(t)
    }
}
