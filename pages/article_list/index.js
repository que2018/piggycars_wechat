
Page({
  data: {
    articles: []
  },
  onLoad: function (options) {
    let about   = {code:"about", title:"关于我们"};
    let contact = {code:"contact", title:"联系我们"};
    let flow = { code: "flow", title: "订阅流程" };

    var articles = [];
    
    articles.push(about);
    articles.push(contact);
    articles.push(flow);

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