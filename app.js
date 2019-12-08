
App({
  globalData: {
    version: 'v0.2.2',
    is_login: false,
    user_id: "",
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    address: {},
    filter_params: "",
    API_LOGIN: "https://debug.piggycars.com/api/account/login",
    API_LOGOUT: "https://debug.piggycars.com/api/account/logout",
    API_REGISTER: "https://debug.piggycars.com/api/account/register",
    API_USER: "https://debug.piggycars.com/api/account/user",
    API_PASSWORD: "https://debug.piggycars.com/api/account/reset",
    API_SMS: "https://debug.piggycars.com/api/account/validation/send_code",
    API_ADDR: "https://debug.piggycars.com/api/account/register/contact",
    API_ID: "https://debug.piggycars.com/api/account/register/get_identity",
    API_CARS: "https://debug.piggycars.com/api/catalog/vehicle/get_list",
    API_CAR: "https://debug.piggycars.com/api/catalog/vehicle",
    API_CATEGORIES: "https://debug.piggycars.com/api/catalog/filters/featured",
    API_BLOGS: "https://debug.piggycars.com/info/article/get_list",
    API_BLOG_DETAIL: "https://debug.piggycars.com/info/article/json/",
    API_LANG: "https://debug.piggycars.com/api/common/language?lang=chinese&no_redirect=1",
    API_RES: "https://debug.piggycars.com/assets/image"
  }
})