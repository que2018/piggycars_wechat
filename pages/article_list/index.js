
Page({
  data: {
    articles: []
  },
  onLoad: function (options) {
    let about   = {code:"about", title:"关于我们"};
    let fee     = {code:"fee", title:"费用"};
    let contact = {code:"contact", title:"联系我们"};

    var articles = [];
    
    articles.push(about);
    articles.push(fee);
    articles.push(contact);

    this.setData({
      articles: articles
    });
  },
  clickArticle: function (event) {
    var code = event.currentTarget.dataset.code;

    wx.navigateTo({
      url: '../'+ code +'/index'
    });
  }
})