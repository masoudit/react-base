import SimpleCrypto from "simple-crypto-js";

// const secretKey = SimpleCrypto.generateRandom();
// const simpleCrypto = new SimpleCrypto(secretKey);
const tokenKey = "advut";
const tokenSecretKey = "advsk";

const getSecretKey = (generateNew = false) => {
  let secret = localStorage.getItem(tokenSecretKey);
  if (!secret && generateNew) {
    secret = SimpleCrypto.generateRandom();
    localStorage.setItem(tokenSecretKey, btoa(secret));
  } else {
    secret = atob(secret);
  }

  return secret;
};

export const getUserToken = () => {
  const token = localStorage.getItem(tokenKey);
  const secret = getSecretKey();
  if (token && secret) {
    const simpleCrypto = new SimpleCrypto(secret);
    return simpleCrypto.decrypt(token);
  }

  return null;
};

export const setUserToken = value => {
  const simpleCrypto = new SimpleCrypto(getSecretKey(true));
  localStorage.setItem(tokenKey, simpleCrypto.encrypt(value));
};

export const clearUserToken = () => {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(tokenSecretKey);
};
