
var util = require('utils/util.js');

App({
  globalData: {
    version: 'v1.0.0',
    is_login: false,
    email: "",
    password: "",
    API_LOGIN: "https://debug.piggycars.com/api/account/login",
    API_CARS: "https://debug.piggycars.com/api/catalog/vehicle/get_list",
    API_CAR: "https://debug.piggycars.com/api/catalog/vehicle",
    API_RES: "https://debug.piggycars.com/assets/image"
  }
})