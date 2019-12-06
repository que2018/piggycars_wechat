
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    categories: [],
    featured: [],
    blogs: [],
    category_loading: true,
    feature_loading: true,
    blog_loading: true,
    show_loading: true
  },
  onLoad: function (options) {
    this.loadData();
  },
  loadData: function () {
    var that = this;

    wx.request({
      url: app.globalData.API_LANG,
      complete: function (res) {
        wx.setStorageSync("sessionid", res.header["Set-Cookie"]);

        that.getCategories();
        that.getFeatureds();
        that.getBlogs();
      }
    });
  },
  getCategories() {
    var that = this;

    wx.request({
      header: {
        'cookie': wx.getStorageSync("sessionid"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.API_CATEGORIES,
      complete: function (res) {
        that.setData({
          category_loading: false
        });

        that.checkComplete();

        if(res.data.success) {
          var categories = [];

          for(var i = 0; i < res.data.data.length; i++) {
            var category = new Object();
            let item = res.data.data[i];

            category.title = item.name;
            category.price = item.price;
            category.params = util.json2Form(item.params);

            category.image = app.globalData.API_RES + "/" + item.image;
            categories.push(category);
          }

          that.setData({
            categories: categories
          });
        }
      }
    });
  },
  getFeatureds() {
    var that = this;

    wx.request({
      header: {
        'cookie': wx.getStorageSync("sessionid"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.API_CARS,
      method: "POST",
      data: util.json2Form({
        hot: "1"
      }),
      complete: function (res) {
        that.setData({
          feature_loading: false
        });

        that.checkComplete();

        if (res.data.success) {
          var featureds = [];

          for (var i = 0; i < res.data.data.items.length; i++) {
            var featured = new Object();
            let item = res.data.data.items[i];

            featured.id = item.id;
            featured.carId = item.carId;
            featured.year = item.year;
            featured.make = decodeURIComponent(item.make);
            featured.model = decodeURIComponent(item.model);
            featured.monthlyPayment = item.monthly_payment
            featured.city = item.location.city

            let images = item.car_images;
            featured.image = app.globalData.API_RES + "/car/lg/" + images[0].value;
            featureds.push(featured);
          }

          that.setData({
            featureds: featureds
          });
        }
      }
    });
  },
  getBlogs() {
    var that = this;

    wx.request({
      header: {
        'cookie': wx.getStorageSync("sessionid"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.API_BLOGS,
      complete: function(res) {
        that.setData({
          blog_loading: false
        });

        that.checkComplete();

        if (res.data.success) {
          var blogs = [];

          for (var i = 0; i < res.data.data.items.length; i++) {
            var blog = new Object();
            let item = res.data.data.items[i];

            blog.id = item.id;
            blog.title = decodeURIComponent(item.title);
            blog.description = decodeURIComponent(item.description);
            blog.image = app.globalData.API_RES + "/article/lg/" + item.image;
            blogs.push(blog);
          }

          that.setData({
            blogs: blogs
          });
        }
      }
    });
  },
  clickCategory: function (event) {
    app.globalData.filter_params = event.currentTarget.dataset.params;

    wx.switchTab({
      url: '../car_list/index'
    });
  },
  clickFeature: function (event) {
    var id = event.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../car_detail/index?id=' + id
    });
  },
  clickBlog: function (event) {
    var id = event.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../article_detail/index?id=' + id
    });
  },
  checkComplete() {
    if((!this.category_loading) && (!this.feature_loading) && (!this.blog_loading)) {
      this.setData({
        show_loading: false
      });
    }
  }
})
