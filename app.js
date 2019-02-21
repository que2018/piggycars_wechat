
App({
  globalData: {
    VERSION: 'v2.5.3',
    AUTH_LOGIN: false,
    TOKEN: "",
    token_id: 0,
    name: "",
    exam_id: 0,
    exam_finish_timestamp:0,
    course_ids: [],
    exam_enabled: [],
    question_index: 0,
    questions: "",
    API_HOME: "https://api.jiangjiangusa.com/common/home",
    API_TOP_CATEGORIES: "https://api.jiangjiangusa.com/catalog/category/top_categories",
    API_CATEGORIES: "https://api.jiangjiangusa.com/catalog/category/get_categories",
    API_CLASSES: "https://api.jiangjiangusa.com/catalog/category/get_classes",
    API_CLASS: "https://api.jiangjiangusa.com/catalog/course/get_course",
    API_EXAMS: "https://api.jiangjiangusa.com/catalog/category/get_exams",
    API_EXAM: "https://api.jiangjiangusa.com/catalog/exam/get_exam",
    API_EXAM_SUBMIT: "https://api.jiangjiangusa.com/catalog/exam/submit_exam",
    API_CHECK_TOKEN: "https://api.jiangjiangusa.com/me/me/check_token",
    API_CHECK_SMS: "https://api.jiangjiangusa.com/me/me/check_sms",
    API_CHECK_WECHAT: "https://api.jiangjiangusa.com/me/me/check_wechat",
    API_CHECK_WECHAT_BG: "https://api.jiangjiangusa.com/me/me/check_wechat_bg"
  }
})