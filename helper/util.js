const crypto = require('crypto')

exports.randomString = (size = 8) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const string = [];

  for (let index = 0; index < size; index++) {
    string.push(letters.charAt(Math.floor(Math.random() * letters.length)));
  }

  return string.join("");
};

exports.md5 = (password) => crypto.createHash('md5').update(password).digest("hex")