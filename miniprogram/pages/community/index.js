
let app = getApp();
let util = require('../../utils/util.js');

Page({
  data: {
    posts: [],
    top_categories: [],
    hot_categories: [],
    show_loading: true
  },
  onLoad: function (options) {
    this.loadData();
  },
  loadData: function () {
    let that = this;

    let header = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    let data = [];

    wx.request({
      url: app.globalData.API_COMMUNITY_HOME,
      header: header,
      method: "POST",
      data: util.json2Form(data),
      complete: function (res) {
        if (res.data.success) {
          var top_categories = [];

          if (res.data.data.top_categories) {
            for (var i = 0; i < res.data.data.top_categories.length; i++) {
              var top_category = new Object();

              let item = res.data.data.top_categories[i];

              top_category.id = decodeURIComponent(item.id);
              top_category.title = decodeURIComponent(item.title);

              var posts = [];

              if (item.posts) {
                for (var j = 0; j < item.posts.length; j++) {
                 var post = new Object();

                  let post_data = item.posts[j];

                  post.id = decodeURIComponent(post_data.id);
                  post.title = decodeURIComponent(post_data.title);
                  post.meta_title = decodeURIComponent(post_data.meta_title);
                  post.meta_description = decodeURIComponent(post_data.meta_description);

                  if(post_data.image) {
                    post.image = app.globalData.API_RES_INFO + "/post/sm/" + post_data.image;
                  } else {
                    post.image = "../../images/placeholder.jpg";
                  }

                  posts.push(post);
                }
              }

              top_category.posts = posts;

              top_categories.push(top_category);
            }
          }

          var hot_categories = [];

          if (res.data.data.hot_categories) {
            for (var i = 0; i < res.data.data.hot_categories.length; i++) {
              var hot_category = new Object();

              let item = res.data.data.hot_categories[i];

              hot_category.id = decodeURIComponent(item.id);
              hot_category.title = decodeURIComponent(item.title);
              hot_category.background_color = decodeURIComponent(item.background_color);
              hot_category.meta_description = decodeURIComponent(item.meta_description);

              if(item.image) {
                hot_category.image = app.globalData.API_RES_INFO + "/post_category/orig/" + item.image;
              } else {
                hot_category.image = "";
              }

              hot_categories.push(hot_category);
            }
          }
  
          that.setData({
            show_loading: false,
            posts: top_categories[0].posts,
            hot_categories: hot_categories,
            top_categories: top_categories
          });
        }
      }
    });
  },
  tabCategory: function (event) {
    let index = event.currentTarget.dataset.index;

    this.setData({
      posts: this.data.top_categories[index].posts
    });
  },
  tabHot: function (event) {
    let id = event.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../community_category/index?id=' + id
    });
  },
  tabPost: function (event) {
    let id = event.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../community_post/index?id=' + id
    });
  }
})