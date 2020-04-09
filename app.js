
App({
  globalData: {
    version: 'v1.3.5',
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
    filter_params: {},
    order_id: 0,
    checkout_id: 0,
    checkout_year: "",
    checkout_make: "",
    checkout_model: "",
    checkout_image: "",
    checkout_payment_down: 0,
    checkout_payment_down_tax: 0,
    checkout_payment_down_total: 0,
    API_LOGIN: "https://piggycars.net/api/account/login",
    API_LOGOUT: "https://piggycars.net/api/account/logout",
    API_REGISTER: "https://piggycars.net/api/account/register",
    API_USER: "https://piggycars.net/api/account/user",
    API_PASSWORD: "https://piggycars.net/api/account/reset",
    API_SMS: "https://piggycars.net/api/account/validation/send_code",
    API_ADDR: "https://piggycars.net/api/account/register/contact",
    API_ID: "https://piggycars.net/api/account/register/get_identity",
    API_ID_UPLOAD: "https://piggycars.net/api/account/register/identity",
    API_CONFIRM: "https://piggycars.net/api/checkout/confirm",
    API_CARD: "https://piggycars.net/api/extension/payment/stripe",
    API_WECHAT_AUTH: "https://piggycars.net/api/checkout/confirm/wechat_auth",
    API_CARS: "https://piggycars.net/api/catalog/vehicle/get_list",
    API_CAR: "https://piggycars.net/api/catalog/vehicle",
    API_FILTERS: "https://piggycars.net/api/catalog/filters",
    API_CATEGORIES: "https://piggycars.net/api/catalog/filters/category",
    API_ORDER: "https://piggycars.net/api/sales/order/get_list",
    API_BLOGS: "https://piggycars.net/info/article/get_list",
    API_BLOG_DETAIL: "https://piggycars.net/info/article/json/",
    API_LANG: "https://piggycars.net/api/common/language?lang=chinese&no_redirect=1",
    API_RES: "https://piggycars.net/api/assets/image",
    API_RES_INFO: "https://piggycars.net/assets/image"
  }
})