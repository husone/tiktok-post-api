const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

const User = require('./entity/User');
const Post = require('./entity/Post');
// const Post = require('./entity/Post');

(async () => {
    let t = new User('tuoitho151013');
    // t = await t.getUser();
    // console.log(t);
    t = new Post('_huanhoahong_official', '7271983589208771846');
    t = await t.getPost();
    console.log(t);
})();