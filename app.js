
App({
  globalData: {
    version: 'v1.8.7',
    limit: 8,
    is_login: false,
    user_id: "",
    username: "",
    password: "",
    email: "",
    country_code: "1",
    phone_local: "",
    phone: "",
    code: "",
    openid: "",
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
    API_LOGIN: "https://front.piggycars.net/api/account/login",
    API_WECHAT_LOGIN: "https://front.piggycars.net/api/account/login/with",
    API_WECHAT_REGISTER: "https://front.piggycars.net/api/account/register/with",
    API_LOGOUT: "https://front.piggycars.net/api/account/logout",
    API_REGISTER: "https://front.piggycars.net/api/account/register",
    API_USER: "https://front.piggycars.net/api/account/user",
    API_PASSWORD: "https://front.piggycars.net/api/account/reset",
    API_SMS: "https://front.piggycars.net/api/account/validation/send_code",
    API_ADDR: "https://front.piggycars.net/api/account/register/contact",
    API_ID: "https://front.piggycars.net/api/account/register/get_identity",
    API_ID_UPLOAD: "https://front.piggycars.net/api/account/register/identity",
    API_CONFIRM: "https://front.piggycars.net/api/checkout/confirm",
    API_CARD: "https://front.piggycars.net/api/extension/payment/stripe",
    API_WECHAT_AUTH: "https://front.piggycars.net/api/extension/payment/hantepay",
    API_CARS: "https://front.piggycars.net/api/catalog/vehicle/get_list",
    API_CAR: "https://front.piggycars.net/api/catalog/vehicle",
    API_FILTERS: "https://front.piggycars.net/api/catalog/filters",
    API_CATEGORIES: "https://front.piggycars.net/api/catalog/filters/category",
    API_ORDER: "https://front.piggycars.net/api/sales/order/get_list",
    API_BLOGS: "https://front.piggycars.net/info/article/get_list",
    API_BLOG_DETAIL: "https://front.piggycars.net/info/article/json/",
    API_LANG: "https://front.piggycars.net/api/common/language?lang=chinese&no_redirect=1",
    API_RES: "https://piggycars.com/api/assets/image",
    API_RES_INFO: "https://piggycars.com/assets/image"
  }
})