
Page({
  data: {
    articles: []
  },
  onLoad: function (options) {
    let about   = { id: 10, title: "关于我们"};
    let term    = { id: 11, title: "使用协议" };
    let pricacy = { id: 12, title: "隐私条款" };
    let fee     = { id: 13, title: "费用" };
    let contact = { id: 14, title: "联系我们" };

    var articles = [];
    
    articles.push(about);
    articles.push(term);
    articles.push(pricacy);
    articles.push(fee);
    articles.push(contact);

    this.setData({
      articles: articles
    });
  }
})