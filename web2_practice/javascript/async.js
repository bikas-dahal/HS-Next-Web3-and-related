// function setTimeoutPromisified(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
//
// function callback() {
//     console.log('Here we are,')
// }
//
// setTimeoutPromisified(2000).then(callback)

// function abc () {
//
// }
//
// let p = new Promise(abc)
//
// console.log(p)

var a = 1
var b = a
var b =3

console.log(b)

const fs = require('fs');

function readFile(filename) {
    return new Promise(firstargres)
}

function  firstargres(firsrargf) {
    fs.readFile('test.txt', 'utf-8', (err, data) => {
        firsrargf(data)
    })
}


const p= readFile()


p.then(ram)

function ram( content) {
    console.log(content)
}
