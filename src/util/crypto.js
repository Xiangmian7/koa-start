const crypto = require("crypto");
const encryptPass = pass => {
  const hash = crypto.createHash("sha256");
  hash.update(pass);
  return hash.digest("hex");
};

const comparePass = (pass, encryptedPass) => {
  return encryptPass(pass) === encryptedPass;
};

module.exports = { encryptPass, comparePass };
