
App({
  globalData: {
    version: 'v1.0.0',
    is_login: false,
    user_id: "",
    username: "",
    password: "",
    email: "",
    country_code: "1",
    phone_local: "",
    phone: "",
    code: "",
    first_name: "",
    last_name: "",
    address: {},
    id_images: [],
    filter_params: "",
    order_id: 0,
    checkout_id: 0,
    checkout_year: "",
    checkout_make: "",
    checkout_model: "",
    checkout_image: "",
    checkout_payment_down: 0,
    checkout_payment_down_tax: 0,
    checkout_payment_down_total: 0,
    API_LOGIN: "https://debug.piggycars.com/api/account/login",
    API_LOGOUT: "https://debug.piggycars.com/api/account/logout",
    API_REGISTER: "https://debug.piggycars.com/api/account/register",
    API_USER: "https://debug.piggycars.com/api/account/user",
    API_PASSWORD: "https://debug.piggycars.com/api/account/reset",
    API_SMS: "https://debug.piggycars.com/api/account/validation/send_code",
    API_ADDR: "https://debug.piggycars.com/api/account/register/contact",
    API_ID: "https://debug.piggycars.com/api/account/register/get_identity",
    API_CONFIRM: "https://debug.piggycars.com/api/checkout/confirm",
    API_CARD: "https://debug.piggycars.com/api/extension/payment/stripe",
    API_WECHAT_AUTH: "https://debug.piggycars.com/api/checkout/confirm/wechat_auth",
    API_CARS: "https://debug.piggycars.com/api/catalog/vehicle/get_list",
    API_CAR: "https://debug.piggycars.com/api/catalog/vehicle",
    API_CATEGORIES: "https://debug.piggycars.com/api/catalog/filters/featured",
    API_ORDER: "https://debug.piggycars.com/api/sales/order/get_list",
    API_BLOGS: "https://debug.piggycars.com/info/article/get_list",
    API_BLOG_DETAIL: "https://debug.piggycars.com/info/article/json/",
    API_LANG: "https://debug.piggycars.com/api/common/language?lang=chinese&no_redirect=1",
    API_RES: "https://piggycars.com/assets/image"
  }
})