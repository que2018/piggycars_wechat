
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
    API_LOGIN: "https://debug.piggycars.com/api/account/login",
    API_LOGOUT: "https://debug.piggycars.com/api/account/logout",
    API_REGISTER: "https://debug.piggycars.com/api/account/register",
    API_USER: "https://debug.piggycars.com/api/account/user",
    API_ID: "https://debug.piggycars.com/api/account/register/get_identity",
    API_CARS: "https://debug.piggycars.com/api/catalog/vehicle/get_list",
    API_CAR: "https://debug.piggycars.com/api/catalog/vehicle",
    API_RES: "https://debug.piggycars.com/assets/image"
  }
})