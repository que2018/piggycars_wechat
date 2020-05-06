
let app = getApp();
let util = require('../../utils/util.js');

Component({
  properties: {
    message: {
      type: Array,
      value: ""
    }
  },
  data: {
    show_filter: false,
    //keys: ["colors", "cities", "makes", "years", "styles", "dealers", "mileage", "monthly_payment", "down_payment"],
    keys: ["colors", "cities", "makes", "years", "styles", "dealers"],
    titles: {
      "colors": "颜色",
      "cities": "城市",
      "makes": "厂商",
      "years": "年份",
      "styles": "车型",
      "dealers": "经销商",
      "mileage": "里程",
      "monthly_payment": "月租金",
      "down_payment": "订阅费"
    },
    filter_items: {}
  },
  lifetimes: {
    attached: function () {
      var that = this;

      wx.request({
        url: app.globalData.API_FILTERS,
        complete: function (res) {
          //console.log(res);

          if(res.data.success) {
            var filterItemsData = {};
            let filterItems = res.data.data;

            for(var key in filterItems) {
              let filterItem = filterItems[key];

              var filterItemData = {};
              filterItemData["type"] = filterItem.type;
              filterItemData["title"] = that.data.titles[key];

              let data = [];
              let dataDraft = filterItem.data;

              for (var index = 0; index < dataDraft.length; index++) {
                var item = dataDraft[index];
                let length = String(item.name).length;

                let font_size = 0;

                if(length < 3) {
                  font_size = 14;
                } else if (length < 4) {
                  font_size = 13;
                } else if (length < 5) {
                  font_size = 13;
                } else if (length < 6) {
                  font_size = 12;
                } else if (length < 7) {
                  font_size = 12;
                } else if (length < 8) {
                  font_size = 11;
                } else if (length < 9) {
                  font_size = 10;
                } else if (length < 10) {
                  font_size = 9;
                } else if (length < 11) {
                  font_size = 9;
                } else if (length < 12) {
                  font_size = 9;
                } else if (length < 13) {
                  font_size = 9;
                } else if (length < 14) {
                  font_size = 8;
                } else if (length < 16) {
                  font_size = 8;
                } else {
                  font_size = 5;
                }

                item["font_size"] = font_size;
                item["selected"] = false;

                data.push(item);
              }

              filterItemData["data"] = data;
              
              if (filterItem.type == "list") {
                let length = filterItem.data.length;
                filterItemData["height"] = Math.ceil(length / 4) * 33 + 35 + 32;
              } else {
                filterItemData["height"] = 90 + 35;
              }

              filterItemsData[key] = filterItemData;
            }

            that.setData({
              filter_items: filterItemsData
            });
          }
        }
      });
    }
  },
  methods: {
    toggleFilter: function (event) {
      /* this.animate('#xxxx', [
        { opacity: 1.0, rotate: 0, backgroundColor: '#FF0000' },
        { opacity: 0.5, rotate: 45, backgroundColor: '#00FF00' },
        { opacity: 1.0, rotate: 90, backgroundColor: '#FF0000' },
      ], 5000); */

      if(this.data.show_filter) {
        this.setData({
          show_filter: false
        });
      } else {
        this.setData({
          show_filter: true
        });
      }
    },
    bindSelect: function (event) {
      let index = event.currentTarget.dataset.index;
      let id = event.currentTarget.dataset.id;
      let name = event.currentTarget.dataset.name;

      let key = name + "[" + index + "]";

      var filter_items = this.data.filter_items;
      let selected = filter_items[name]["data"][index]["selected"];

      if(selected) {
        delete app.globalData.filter_params[key];
        filter_items[name]["data"][index]["selected"] = false;
      } else {
        app.globalData.filter_params[key] = id;
        filter_items[name]["data"][index]["selected"] = true;
      }

      console.log(app.globalData.filter_params);

      this.setData({
        filter_items: filter_items
      });
    },
    exeFilter: function (event) {
      this.triggerEvent('notification', {});

      this.setData({
        show_filter: false
      });
    },
    clearFilter: function (event) {
      var filterItems = this.data.filter_items;

      for (var key in filterItems) {
        let filterItem = filterItems[key];

        for (var index = 0; index < filterItem.data.length; index++) {
          filterItem.data[index]["selected"] = false;
        }
      }

      this.setData({
        filter_items: filterItems
      });

      app.globalData.filter_params = {}
    }
  }
})