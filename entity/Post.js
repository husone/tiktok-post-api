

const axios = require('axios');
const cheerio = require('cheerio');
const { unabbreviateNumber } = require('js-abbreviation-number');

function lowercaseK(t) {
    return (t.charAt(t.length - 1) == 'K' ? t.substring(0, t.length - 1) + 'k' : t);
}
class Post {
    constructor(creator, id) {
        if (!creator) throw new Error('Username is required');
        if (!id) throw new Error('Id is required');
        if (creator[0] != '@') creator = '@' + creator; // if username is not start with @
        this.creator = creator;
        this.id = id;
        this.cover_image_url = null;
        this.embed_link = null;
        this.like_count = null;
        this.comment_count = null;
        this.saved_count = null;
        this.share_count = null;
    }

    async getPost() {
        await axios.get(`https://www.tiktok.com/${this.creator}/video/${this.id}`)
            .then(response => {
                let $ = cheerio.load(response.data);
                if ($('strong[data-e2e="like-count"]').text() == '') throw new Error('Post not found');
                this.cover_image_url = $('img[mode="4"]').attr('src');
                let t = ''
                $('h1[data-e2e="browse-video-desc"]').children().each((i, el) => {
                    if ($(el).get(0).tagName == 'span') t += $(el).text();
                    if ($(el).get(0).tagName == 'a') {
                        if ($(el).children().each((i, el) => {
                            if ($(el).get(0).tagName == 'strong') t += $(el).text();
                        }));
                    }
                });
                this.video_description = t;
                this.embed_link = `https://www.tiktok.com/${this.creator}/video/${this.id}`;
                this.like_count = unabbreviateNumber(lowercaseK($('strong[data-e2e="like-count"]').text()));
                this.comment_count = unabbreviateNumber(lowercaseK($('strong[data-e2e="comment-count"]').text()));
                this.saved_count = unabbreviateNumber(lowercaseK($('strong[data-e2e="undefined-count"]').text()));
                this.share_count = unabbreviateNumber(lowercaseK($('strong[data-e2e="share-count"]').text()));

            })
            .catch(error => {
                console.log(error);
            });
        return this;
    }
}



module.exports = Post;
