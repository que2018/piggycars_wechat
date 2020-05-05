
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
    this.getCategories();
    this.getFeatureds();
    this.getBlogs();
  },
  getCategories() {
    let that = this;

    that.setData({
      category_loading: true
    });

    wx.request({
      header: {
        'cookie': wx.getStorageSync("sessionid"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.API_CATEGORIES,
      complete: function (res) {
        that.checkComplete();

        if(res.data.success) {
          var categories = [];

          for(var i = 0; i < res.data.data.length; i++) {
            var category = new Object();
            let item = res.data.data[i];

            category.id = item.id;
            category.title = item.name;
            category.image = item.image;
            categories.push(category);
          }

          that.setData({
            categories: categories
          });
        }

        that.setData({
          category_loading: false
        });

        that.checkComplete();
      }
    });
  },
  getFeatureds() {
    var that = this;

    that.setData({
      feature_loading: true
    });

    wx.request({
      header: {
        'cookie': wx.getStorageSync("sessionid"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.API_CARS,
      method: "POST",
      data: util.json2Form({
        "hot": "1"
      }),
      complete: function (res) {
        //console.log(res.data);

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
            featured.image = app.globalData.API_RES + "/car/md/" + images[0].value;
            featureds.push(featured);
          }

          that.setData({
            featureds: featureds
          });
        }

        that.setData({
          feature_loading: false
        });

        that.checkComplete();
      }
    });
  },
  getBlogs() {
    var that = this;

    that.setData({
      blog_loading: true
    });

    wx.request({
      header: {
        'cookie': wx.getStorageSync("sessionid"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.API_BLOGS,
      complete: function(res) {
        //console.log(res.data);

        if (res.data.success) {
          var blogs = [];

          for (var i = 0; i < res.data.data.items.length; i++) {
            var blog = new Object();
            let item = res.data.data.items[i];

            blog.id = item.id;

            let title = decodeURIComponent(item.title);

            if (title.length > 25) {
              blog.title = title.substring(0, 25) + "..";
            } else {
              blog.title = title;
            }

            let description = decodeURIComponent(item.meta_description);
            blog.description = description.substring(0, 100) + " ...";

            blog.image = app.globalData.API_RES_INFO + "/article/md/" + item.image;

            blogs.push(blog);
          }

          that.setData({
            blogs: blogs
          });
        }

        that.setData({
          blog_loading: false
        });

        that.checkComplete();
      }
    });
  },
  clickCategory: function (event) {
    let id = event.currentTarget.dataset.id;
    let key = "styles[0]";
    let params = {[key]: id, "start": 0, "size": 100};

    app.globalData.filter_params = util.json2Form(params);

    wx.navigateTo({
      url: '../car_list_full/index'
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

      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }
  },
  onPullDownRefresh: function () {
    this.getCategories();
    this.getFeatureds();
    this.getBlogs();
  }
})
