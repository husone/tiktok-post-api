const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

const User = require('./entity/User');
// const Post = require('./entity/Post');

(async () => {
    let t = new User('tuoitho151013');
    t = await t.getUser();
    console.log(t);
})();