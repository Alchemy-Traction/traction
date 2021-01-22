const https = require('https');

const request = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      resolve(res);
    }).on('error', reject);
  });
};

const requestWithRedirect = async(url) => {
  const res = await request(url);
  if(res.headers.location) return requestWithRedirect(res.headers.location);
  return res;
};

module.exports = async(url) => {
  const res = await requestWithRedirect(url);
  const bufs = [];
  return new Promise((resolve) => {
    res.on('data', (chunk) => {
      bufs.push(chunk);
    }); 

    res.on('end', () => {
      const data = Buffer.concat(bufs);
      resolve(data);
    });
  });
};
