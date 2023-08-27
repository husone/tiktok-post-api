

const axios = require('axios');
const cheerio = require('cheerio');
const { unabbreviateNumber } = require('js-abbreviation-number');

class Post {
    constructor(creator,id) {
        if (!creator) throw new Error('Username is required');
        if (!id) throw new Error('Id is required');
        if (creator[0] != '@') creator = '@' + creator; // if username is not start with @
        this.creator = creator;
        this.id = id;
    }

    async getPost() {
        return axios.get(`https://www.tiktok.com/${this.creator}/video/${this.id}`)
            .then(response => {
                console.log(response.data);
                let $ = cheerio.load(response.data);
                this.create_time = create_time;
                this.cover_image_url = cover_image_url;
                this.share_url = share_url;
                this.video_description = video_description;
                this.video_duration = video_duration;
                this.height = height;
                this.width = width;
                this.title = title;
                this.embed_html = embed_html;
                this.embed_link = embed_link;
                this.like_count = like_count;
                this.comment_count = comment_count;
                this.share_count = share_count;
                this.view_count = view_count;

            })
            .catch(error => {
                console.log(error);
            });
    }
}

exports.Post = (id, create_time, cover_image_url, share_url, video_description, video_duration, height, width, title, embed_html, embed_link, like_count, comment_count, share_count, view_count) => {
    this.id = id;
    this.create_time = create_time;
    this.cover_image_url = cover_image_url;
    this.share_url = share_url;
    this.video_description = video_description;
    this.video_duration = video_duration;
    this.height = height;
    this.width = width;
    this.title = title;
    this.embed_html = embed_html;
    this.embed_link = embed_link;
    this.like_count = like_count;
    this.comment_count = comment_count;
    this.share_count = share_count;
    this.view_count = view_count;
}

module.exports = User;
