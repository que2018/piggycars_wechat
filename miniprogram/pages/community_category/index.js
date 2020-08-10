
let app = getApp();
let util = require('../../utils/util.js');

Page({
  data: {
    posts: [],
    show_loading: true
  },
  onLoad: function (options) {
    this.loadData(options.id);
  },
  loadData: function (post_category_id) {
    let that = this;

    let header = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    let data = [];
 
    data["start"] = 0;
    data["size"] = app.globalData.limit;
    data["post_category_id"] = post_category_id;

    console.log(post_category_id);

    wx.request({
      url: app.globalData.API_COMMUNITY_CATEGORY,
      header: header,
      method: "POST",
      data: util.json2Form(data),
      complete: function (res) {
        if (res.data.success) {
          //console.log(res.data);

          var posts = [];

          if (res.data.data.items) {
            for (var i = 0; i < res.data.data.items.length; i++) {
              let item = res.data.data.items[i];

              var post = new Object();

              post.id = decodeURIComponent(item.id);
              post.title = decodeURIComponent(item.title);

              if(item.image) {
                post.image = app.globalData.API_RES_INFO + "/post/sm/" + item.image;
              } else {
                post.image = "../../images/placeholder.jpg";
              }

              posts.push(post); 
            }
          }

          that.setData({
            posts: posts,
            show_loading: false
          });
        }
      }
    });
  },
  tabPost: function (event) {
    let id = event.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../community_post/index?id=' + id
    });
  },
});