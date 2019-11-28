
var app = getApp();

Page({
  data: {
    categories: [],
    featured: [],
    blogs: []
  },
  onLoad: function (options) {
    this.loadData();
  },
  loadData: function () {
    var that = this;

    var categories = [];

    let category1 = {
      image: "https://piggycars.com/assets/image/hp_b1.png",
      title: "经济型",
      price: "$69/月"
    };

    let category2 = {
      image: "https://piggycars.com/assets/image/hp_b2.png",
      title: "面包车",
      price: "$269/月"
    };

    let category3 = {
      image: "https://piggycars.com/assets/image/hp_b3.png",
      title: "运动型",
      price: "$259/月"
    };

    let category4 = {
      image: "https://piggycars.com/assets/image/hp_b4.png",
      title: "豪华车",
      price: "$459/月"
    };

    let category5 = {
      image: "https://piggycars.com/assets/image/hp_b5.png",
      title: "SUV",
      price: "$269/月"
    };

    let category6 = {
      image: "https://piggycars.com/assets/image/hp_b6.png",
      title: "新能源车",
      price: "$239/月"
    };

    let category7 = {
      image: "https://piggycars.com/assets/image/hp_b7.png",
      title: "皮卡",
      price: "$369/月"
    };

    let category8 = {
      image: "https://piggycars.com/assets/image/hp_b8.png",
      title: "商用车",
      price: "$469/月"
    };
   
    categories.push(category1);
    categories.push(category2);
    categories.push(category3);
    categories.push(category4);
    categories.push(category5);
    categories.push(category6);
    categories.push(category7);
    categories.push(category8);

    var featureds = [];

    let featured1 = {
      image: "https://piggycars.com/assets/image/hp_b8.png",
      title: "Toyota",
      pickup: "Industory",
      price: "$100/月"
    };

    let featured2 = {
      image: "https://piggycars.com/assets/image/hp_b8.png",
      title: "Toyota",
      pickup: "Industory",
      price: "$100/月"
    };

    featureds.push(featured1);
    featureds.push(featured2);

    var blogs = [];

    let blog1 = {
      image: "https://piggycars.com/assets/image/hp_b8.png",
      title: "title1",
      desp: "desp1"
    };

    let blog2 = {
      image: "https://piggycars.com/assets/image/hp_b8.png",
      title: "title2",
      desp: "desp2"
    };

    blogs.push(blog1);
    blogs.push(blog2);

    that.setData({
      categories: categories,
      featureds: featureds,
      blogs: blogs
    });
  },
  clickSlider: function (event) {
    
  }
})
