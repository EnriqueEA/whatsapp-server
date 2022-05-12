const http = require('http');
const https = require('https');

const products = [
  { name : 'TV',  price: '$1490.99'},
  { name : 'TV',  price: '$1490.99'},
  { name : 'TV',  price: '$1490.99'},
];

function getData() {

  const options = {
    hostname: 'rickandmortyapi.com',
    port: 443,
    path: '/api/character',
    method: 'GET'
  }
  
  const req = https.request( options, res => {
    console.log(`statusCode: ${ res.statusCode }`)
    
    res.on('data', d => {
      // eslint-disable-next-line no-undef
      process.stdout.write(d);
    })
  })

  req.on('error', error => {
    console.log(error)
  })
  
  req.end();
  
}

function sendData( product ) {

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': products.length
    }
  }
  
  const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', d => {
      // eslint-disable-next-line no-undef
      process.stdout.write(d)
    })
  })

  req.on('error', error => {
    console.log(error)
  })
  
  req.write(JSON.stringify( product ))
  req.end()

}

module.exports = {
  products,
  getData,
  sendData
}
