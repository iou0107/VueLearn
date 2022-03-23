var app = new Vue({
    el: "#player",
    data: {
        query: "",
        musicList: [],
        hotComments: [],
        musicUrl: "",
        musicCover: "",
        isPlaying: false,
        mvUrl: "",
        isShow: false
    },
    methods: {
        // 1. 按照关键词搜索歌曲
        searchMusic: function() {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query).
            then(function(res) {
                that.musicList = res.data.result.songs;
                console.log(that.musicList);
            }, function(err) {
                console.log("searchMusic报错了：", err);
            })
        },
        // 2. 按照歌曲id搜索歌曲
        playMusic: function(musicId) {
            var that = this;
            // 获取歌曲路径
            axios.get("https://autumnfish.cn/song/url?id=" + musicId).
            then(function(res) {
                // console.log(res.data.data[0]);
                that.musicUrl = res.data.data[0].url;
            }, function(err) {
                console.log("playMusic获取歌曲路径报错了：", err);
            }),
            // 3. 获取歌曲背景
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).
            then(function(res) {
                // console.log(res.data.songs[0].al.picUrl);
                that.musicCover = res.data.songs[0].al.picUrl;
            }, function(err) {
                console.log("playMusic获取歌曲背景报错了：", err);
            }),
            // 4. 获取歌曲评论
            axios.get("https://autumnfish.cn/comment/hot?id=" + musicId + "&type=0").
            then(function(res) {
                // console.log("获取歌曲评论如下：", res.data.hotComments);
                that.hotComments = res.data.hotComments;
            }, function(err) {
                console.log("playMusic获取歌曲评论报错了：", err);
            })
        },
        // 5. 播放动画：播放、暂停
        play: function() {
            this.isPlaying = true;
        },
        pause: function() {
            this.isPlaying = false;
        },
        // 6. 播放MV
        playMV: function(mvid) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid).
            then(function(res) {
                console.log(res.data.data.url);
                that.mvUrl = res.data.data.url;
                that.isShow = true;
            }, function(err) {
                console.log("playMv获取mv地址报错了：", err);
            })
        },
        hide: function() {
            this.isShow = false;
            this.mvUrl = "";
        }
    }
})