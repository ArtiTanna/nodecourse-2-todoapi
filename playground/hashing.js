var {SHA256} = require('crypto-js');
var jwt = require('jsonwebtoken');

var data = {
  id: 4
};

var token = jwt.sign(data, '123abc');
console.log("token---",token);


var decoded = jwt.verify(token, '123abc');
console.log("decoded---",decoded);
// var message = 'User';
// var hash = SHA256(message).toString();

// console.log(`msg ${message} SHA ${hash}`);
//
// var data = {
//   id: 4
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if(resultHash === token.hash) {
//   console.log("data was not changed");
// } else {
//   console.log("data was changed");
// }
