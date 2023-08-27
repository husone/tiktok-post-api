const axios = require('axios');
const cheerio = require('cheerio');
const { unabbreviateNumber } = require('js-abbreviation-number');

function lowercaseK(t) {
    return (t.charAt(t.length - 1) == 'K' ? t.substring(0, t.length - 1) + 'k' : t);
}

class User {

    constructor(username) {
        if (!username) throw new Error('Username is required');
        if (username[0] != '@') username = '@' + username; // if username is not start with @
        this.username = username;
        this.display_name = null;
        this.bio_description = null;
        this.is_verified = null;
        this.likes_count = null;
        this.avatar_url = null;
        this.follower_count = null;
        this.following_count = null;
    }

    async getUser() {

        await axios.get(`https://www.tiktok.com/${this.username}`)
            .then(response => {
                let $ = cheerio.load(response.data);
                if ($('h2[data-e2e="user-subtitle"]').text() == '') throw new Error('User not found');
                this.display_name = $('h2[data-e2e="user-subtitle"]').text();
                this.bio_description = $('h2[data-e2e="user-bio"]').text();
                this.is_verified = $('h2[data-e2e="user-subtitle"]').next().get(0).tagName == 'svg';
                this.likes_count = unabbreviateNumber(lowercaseK($('strong[data-e2e="likes-count"]').text()));
                this.avatar_url = $('img[loading="lazy"]').attr('src');
                this.follower_count = unabbreviateNumber(lowercaseK($('strong[data-e2e="followers-count"]').text()));
                this.following_count = unabbreviateNumber(lowercaseK($('strong[data-e2e="following-count"]').text()));
            })
            .catch(error => {
                console.log(error);
            });
        return this;
    }
}

module.exports = User;
