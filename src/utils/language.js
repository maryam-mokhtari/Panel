import {uncapilizeString} from './string'

export const ln = (message) => {
  if (!message || typeof(message) != 'string') return message
  // message = uncapilizeString(message)
  if (language && language.messages) {
    if (!language.messages[message]) {
      return language.messages[message.toLowerCase()] && language.messages[message.toLowerCase()][language.key] || message
    }
    return language.messages[message][language.key]
  }
  // return language && language.messages && language.messages[message] && language.messages[message][language.key] || message
}
export const dir = (dir) => {
  return language && language[dir] && language[dir][language.key] || dir
}
export const swip = (str1, str2) => {
  if(language.key == 'fa') {
    return ln(str1) + " " + ln(str2)
  }
  else {
    return ln(str2) + " " + ln(str1)
  }
}
export const language = {
  key: localStorage && localStorage.getItem('language') && localStorage.getItem('language').toLowerCase() || 'fa',
  locale: {fa: 'fa-IR', en: 'en-US'},
  direction: {fa: 'rtl', en: 'ltr'},
  align: {fa: 'right', en: 'left'},
  reverseAlign: {fa: 'left', en: 'right'},
  margin: {fa: 'marginRight', en: 'marginLeft'},
  name: {fa: 'farsi', en: 'english'},
  messages: {
    // general
    online: {fa: 'آنلاین', en: 'Online'},
    on: {fa: 'روشن', en: 'ON'},
    off: {fa: 'خاموش', en: 'OFF'},
    tb: {fa: 'ترابایت', en: 'TB'},
    gb: {fa: 'گیگابایت', en: 'GB'},
    mb: {fa: 'مگابایت', en: 'MB'},
    kb: {fa: 'کیلوبایت', en: 'KB'},
    b: {fa: 'بایت', en: 'B'},
    loading: {fa: 'در حال بارگیری', en: 'Loading'},
    dashboard: {fa: 'داشبورد', en: 'Dashboard'},
    controlPanel: {fa: 'پنل مدیریتی', en: 'Control panel'},
    home: {fa: 'خانه', en: 'Home'},
    moreinfo: {fa: 'اطلاعات بیشتر', en: 'More info'},
    about: {fa: 'درباره', en: 'About'},
    aboutus: {fa: 'درباره ما', en: 'About Us'},
    username: {fa: 'نام کاربر', en: 'Username'},
    email: {fa: 'ایمیل', en: 'Email'},
    verified: { fa: 'تایید شده', en: 'Verified' },
    enabled: { fa: 'فعال شده', en: 'Enabled' },
    userType: { fa: 'نوع کاربر', en: 'User type' },
    language: {fa: 'زبان', en: 'Language'},
    select: {fa: 'انتخاب', en: 'Select'},
    noUserWithThisInfo: {fa: 'هیچ کاربر با این نام کاربری یا ایمیل وجود ندارد', en: 'No user exists with this username or email' },
    name: {fa: 'نام', en: 'Name'},
    category: {fa: 'دسته', en: 'Category'},
    default: {fa: 'پیش فرض', en: 'Default'},
    active: {fa: 'فعال', en: 'Active'},
    close: {fa: 'بستن', en: 'Close'},
    cancel: {fa: 'انصراف', en: 'Cancel'},
    delete: {fa: 'حذف', en: 'Delete'},
    edit: {fa: 'ویرایش', en: 'Edit'},
    add: {fa: 'افزودن', en: 'Add'},
    update: {fa: 'به‌روز رسانی', en: 'Update'},
    irr: {fa: 'ریال', en: 'IRR'},
    date: {fa: 'تاریخ', en: 'Date'},
    charts: {fa: 'نمودارها', en: 'Charts'},
    chart: {fa: 'نمودار', en: 'chart'},
    noChartData: {fa: 'بدون داده', en: 'No Chart Data'},
    search: {fa: 'جستجو', en: 'Search'},
    advancedSearch: {fa: 'جستجوی پیشرفته', en: 'Advanced Search'},
    next: {fa: 'بعدی', en: 'Next'},
    previous: {fa: 'قبلی', en: 'Previous'},
    first: {fa: 'اول', en: 'First'},
    last: {fa: 'آخر', en: 'Last'},
    signout: {fa: 'خروج', en: 'Sign out'},
    profile: {fa: 'پروفایل', en: 'Profile'},
    membersince: {fa: 'عضو از‌', en: 'Member since'},
    user: {fa: 'کاربر', en: 'User'},
    problem: {fa: 'مشکل', en: 'Problem'},

    //GeneralList
    no: {fa: 'خیر', en: 'No'},
    yes: {fa: 'بله', en: 'Yes'},
    number: {fa: 'شماره', en: 'No.'},
    showing: {fa: 'نمایش', en: 'Showing'},
    to: {fa: 'تا', en: 'to'},
    of: {fa: 'از', en: 'of'},
    entries: { fa: 'موجودیت', en: 'entries'},
    noDataIsAvailable: {fa: 'داده‌ای برای نمایش وجود ندارد', en: 'No data is available to display'},
    day: {fa: 'روزانه', en: 'Day'},
    month: {fa: 'ماهانه', en: 'Month'},
    tmonth: {fa: 'سه ماهه', en: 'Three months'},
    smonth: {fa: 'شش ماهه', en: 'Six months'},
    nmonth: {fa: 'نه ماهه', en: 'Nine months'},
    year: {fa: 'سالانه', en: 'Year'},
    business: {fa: 'حقوقی', en: 'Business'},
    individual: {fa: 'حقیقی', en: 'Individual'},
    enterNewUserQuota: {fa: 'حجم کاربر را وارد کنید...', en: 'Enter user quota...'},

    //CFSInvoiceSinglePage
    invoiceError: {
      fa: {
        1: 'عدم درج شناسه واریز',
        2: 'عدم واریز به حساب',
        3: 'مغایرت میان مبلغ پرداختی و پیش فاکتور',
        4: 'سایر',
      },
      en: {
        1: 'Lacking Deposit ID',
        2: 'Lacking deposit to account',
        3: 'Difference between payment amount and pre-invoice',
        4: 'Other',
      },
    },
    invoiceState: {
      fa: {
        'DRAFT': 'پرداخت نشده',
        'PENDING': 'در انتظار تایید',
        'PAID': 'پرداخت شده',
        'REJECT': 'عدم تایید',
      },
      en: {
        'DRAFT': 'Not paid',
        'PENDING': 'Pending',
        'PAID': 'Paid',
        'REJECT': 'Rejected',
      }
    },

    draft: {fa: 'پیش‌فاکتور', en: 'Draft'},
    vmName: { fa: 'نام سرور مجازی', en: 'VPS Name' },

    //App
    cfs: {fa: 'میزبانی فایل', en: 'File Storage'},
    groupManagement: {fa: 'مدیریت گروه', en: 'Group Management'},
    mainNavigation: {fa: 'منوی مدیریتی', en: 'MAIN NAVIGATION'},
    users: {fa: 'کاربران', en: 'Users'},
    vpsOrders: {fa: 'سفارش‌های سرور مجازی', en: 'VPS Orders'},
    vpsInvoices: {fa: 'صورتحساب‌های سرور مجازی', en: 'VPS Invoices'},
    iPAddresses: {fa: 'آدرس‌های آی‌پی', en: 'IP Addresses'},
    hypervisors: {fa: 'لیست‌ هایپ‌ها', en: 'Hypervisors'},
    groups: {fa: 'گروه‌ها', en: 'Groups'},
    plans: {fa: 'طرح‌ها', en: 'Plans'},
    downloadUploadCharts: {fa: 'نمودارهای دانلود/آپلود', en: 'Download/Upload charts'},
    productInvoices: {fa: 'صورتحساب‌های محصول', en: 'Product Invoices'},
    allInvoices: {fa: 'همه صورتحساب‌ها', en: 'All Invoices'},
    draftInvoices: {fa: 'پیش فاکتورها', en: 'Draft Invoices'},
    pendingInvoices: {fa: 'در انتظار تایید', en: 'Pending Invoices'},
    rejectInvoices: {fa: 'رد شده', en: 'Reject Invoices'},
    paidInvoices: {fa: 'پرداخت شده', en: 'Paid Invoices'},
    authorization: {fa: 'اعتبار سنجی', en: 'Authorization'},
    addNewUser: { fa: 'افزودن کاربر جدید', en: 'Add new user'},
    emailsTextArePlaceholder: { fa: 'وارد کردن آدرس ها به صورت دستی به روش اول یا دوم', en: 'Enter emails manually or by using the csv file'},
    support: {fa: 'پشتیبانی', en: 'Support'},
    enterCSVFile: { fa: 'وارد کردن آدرس به‌ صورت فایل csv', en: 'Enter address as a CSV file'},

    //Dashboard
    invoices: {fa: 'صورتحساب‌ها', en: 'Invoices'},
    all: {fa: 'همه', en: 'All'},
    pending: {fa: 'در انتظار تایید', en: 'Pending'},
    paid: {fa: 'پرداخت شده', en: 'Paid'},
    unpaid: {fa: 'پرداخت نشده', en: 'Not Paid'},
    reject: {fa: 'رد شده', en: 'Reject'},
    plan: {fa: 'طرح', en: 'Plan'},
    newUser: {fa: 'کاربر جدید', en: 'New User'},
    vmbills: {fa: 'سفارش‌های VPS', en: 'VPS Bills'},
    vminvoices: {fa: 'صورتحساب‌های VPS', en: 'VPS Invoices'},
    hyps: {fa: 'هایپ‌ها', en: 'Hypervisors'},

    //General List
    revenueReport: {fa: 'دریافت گزارش', en: 'Revenue Report'},


    //Users Page
    registered: {fa: 'ثبت نام شده', en: 'Registered'},

    //User Page
    userInformation: {fa: 'اطلاعات کاربر', en: 'User Information'},
    userData: {fa: 'داده کاربر', en: 'User Data'},
    userAuthorization: {fa: 'اعتبارسنجی کاربر', en: 'User Authorization'},
    transactions: {fa: 'تراکنش‌ها', en: 'Transactions'},
    ipHistories: {fa: 'تاریخچه آی‌پی‌ها', en: 'IP Histories'},
    manageUsers: { fa: 'مدیریت کاربران', en: 'Manage Users' },
    changeQuota: { fa: 'تغییر حجم', en: 'Change quota' },
    userIsRejected: {fa: 'کاربر توسط شما رد شده است', en: 'The user has been rejected by you'},
    requestOf: {fa: 'درخواست', en: 'Request of'},
    rejectReason: {fa: 'دلیل رد', en: 'Reject reason'},
    acceptedUser: {fa: 'پذیرش اعتبارسنجی کاربر', en: 'User authorization Acceptance'},
    rejectedUser: {fa: 'رد اعتبارسنجی کاربر', en: 'User authorization Rejection'},
    doneSuccessfully: {fa: 'با موفقیت انجام شد', en: 'is successfully done'},

    //User Information page
    companyCount: {
      fa: {
        1: '۱-۱۰ (SOHO)',
        2: '۱۰-۱۰۰ (SME)',
        3: 'بیشتر از ۱۰۰ (Large)',
        4: 'دولتی (Public/Government)'
      },
      en: {
        1: '1-10 (SOHO)',
        2: '10-50 (SME)',
        3: '50-100 (Large)',
        4: 'More than 100 (Public/Government)',
      },
    },
    profileId: {fa: 'شناسه پروفایل', en: 'Profile Id'},
    userProfile: { fa: ' پروفایل کاربر', en: 'User profile' },
    companyInformation: {fa: 'اطلاعات شرکت', en: 'Company Information'},
    customerType: {fa: 'نوع مشتری', en: 'Customer Type'},
    company: {fa: 'شرکت', en: 'Company'},
    companyName: {fa: 'نام شرکت', en: 'Company name'},
    companyNationalCode: { fa: 'شناسه ملی شرکت', en: 'Company Id'},
    companyStaffCount: { fa: 'تعداد کارکنان', en: 'Number of Staff'},
    businessCode: {fa: 'شماره اقتصادی', en: 'Business Code'},
    registerNo: {fa: 'شماره ثبت', en: 'Register Number'},
    firstName: {fa: 'نام', en: 'First name'},
    lastName: {fa: 'نام خانوادگی', en: 'Last name'},
    balance: {fa: 'اعتبار', en: 'Balance'},
    group: {fa: 'گروه', en: 'Group'},
    mobile: {fa: 'تلفن همراه', en: 'Mobile'},
    mobileverified: {fa: 'تایید تلفن همراه', en: 'Mobile verified'},
    verificationCode: {fa: 'کد تایید', en: 'Verification code'},
    phone: {fa: 'تلفن', en: 'Phone'},
    fax: {fa: 'نمابر', en: 'Fax'},
    address: {fa: 'نشانی', en: 'Address'},
    city: {fa: 'شهر', en: 'City'},
    postalCode: {fa: 'کدپستی', en: 'Postal Code'},
    province: {fa: 'استان', en: 'Province'},
    nationalId: {fa: 'شماره ملی', en: 'National Id'},
    sendMessage: {fa: 'ارسال پیام', en: 'Send message'},
    payable: { fa: 'قابل پرداخت', en: 'Payable' },
    status: { fa: 'وضعیت', en: 'Status' },
    cadmin: {fa: 'نماینده', en: 'admin'},

    //User Authorization page
    userIsNow: {fa: 'کاربر', en: 'User is'},
    activated: {fa: 'فعال', en: 'Activated'},
    deactivated: {fa: 'غیر فعال', en: 'Deactivated'},

    //َUser Transactions
    updateBalance: {fa: 'به‌روزرسانی اعتبار', en: 'Update balance'},

    //Groups page
    addGroup: {fa: 'افزودن گروه', en: 'Add group'},

    //TrGroup
    adminInvoices: {fa: 'صورتحساب‌های مدیر', en: 'Admin invoices'},

    //GroupPage
    groupDetails: { fa: 'جزئیات گروه', en: 'Group details'},
    groupName: {fa: 'نام گروه', en: 'Group name'},
    memberCount: { fa: 'تعداد اعضای گروه', en: 'Member count'},

    adminUser: {fa: 'کاربر مدیر', en: 'Admin user'},
    planName: {fa: 'نام طرح', en: 'Plan name'},
    upgradeGroup: { fa: 'ارتقاء گروه', en: 'Upgrade group'},
    groupNotFound: { fa: 'گروه یافت نشد', en: 'Group is not found'},

    //UpgradeGroupPage
    upgrade: {fa: 'ارتقا', en: 'Upgrade'},
    uiVisible: { fa: 'قابل مشاهده', en: 'UI Visible'},
    noplanexistswiththisname: {fa: 'طرح با این نام موجود نیست', en: 'No plan exists with this name'},
    recurringPeriod: {fa: 'دوره تکرار', en: 'Recurring Period'},

    //PlanPage
    customPlan: {fa: 'طرح سفارشی', en: 'Custom plan'},
    product: {fa: 'محصول', en: 'Product'},
    addNewProduct: {fa: 'افزودن محصول جدید', en: 'Add new product'},
    planInfo: {fa: 'اطلاعات طرح', en: 'Plan Info'},
    //FormGeneralModal

    //Buttons

    //PFA

    //QB

    //PC

    //CFSInvoicesPage
    invoice: { fa: 'صورتحساب', en: 'Invoice'},
    period: { fa: 'نوع طرح', en: 'Type'},
    price: { fa: 'قیمت', en: 'Price'},
    invoiceStatus: { fa: 'وضعیت', en: 'Status'},
    from: {fa: 'از', en: 'From'},
    created: {fa: 'ایجاد شده', en: 'Created'},
    expiration: { fa: 'انقضا', en: 'Expiration'},
    preInvoiceSerial: {fa: 'شماره پیش فاکتور', en: 'PreInvoice serial'},
    invoiceSerial: { fa: 'شماره فاکتور', en: 'Invoice serial'},
    payIdentifier: { fa: 'شناسه پرداخت', en: 'Pay Identifier'},
    description: {fa: 'شرح', en: 'Description'},
    quantity: { fa: 'مقدار', en: 'Quantity'},
    rate: { fa: 'نرخ', en: 'Rate'},
    cost: { fa: 'هزینه', en: 'Cost'},
    refundPrice: { fa: 'قیمت استرداد', en: 'Refund price'},
    totalPricewithoutTaxandDiscount: { fa: 'قیمت کل بدون مالیات و تخفیف', en: 'Total price without tax and discount'},
    percentTaxes: { fa: 'درصد مالیات', en: 'percent taxes'},
    totalPrice: { fa: 'قیمت کل', en: 'Total price'},
    trackDate: { fa: 'تاریخ پیگیری', en: 'Track date'},
    acceptRejectRequest: { fa: 'درخواست پذیرش /رد', en: 'Accept/Reject request'},
    accept: { fa: 'پذیرش', en: 'Accept'},
    acceptPayment: { fa: 'پذیرش پرداخت', en: 'Accept payment'},
    paymentError: { fa: 'خطای پرداخت', en: 'Payment error'},
    paidDate: { fa: 'تاریخ پرداخت', en: 'Paid date'},
    rejectDue: { fa: 'دلیل رد شدن', en: 'Reject due'},
    theinvoiceisstillDRAFT: { fa: 'صورتحساب هنوز پیش فاکتور است', en: 'The invoice is still DRAFT'},
    invoicesOf: {fa: 'صورتحساب‌های', en: 'Invoices'},
    doReject: {fa: 'رد', en: 'Reject'},

    //TrCFSInvoice
    payInvoice: { fa: 'پرداخت صورتحساب', en: 'Pay invoice'},
    showInvoice: { fa: 'نمایش صورتحساب', en: 'Show invoice'},

    //VefifyISO
    verifyChecksum: { fa: 'ارزیابی Checksum', en: 'Verify Checksum'},
    uploadedMd5: {fa: 'Md5 بارگذاری شده', en: 'Uploaded Md5'},
    realMd5: {fa: 'Md5 واقعی', en: 'Real Md5'},
    isVerified: {fa: 'تایید شده', en: 'verified'},
    confirm: {fa: 'تایید', en: 'Confirm'},

    //VMBackup
    backups: { fa: 'فایل‌های پشتیبان', en: 'Backups'},
    createBackup: { fa: 'ایجاد فایل پشتیبان', en: 'Create backup'},
    backupType: {fa: 'نوع فایل پشتیبان', en: 'Backup type'},
    restore: {fa: 'بازیابی', en: 'Restore'},

    //VMInvoices
    updateLastInvoice: { fa: 'به‌روزرسانی آخرین صورتحساب', en: 'Update last invoice'},

    //AuthorizationPage
    systemAuthorizationIsNow: { fa: 'اعتبارسنجی سیستم در حال حاضر', en: 'System authorization is now'},
    systemAuthorization: { fa: 'اعتبارسنجی سیستم', en: 'System authorization'},

    //ChartsPage
    uploadDownloadCharts: {fa: 'نمودار‌های آپلود/دانلود', en: 'Upload/Download charts'},
    download: {fa: 'دانلود', en: 'Download'},


    //cfscharts
    cpu: {fa: 'پردازنده', en: 'CPU'},
    memory: {fa: 'حافظه', en: 'Memory'},

    //HypDetailPage
    hypervisorDetails: {fa: 'جزییات‌ هایپ', en: 'Hypervisor details'},
    hypervisor: {fa: 'هایپ', en: 'Hypervisor'},
    showVMOrdersList: {fa: 'لیست سفارش‌های سرور مجازی', en: 'VPS orders list'},
    updatePassword: {fa: 'به‌روز رسانی رمز عبور', en: 'Update password'},
    removeHypervisor: {fa: 'حذف هایپ', en: 'Remove hypervisor'},
    moreDetails: {fa: 'جزییات بیشتر', en: 'More details'},
    resources: {fa: 'منابع', en: 'Resources'},
    cores: {fa: 'هسته', en: 'Cores'},


    //HypsPage
    addHypervisor: {fa: 'افزودن هایپ', en: 'Add hypervisor'},

    //InvoicesPage

    //IpHistoryPage
    ipHistoryOrders: { fa: 'سفارشات تاریخچه آی‌پی', en: 'IP history orders'},
    ips: {fa: 'آی‌پی‌ها', en: 'IPs'},

    //VmBillSinglePage
    vmBill: { fa: 'سرور مجازی', en: 'VPS Bill'},
    vmOrders: { fa: 'سفارش‌های سرور مجازی', en: 'VPS Orders'},
    vmCreatedBefore: {fa: 'سرور مجازی قبلا ایجاد شده است', en: 'VPS created before'},
    sysName: {fa: 'نام سیستم', en: 'SysName'},
    os: {fa: 'سیستم عامل', en: 'OS'},
    ram: {fa: 'حافظه', en: 'Ram'},
    disk: {fa: 'دیسک', en: 'Disk'},
    createdAt: {fa: 'ایجاد شده در', en: 'Created at'},
    paidAt: {fa: 'پرداخت شده در', en: 'Paid at'},
    networkName: {fa: 'نام شبکه', en: 'Network name'},
    networkType: {fa: 'نوع شبکه', en: 'Network type'},
    macAddress: {fa: 'آدرس مک', en: 'Mac address'},
    ipAddresses: {fa: 'آدرس‌های آی‌پی', en: 'IP Addresses'},
    showDumpXml: {fa: 'نمایش فایل XML', en: 'Show Dump XML'},

    //vmCommands
    powerOn: {fa: 'روشن کن', en: 'Power On'},
    powerOff: {fa: 'خاموش کن', en: 'Power Off'},
    powerOns: {fa: 'روشن کنید', en: 'Power On'},
    powerOffs: {fa: 'خاموش کنید', en: 'Power Off'},
    doPowerOn: {fa: 'روشن کردن', en: 'Power On'},
    doPowerOff: {fa: 'خاموش کردن', en: 'Power Off'},
    doTurnOff:  {fa: 'از برق کشیدن', en: 'Turn Off'},
    turnOff:  {fa: 'از برق بکش', en: 'Turn Off'},
    pin: {fa: 'اتصال', en: 'Pin'},
    unpin: {fa: 'انفصال', en: 'Unpin'},
    migrate:  {fa: 'مهاجرت', en: 'Migrate'},
    finalizeMigrate:  {fa: 'پایان مهاجرت', en: 'Finalize Migrate'},
    retryAction: {fa: 'تکرار عملیات', en: 'Retry Action'},
    clearBrush: {fa: 'پاک کردن Brush', en: 'Clear Brush'},
    createVM: { fa: 'ایجاد سرور', en: 'Create VPS' },


    //vmBillsPage
    hypervisorVPSOrders: {fa: 'سفارشات سرور مجازی در هایپ', en: 'Hypervisor VPS Orders'},

    //ISO
    iso: {fa: 'ایزو', en: 'ISO'},
    upload: {fa: 'آپلود', en: 'Upload'},
    verify: {fa: 'ارزیابی', en: 'Verify'},
    verified: {fa: 'ارزیابی شده', en: 'Verified'},

    //ListHeader
    show: { fa: 'نمایش', en: 'Show'},

    //Queue Items
    queueItems: { fa: 'آیتم‌های صف', en: 'Queue Items'},

    //Add new user
    bills: { fa: 'صورتحساب‌ها', en: 'The bills'},
    exit: { fa: 'خروج', en: 'Exit'},
    userManagement: { fa: 'مدیریت کاربران', en: 'Manage users'},
    planManagement: { fa: 'مدیریت طرح', en: 'Plan management'},
    settings: { fa: 'تنظیمات', en: 'Settings'},

    //Charts Page
    dateFrom: { fa: 'از تاریخ', en: 'From'},
    dateTo: { fa: 'تا تاریخ', en: 'to'},

    //Choose Plan Page
    selectPlan: { fa: 'انتخاب طرح', en: 'Select a plan'},
    userNums: { fa: 'تعداد کاربران', en: 'Number of users'},

    //NewUserPage
    sampleCsv: {fa: 'دریافت نمونه فایل', en: 'Sample file'},
    fileFormatNotValid: {fa: 'قالب فایل درست نیست', en: 'Format of the file is not valid'},
    emailFormatNotValid: {fa: 'قالب ایمیل درست نیست', en: 'Email format is not valid'},
    userInvitation: { fa: 'افزودن کاربر جدید', en: 'Invite new users'},
    useInvitationGuide: { fa: 'راهنمای دعوت از کاربران جدید', en: 'Guide to invite new users'},
    enterInvitationEmails: {fa: 'برای دعوت از کاربران جدید و افزودن آن‌ها کافی‌است ایمیل کاربران را درون فضا وارد نمایید', en: 'To invite new users and add them, it is enough to enter users email in the textarea'},
    patternSelection: { fa: 'می‌توانید یکی از الگوهای زیر را به‌کار برید', en: 'You can use one of the following patterns' },
    firstPattern: { fa: 'روش اول: جداسازی با ویرگول', en: 'First pattern: Separation using comma' },
    patternText: {fa:
    'در صورتی‌که حجم اختصاصی برای کاربر در نظر دارید می‌توانید مقدار آن را بر حسب گیگابایت جلوی هر ایمیل قرار دهید، در غیر این صورت حجم پیش‌فرض برای آن کاربر در نظر گرفته می‌شود',
        en: 'If you suppose a specific quota for a user, you can put its value in GB after the email, otherwise the default quota for that user will be taken'},
    secondPattern: { fa: 'روش دوم: هر ایمیل در یک سطر', en: 'Second pattern: Each email on a separate line' },
    thirdPattern: { fa: 'روش سوم: آپلود فایل CSV', en: 'Third pattern: Upload CSV file' },
    csvdescription: { fa: 'در این روش شما می توانید در ستون روبروی هر ایمیل یک حجم اختصاصی برای هر فرد انتخاب نمایید. در صورت خالی بودن ستون دوم حجم منظور شده برای کاربر معادل مقدار مفروض اولیه خواهد بود.', en: 'In this way, you can select a specific volume for each person in the column opposite each email. If the second column is empty, the volume for the user will be the same as the initial value.' },
    userQuota: {fa: 'حجم مصرفی کاربر', en: 'User Quota'},
    determineUserQuota: { fa: 'حجم پیش‌فرض را به', en: 'Determine default quota in' },
    determine: { fa: 'تعیین نمایید', en: ' ' },
    csvFileSelect: { fa: 'در صورتی که فایل CSV از ایمیل‌ها به صورت آماده دارید، آن را انتخاب نمایید', en: 'If you have a CSV file ready for the mail, select it' },
    csvPlaceHolder: { fa: 'ایمیل‌ها را به صورت دستی و یا با ارائه فایل CSV در اینجا وارد نمایید', en: 'Enter emails manually or by submitting a CSV file here'},
    sendInvitationEmail: { fa: 'افزودن کاربران جدید', en: 'Send invitation emails' },
    newUserInvitation: { fa: 'دعوت کاربران جدید', en: 'Invite new users' },
    addAdmin: { fa: 'افزودن مدیر به گروه', en: 'Add admin to the group' },
    groupMembership: { fa: 'شما عضو گروه هستید', en: 'You are a member of the group' },
    changeUserQuota: { fa: 'تغییر حجم کاربر', en: 'Change user quota' },
    addcsvfilehere: { fa: 'آپلود فایل حاوی آدرس ایمیل ها', en: 'Upload the file containing the email address' },
    Initialvolumeforallusers: { fa: 'حجم مفروض اولیه برای تمامی کاربران', en: 'Initial volume for all users' },
    Enteremailaddress: { fa: 'وارد کردن آدرس ایمیل ها', en: 'Enter email address' },
    Howtoaddnewusers: { fa: 'نحوه اضافه کردن کاربران جدید', en: 'How to add new users' },
    invitenewusersdocument: { fa: 'برای دعوت از کاربران جدید ابتدا یک حجم مفروض اولیه برای تمامی کاربران تعیین نموده و سپس آدرس ایمیل افراد را به یکی از سه روش زیر در فضای مربوطه وارد نمایید.', en: 'To invite new users, first set an initial preset volume for all users, and then enter the email address of the person in one of the following three ways in the corresponding space.' },










    is: { fa: 'است', en: ' ' },
    are: { fa: 'هستند', en: ' ' },
    selectFile: { fa: 'انتخاب فایل', en: 'Select file'},
    member: { fa: 'عضو', en: 'Member'},

    //Plans
    addPlans: { fa: 'افزودن طرح', en: 'Add plan'},

    //plan
    memberCountOverFlowed: { fa: 'تعداد کاربران از حداقل کاربران تعریف شده طرح انتخابی کمتر است', en: 'The number of users is less than the minimum defined for the plan'},

    //PlanPage
    billPayment: {fa: 'پرداخت صورتحساب', en: 'Bill payment'},
    billPaymentMSG1: { fa: 'صورتحساب با موفقیت ایجاد شد. برای مشاهده و پرداخت پیش فاکتور به بخش', en: 'Billing is successfully created. To view and pay the pre-invoice, see the' },
    referTo: { fa: 'مراجعه فرمایید.', en: 'section' },
    leastUserCount: { fa: 'حداقل کاربر', en: 'Minimum user count'},
    userCount: {fa: 'تعداد کاربران', en: 'User count'},
    remainedUserCount: {fa: 'تعداد کاربران قابل افزایش', en: 'Remained User count'},
    planType: { fa: 'نوع طرح', en: 'Plan type'},
    rialsPerNewUser: { fa: 'ریال به ازای هر کاربر جدید', en: 'IRR per new user'},
    extendPlan: { fa: 'تمدید طرح', en: 'Extend plan'},
    buyPlan: { fa: 'خرید طرح', en: 'Buy plan'},
    upgradePlan: { fa: 'ارتقاء طرح', en: 'Upgrade plan'},
    yourPlan: {fa: 'طرح فعال شما', en: 'Your Plan'},
    quota: { fa: 'حجم', en: 'Quota'},
    remainedQuota: {fa: 'حجم باقیمانده', en: 'Remained Quota'},
    vm: { fa: 'سرور مجازی', en: 'VPS' },

    //Table headers
    thfrom: {fa: 'از', en: 'From'},
    thto: {fa: 'تا', en: 'to'},
    thproductname: { fa: 'نام محصول', en: 'Product name'},
    thcreatedate: { fa: 'تاریخ ایجاد', en: 'Create date' },
    thpaiddate: { fa: 'تاریخ پرداخت', en: 'Paid date' },
    thstate: { fa: 'وضعیت', en: 'State' },
    thperiod: { fa: 'دوره زمانی', en: 'Period' },
    thpreSerial: { fa: 'سریال پیش فاکتور', en: 'PreSerial' },
    thserial: { fa: 'سریال فاکتور', en: 'Serial' },
    thpayIdentifier: { fa: 'شناسه پرداخت', en: 'Pay Identifier' },
    thstartdate: { fa: 'تاریخ شروع', en: 'Start date' },
    thenddate: { fa: 'تاریخ پایان', en: 'End date' },
    thvmstate: { fa: 'حالت سیستم', en: 'Vmstate' },
    thvmbill: { fa: 'پیش‌نویس VPS', en: 'Vmbill' },
    thvm: { fa: 'سرور ‌مجازی', en: 'VPS' },
    thcreated: { fa: 'تاریخ ایجاد', en: 'Created date' },
    thsource: { fa: 'منبع', en: 'Source' },
    thdestination: { fa: 'مقصد', en: 'Destination' },
    thdeposit: { fa: 'سپرده', en: 'Deposit' },
    thwithdraw: { fa: 'برداشت از حساب', en: 'Withdraw' },
    threfCode: { fa: 'شماره ارجاع', en: 'RefCode' },
    thvmname: { fa: 'نام سرور مجازی', en: 'VPS name' },
    thdiscount: { fa: 'تخفیف', en: 'Discount' },
    thgroupname: { fa: 'نام گروه', en: 'GroupName' },
    thinvoices: { fa: 'صورتحساب‌ها', en: 'Invoices' },
    thquota: { fa: 'حجم', en: 'quota' },
    thmembercount: { fa: 'تعداد اعضای گروه', en: 'MemberCount' },
    thplanname: { fa: 'نام طرح', en: 'PlanName' },
    thadminname: { fa: 'نام مدیر', en: 'AdminName' },
    thpaid: { fa: 'پرداخت شده', en: 'Paid' },
    thstatus: { fa: 'وضعیت', en: 'Status' },
    thIP: { fa: 'آی‌پی', en: 'IP' },
    thtype: { fa: 'نوع', en: 'Type' },
    thVmName: { fa: 'نام سرور مجازی', en: 'VPS Name' },
    thprice: {fa: 'قیمت', en: 'Price'},
    thcpu: { fa: 'پردازنده', en: 'CPU' },
    thram: { fa: 'حافظه', en: 'RAM' },
    thdisk: { fa: 'دیسک', en: 'Disk' },
    thos: { fa: 'سیستم عامل', en: 'OS' },
    thsysname: { fa: 'نام سیستم', en: 'SysName' },
    thdescription: { fa: 'توضیحات', en: 'Description' },
    thusername: { fa: 'نام کاربر', en: 'Username' },
    thname: { fa: 'نام', en: 'Name' },
    thcategory: { fa: 'دسته', en: 'Category' },
    thdefault: { fa: 'پیش فرض', en: 'Default' },
    thuiVisible: { fa: 'قابل مشاهده', en: 'UI Visible' },
    thactive: { fa: 'فعال', en: 'Active' },
    thbalance: { fa: 'اعتبار', en: 'Balance' },
    themail: { fa: 'ایمیل', en: 'Email' },
    thmobile: { fa: 'تلفن همراه', en: 'Mobile' },
    thverified: { fa: 'تایید شده', en: 'Verified' },
    thverifycode: { fa: 'کد تایید', en: 'Verify code' },
    thenabled: { fa: 'فعال', en: 'Enabled' },
    thauthorized: { fa: 'معتبر', en: 'Authorized' },
    thusertype: { fa: 'نوع کاربر', en: 'User type' },
    thcustomertype: { fa: 'نوع مشتری', en: 'Customer type' },
    thlanguage: { fa: 'زبان', en: 'Language' },
    thpayable: { fa: 'قابل پرداخت', en: 'Payable' },

    //Modal titles
    modalTitleUpdatePass: { fa: 'به‌روز‌رسانی رمزعبور', en: 'Update Password' },
    modalTitleRemoveHype: { fa: 'حذف هایپ', en: 'Remove hypervisor' },
    modalTitleUploadISO: { fa: 'بارگذاری ایزو', en: 'Upload ISO' },
    modalTitleDeleteISO: { fa: 'حذف ایزو', en: 'Delete ISO' },
    modalTitleDeleteBackup: { fa: 'حذف فایل پشتیبان', en: 'Delete Backup' },
    modalTitleRestoreBackup: { fa: 'بازیابی فایل پشتیبان', en: 'Restore Backup' },
    modalTitleRetryCreateVM: { fa: 'تلاش مجدد برای ایجاد سرور مجازی', en: 'Retry Create VPS' },
    modalTitleClearVMBrush: { fa: 'پاک سازی brush  سرور مجازی', en: 'Clear VPS Brush' },
    modalTitlePinVM: { fa: 'اتصال سرور مجازی به هایپ', en: 'Pin VPS' },
    modalTitleUnpinVM: { fa: 'قطع اتصال سرور مجازی از هایپ', en: 'UnPin VPS' },
    modalTitleMigrateVM: { fa: 'مهاجرت سرور مجازی', en: 'Migrate VPS' },
    modalTitleFinalizeMigrateVM: { fa: 'اتمام VPS Migration', en: 'Finalize VPS Migration' },
    modalTitleDeleteVM: { fa: 'حذف سرور مجازی', en: 'Delete VPS' },
    modalTitleVMIsON: { fa: 'سرور مجازی در حال حاضر روشن است', en: 'VPS is On' },
    modalTitleRenewVM: { fa: 'تمدید سرور مجازی', en: 'Renew VPS' },
    modalTitleCreateVM: { fa: 'ایجاد سرور مجازی', en: 'Create VPS' },
    modalTitleTurnOffVM: { fa: 'سرور مجازی را از برق بکش', en: 'Turnoff VPS' },
    modalTitleDeleteProductFeature: { fa: 'حذف Product Feature', en: 'Delete Product Feature' },
    modalTitleAddProductFeature: { fa: 'افزودن Product Feature', en: 'Add Product Feature' },
    modalTitleExportFile: { fa: 'فایل خروجی', en: 'Export File' },
    modalTitleAddVM: { fa: 'افزودن محصول', en: 'Add Product' },
    modalTitleAddHypervisor: { fa: 'افزودن هایپ', en: 'Add Hypervisor' },
    modalTitleCreateBackup: { fa: 'ایجاد فایل پشتیبان', en: 'Create Backup' },
    modalTitleUpdateVMLastInvoice: { fa: 'به‌روز رسانی آخرین صورتحساب', en: 'Update VPS Last Invoice' },
    modalTitleUpdateBalance: { fa: 'به‌روزرسانی اعتبار', en: 'Update Balance' },

    //Place holders
    searchUsernameOremail: { fa: 'نام کاربری یا ایمیل را جستجو کن', en: 'Search username or email'},
    searchPlanName: { fa: 'نام طرح را جستجو کن', en: 'Search plan name' },

    //TrGroupUser
    enterUserAccount: { fa: 'ورود به حساب کاربر', en: 'Enter user account' },
    deactivate: { fa: 'غیرفعال‌ سازی', en: 'Deactivate' },
    activate: { fa: 'فعال‌ سازی', en: 'Activate' },
    resendEmailInvitation: { fa: 'ارسال مجدد دعوت‌نامه', en: 'Resend invitation email' },
    deleteUser: { fa: 'حذف کاربر', en: 'Delete user' },

    //formFields
    isoName: { fa: 'نام فایل ایزو', en: 'ISO Name' },
    isoURL: { fa: 'لینک ایزو', en: 'ISO Url' },
    checksumMD5: { fa: 'Checksum MD5', en: 'Checksum MD5' },
    password: { fa: 'رمز عبور', en: 'Password' },
    hypeName: { fa: 'نام هایپ', en: 'Hypervisor Name' },
    ipAddress: { fa: 'آدرس آی‌پی', en: 'IP Address' },
    validIPAddress: { fa: 'آدرس آی‌پی معتبر', en: 'Valid IP Address' },
    cpuCores: { fa: 'هسته‌های پردازنده', en: 'CPU Cores' },
    zfsArrayName: { fa: 'نام آرایه ZFS', en: 'ZFS Array Name' },
    location: { fa: 'محل', en: 'Location' },
    fromDate: { fa: 'از تاریخ', en: 'From Date' },
    toDate: { fa: 'تا تاریخ', en: 'To Date' },
    dueDate: { fa: 'تاریخ تحویل', en: 'Due Date' },
    payStatus: { fa: 'وضعیت پرداخت', en: 'Pay Status' },
    addBalance: { fa: 'افزودن اعتبار', en: 'Add Balance' },
    newBalance: { fa: 'اعتبار جدید', en: 'New Balance' },
    verifyCode: { fa: 'کد تایید', en: 'Verify code' },
    authorized: { fa: 'معتبر', en: 'Authorized' },
    refCode: { fa: 'کد ارجاع', en: 'Ref Code' },
    productName: { fa: 'نام محصول', en: 'Product name' },
    startDateFrom: { fa: 'تاریخ شروع (از)', en: 'Start date (from)' },
    startDateTo: { fa: 'تاریخ شروع (تا)', en: 'Start date (to)' },
    endDateFrom: { fa: 'تاریخ پایان (از)', en: 'End date (from)' },
    endDateTo: { fa: 'تاریخ پایان (تا)', en: 'End date (to)' },
    paidDateFrom: { fa: 'تاریخ پرداخت (از)', en: 'Paid date (from)' },
    paidDateTo: { fa: 'تاریخ پرداخت (تا)', en: 'Paid date (to)' },
    createdDateFrom: { fa: 'تاریخ ایجاد (از)', en: 'Created date (from)' },
    createdDateTo: { fa: 'تاریخ ایجاد (تا)', en: 'Created date (to)' },
    payablePrice: { fa: 'قیمت قابل پرداخت', en: 'Payable Price' },
    trackNo: { fa: 'شماره پیگیری', en: 'Track No' },
    vmState: { fa: 'حالت سیستم', en: 'VPS State' },
    priceInfo: { fa: 'اطلاعات قیمت', en: 'Price Info' },
    jsonInfo: { fa: 'اطلاعات Json', en: 'Json Info' },
    featureInfo: { fa: 'Feature Info', en: 'Feature Info' },
    productFeature: { fa: 'Product Feature', en: 'Product Feature' },
    type: { fa: 'نوع', en: 'Type' },
    required: { fa: 'ضروری', en: 'Required' },
    componentOrder: { fa: 'ترتیب', en: 'Component Order' },
    frequencyMeasure: { fa: 'اندازه تکرار', en: 'Frequency Measure' },
    valueApplication: { fa: 'ارزش مقدار', en: 'Value Application' },
    title: { fa: 'عنوان', en: 'Title' },
    calculationType: { fa: 'نوع محاسبه', en: 'Calculation Type' },
    lowerBound: { fa: 'کران پایین', en: 'Lower Bound' },
    upperBound: { fa: 'کران بالا', en: 'Upper Bound' },
    value: { fa: 'مقدار', en: 'Value' },
    value2: { fa: 'مقدار ۲', en: 'Value2' },
    editProduct: { fa: 'ویرایش محصول', en: 'Edit Product' },
    addProductFeatureApplicability: { fa: 'افزودن Product feature applicability', en: 'Add Product feature applicability' },

    //Commands
    commands: { fa: 'دستورات اجرایی', en: 'Commands' },

    //AdminEntities
    productInvoiceRejection: { fa: 'صورتحساب محصول با موفقیت لغو شد', en: 'Product invoice is successfully rejected' },
    productUpdateSuccess: { fa: 'Product با موفقیت به‌روز شد', en: 'The Product is successfully updated' },
    productDefinitionSuccess: { fa: 'Product جدید با موفقیت تعریف شد', en: 'The new Product is successfully defined' },
    featureApplicabilityUpdate: { fa: 'Product feature applicability با موفقیت به‌روز شد', en: 'The Product feature applicability is successfully updated' },
    featureApplicabilityDefinition: { fa: 'Product feature applicability جدید با موفقیت تعریف شد', en: 'The new Product feature applicability is successfully defined' },
    priceComponentUpdate: { fa: 'Price component با موفقیت به‌روز شد', en: 'The Price component is successfully updated' },
    priceComponentDefinition: { fa: 'Price component جدید با موفقیت تعریف شد', en: 'The new Price component is successfully defined' },
    quantityBreakUpdate: { fa: 'Quantity break با موفقیت به‌روز شد', en: 'The Quantity break is successfully updated' },
    quantityBreakDefinition: { fa: 'Quantity break جدید با موفقیت تعریف شد', en: 'The new Quantity break is successfully defined' },
    productFeatureDefinitionSuccess: { fa: 'Product Feature جدید با موفقیت تعریف شد', en: 'The new product feature is successfully defined' },
    productFeatureDeleteSuccess: { fa: 'Product feature applicability با موفقیت حذف شد', en: 'The Product feature applicability is successfully deleted' },
    priceComponentDeleteSuccess: { fa: 'Price component با موفقیت حذف شد', en: 'The Price component is successfully deleted' },
    quantityBreakDeletSuccess: { fa: 'Quantity break با موفقیت حذف شد', en: 'The Quantity break is successfully deleted' },
    productDeleteSuccess: { fa: 'Product با موفقیت حذف شد', en: 'The Product is successfully deleted' },
    producFeatureDeleteSuccess: { fa: 'Product Feature با موفقیت حذف شد', en: 'The product feature is successfully deleted' },
    systemAuthorizationActivationSuccess: { fa: 'اعتبارسنجی سیستم با موفقیت فعال شد', en: 'System authorization is successfully activated' },
    systemAuthorizationDeactivationSuccess: { fa: 'اعتبارسنجی سیستم با موفقیت غیر فعال شد', en: 'System authorization is successfully deactivated' },
    userActivationSuccess: { fa: 'کاربر با موفقیت فعال شد', en: 'User is successfully activated' },
    userDeactivationSuccess: { fa: 'کاربر با موفقیت غیر فعال شد', en: 'User is successfully deactivated' },
    addNewGroupSuccess: { fa: 'گروه جدید با موفقیت افزوده شد', en: 'New group is successfully added' },
    upgradeGroupSuccess: { fa: 'گروه با موفقیت ارتقا یافت', en: 'Group is successfully upgrated' },
    productInvoicePaidSuccess: { fa: 'صورتحساب محصول با موفقیت پرداخت شد', en: 'Product invoice is successfully paid' },
    updateUserBalanceSuccess: { fa: 'اعتبار کاربر با موفقیت به‌روز شد', en: 'User balance is successfully updated' },
    deleteVMSuccess: { fa: 'سرور‌مجازی با موفقیت حذف شد', en: 'VPS is successfully deleted' },
    queueDeleteVMSuccess: { fa: 'سرور‌مجازی با موفقیت از صف حذف شد', en: 'VPS is successfully removed from queue' },
    renewVM: { fa: 'سرور‌ مجازی با موفقیت تمدید شد', en: 'VPS is successfully renewed' },
    removeVMBrushSuccess: { fa: 'Brush سرور مجازی با موفقیت حذف شد', en: 'VPS Brush is successfully removed' },
    vmCreationSuccess: { fa: 'سرور مجازی با موفقیت ایجاد شد', en: 'VPS is successfully created' },
    updatePasswordSuccess: { fa: 'رمز عبور با موفقیت به‌روز شد', en: 'Password is successfully updated' },
    isoVerificationSuccess: { fa: 'فایل ایزو با موفقیت ارزیابی شد', en: 'ISO is successfully verified' },
    hypDefinitionSuccess: { fa: 'هایپ جدید با موفقیت تعریف شد', en: 'The new hypervisor is successfully defined' },
    deleteHypSuccess: { fa: 'هایپ با موفقیت حذف شد', en: 'Hypervisor is successfully deleted' },
    deleteISOSuccess: { fa: 'ایزو با موفقیت حذف شد', en: 'ISO is successfully deleted' },
    uploadISOSuccess: { fa: 'ایزو با موفقیت بارگذاری شد', en: 'ISO is successfully uploaded' },
    updateInvoiceSuccess: { fa: 'صورتحساب با موفقیت به‌روز شد', en: 'Invoice successfully updated' },
    pinVMSuccess: { fa: 'سرور مجازی با موفقیت به هایپ متصل شد', en: 'VPS is successfully pinned' },
    unpinVMSuccess: { fa: 'اتصال سرور مجازی با هایپ با موفقیت جدا شد', en: 'VPS is successfully unpinned' },
    startVMMigration: { fa: 'مهاجرت سرور مجازی آغاز شد', en: 'VPS migration started' },
    finalizeVMMigration: { fa: 'مهاجرت سرور مجازی با موفقیت پایان پذیرفت', en: 'VPS migration is successfully finalized' },
    retryVMCreateSuccess: { fa: 'تلاش مجدد برای ایجاد سرور مجازی با موفقیت انجام شد', en: 'Retry create VPS is successfully done' },
    makeVMBackupSuccess: { fa: 'نسخه پشتیبان از سرور مجازی با موفقیت ساخته شد', en: 'Backup of VPS is successfully made' },
    deleteVMBackupSuccess: { fa: 'نسخه پشتیبان از سرور مجازی با موفقیت حذف شد', en: 'Backup of VPS is successfully deleted' },
    restoreVMBackupSuccess: { fa: 'نسخه پشتیبان از سرور مجازی با موفقیت بازیابی شد', en: 'Backup of VPS is successfully restored' },
    didNotExecuteCorrectly: { fa: 'به درستی اجرا نشد', en: 'did not execute correctly' },
    isDoneSuccessfully: { fa: 'با موفقیت انجام شد', en: 'is successfully done' },
    isSuccessfully: { fa: 'با موفقیت', en: 'is successfully' },
    ed: { fa: 'است', en: 'ed' },
    setDefaultCategory: { fa: 'قبلا به صورت پیش‌فرض در نظر گرفته شده است برای دسته', en: 'is already set as default for category' },
    vmOf:  {fa: 'سرور مجازی را', en: 'VPS'},


    //BusinessEntities
    sendInvitationEmailSuccess: { fa: 'ایمیل دعوت‌نامه کاربر با موفقیت ارسال شد', en: 'Email invitation is successfully sent' },
    deleteUserSuccess: { fa: 'کاربر با موفقیت حذف شد', en: 'User is successfully deleted' },
    transferToUserAccountSuccess: { fa: 'انتقال به حساب کاربر با موفقیت انجام شد', en: 'Transfer to user account is successfully done' },
    changeUserQuotaSuccess: { fa: 'حجم کاربر با موفقیت تغییر یافت', en: 'The user quota is successfully changed' },
    userEnabledSuccess: { fa: 'فعال‌سازی کاربر با موفقیت انجام شد', en: 'User is successfully activated' },
    userDisableSuccess: { fa: 'غیرفعال‌سازی کاربر با موفقیت انجام شد', en: 'User is successfully deactivated' },
    addAdminToGroupSuccess: { fa: 'مدیر گروه با موفقیت به گروه افزوده شد', en: 'Admin is successfully added to the group' },
    sendUsersInvitationSuccess: { fa: 'دعوت نامه کاربران با موفقیت ارسال شد', en: 'User invitations are successfully sent' },
    sendConfirmRequestSuccess: { fa: 'درخواست تایید با موفقیت ارسال شد', en: 'Confirm request is successfully sent'},

    //innertexts
    sureToDeletehyp: { fa: 'آیا مطمئن به حذف هایپ', en: 'Are you sure you want to remove the Hypervisor' },
    questionMark0: { fa: '؟', en: '?' },
    questionMark: { fa: ' هستید؟', en: '?' },
    sureToDeleteISOFile: { fa: 'آیا مطمئن به حذف فایل ایزو', en: 'Are you sure you want to delete the ISO file' },
    sureToDeleteBackupFile: { fa: 'آیا مطمئن به حذف فایل پشتیبانی', en: 'Are you sure you want to delete the backup file' },
    sureToDeleteRestoreFile: { fa: 'آیا مطمئن به بازیابی فایل پشتیبانی', en: 'Are you sure you want to restore the backup file' },
    retryCreateVM: { fa: 'آیا مطمئن هستید که می‌خواهید برای ایجاد سرور مجازی مجددا تلاش کنید؟', en: 'Are you sure you want to retry create VPS?' },
    sureToDeleteVMBrush: { fa: 'آیا مطمئن هستید که می‌خواهید brush سرور مجازی را پاک کنید؟', en: 'Are you sure you want to clear VPS brush?' },
    sureToPinVMToHyp: { fa: 'آیا مطمئن هستید که می‌خواهید سرور مجازی را به هایپ متصل کنید؟', en: 'Are you sure you want to pin the VPS to the hypervisor?' },
    sureToUnpinVMFromHyp: { fa: 'آیا مطمئن هستید که می‌خواهید سرور مجازی را از هایپ جدا کنید؟', en: 'Are you sure you want to unpin VPS from the hypervisor?' },
    sureToFinalizeMigration: { fa: 'آیا مطمئن هستید که می‌خواهید مهاجرت نهایی را انجام دهید؟', en: 'Are you sure you want to finalize the migration?' },
    sureToRemoveVM: { fa: 'آیا مطمئن هستید که می‌خواهید سرور‌مجازی را حذف کنید؟', en: 'Are you sure you want to delete VPS?' },
    cannotDeleteTurnedOFF: { fa: 'سرور مجازی را نمی‌توان حذف کرد چون خاموش نشده است', en: 'VPS cannot be deleted as it is not turned off' },
    sureToRenewVM: { fa: 'آیا مطمئن هستید که می‌خواهید سرور مجازی را تمدید کنید؟', en: 'Are you sure you want to renew VPS?' },
    sureToCreateVM: { fa: 'آیا مطمئن هستید که می‌خواهید سرور مجازی ایجاد کنید؟', en: 'Are you sure you want to create VPS?' },
    sureToPower: { fa: 'آیا مطمئن هستید که می‌خواهید', en: 'Are you sure you want to' },
    sureToTurnOffVM: { fa: 'آیا مطمئن هستید که می‌خواهید سرور مجازی را کامل خاموش کنید؟', en: 'Are you sure you want to turn off VPS?' },
    validdeleteUserSuccess: { fa: 'کاربر با موفقیت حذف شد', en: 'User is successfully deleted' },
    sureToDelete: { fa: 'آیا مطمئن به حذف', en: 'Are you sure you want to delete' },
    sureToDeleteProducFeature: { fa: 'آیا مطمئن به حذف Product Feature', en: 'Are you sure you want to delete product feature' },
    sureToMakeBackupFile: { fa: 'آیا مطمئن به ایجاد فایل پشتیبان هستید؟', en: 'Are you sure you want to make a backup file?' },

    //VMStatus
    renew: { fa: 'تمدید', en: 'Renew'},
    activePrepid: { fa: 'فعال', en: 'Active' },
    pendingRenew: { fa: 'در انتظار تمدید', en: 'Pending Renew' },
    expired: { fa: 'منقضی', en: 'Expired' },

    //BillingPage
    noInvoiceForYou: {fa: 'شما صورتحسابی برای پرداخت ندارید', en: 'You don\'t have any invoice to pay'},
    createdDate: {fa: 'تاریخ ایجاد', en: 'Created Date'},
    approvedAtDate: {fa: 'تاریخ پرداخت', en: 'Approved Date'},
    state: {fa: 'وضعیت', en: 'State'},
    onlinePayment: {fa: 'پرداخت آنلاین', en: 'Online Payment'},
    offlinePayment: {fa: 'پرداخت آفلاین', en: 'Offline Payment'},
    submitPaidDate: {fa: 'ثبت تاریخ پرداخت', en: 'Submit Paid Date'},
    confirmRequest: {fa: 'درخواست تایید', en: 'Confirm Request'},

    //BusinessInvoicePage
    printSave: {fa: 'چاپ/ذخیره', en: 'Print/Save'},
    preInvoice: {fa: 'پیش فاکتور', en: 'PreInvoice'},

    //BusinessInvoice
    companyName: {fa: 'نام شرکت', en: 'Name'},
    fullAddress: {fa: 'نشانی کامل', en: 'Full Address'},
    privatelyHeld: {fa: 'سهامی خاص', en: 'Privately held'},
    limitedResponsibility: {fa: 'مسؤولیت محدود', en: 'Limited Responsibility'},
    sellingGoodsAndServices: {fa: 'فروش کالا و خدمات', en: 'Goods and Services Sale'},
    serialNo: {fa: 'شماره سریال', en: 'Serial No.'},
    orderNo: {fa: 'شماره سفارش', en: 'Order No.'},
    invoiceDate: {fa: 'تاریخ صدور', en: 'Invoice Date'},
    dueDate: {fa: 'تاریخ اعتبار', en: 'Due Date'},
    dealerInformation: {fa: 'مشخصات فروشنده', en: 'Dealer Information'},
    customerInformation: {fa: 'مشخصات خریدار', en: 'Customer Information'},
    dealItemInformation: {fa: 'مشخصات کالا و یا خدمات مورد معامله', en: 'Deal Item Information'},
    productCode: {fa: 'کد کالا', en: 'Product Code'},
    count: {fa: 'تعداد', en: 'Count'},
    amount: {fa: 'مقدار', en: 'Amount'},
    unitOfMeasurement: {fa: 'واحد اندازه گیری', en: 'Unit of Measurement'},
    unitPrice: {fa: 'مبلغ واحد', en: 'Unit Price'},
    totalPrice: {fa: 'مبلغ کل', en: 'Total Price'},
    discountPrice: {fa: 'مبلغ تخفیف', en: 'Discount Price'},
    totalPriceAfterDiscount: {fa: 'مبلغ کل پس از تخفیف', en: 'Total Price After Discount'},
    tax: {fa: 'جمع مالیات و عوارض', en: 'Tax'},
    totalPrice: {fa: 'جمع کل', en: 'Total'},
    totalPricePlusTax: {fa: 'جمع مبلغ کل بعلاوه مالیات و عوارض', en: 'Total Price plus Tax'},
    itemOrServiceDescription: {fa: 'شرح کالا یا خدمت', en: 'Item or Service Description'},
    saleTermsAndConditions: {fa: 'شرایط و نحوه فروش', en: 'Sale Terms and Conditions'},
    nonCash: {fa: 'غیر نقدی', en: 'Non Cash'},
    cash: {fa: 'نقدی', en: 'Cash'},
    productId: {fa: 'شناسه محصول', en: 'Product Id'},
    saleDescription: {fa: 'توضیحات', en: 'Description'},
    dealerStampAndSignature: {fa: 'مهر و امضا فروشنده', en: 'Dealer Stamp and Signature'},
    customerStampAndSignature: {fa: 'مهر و امضا خریدار', en: 'Customer Stamp and Signature'},
    note: {fa: 'توجه', en: 'Note'},
    invoiceNoteDescription: {fa: 'قیمت های اعلام شده ۱۵ روز معتبر است. لطفا در صورت انقضای مهلت مذکور، پیش از پرداخت، از عدم تغییر قیمت ها اطمینان حاصل فرمایید',
      en: 'ُThe stated prices are valid for 15 days. Please be sure the prices have not changed before your payment if the expiration date is passed'},

    // UsersPage
    cadminusers: {fa: 'نمایندگان شرکت', en: 'Company admins'},
    enduserusers: {fa: 'کارمندان', en: 'End users'},

    //persiangig
    persiangigCompany: {fa: 'شرکت ابرافراز شریف', en: 'PersianGig'},
    persiangigAddress: {fa: 'خیابان حبیب اللهی، بالاتر از میدان حسن حسینی، پلاک ۲۶۳، واحد ۲', en: ''},

    //Irancell
    irancellCompany: {fa: 'شرکت خدمات ارتباطی ایرانسل', en: 'Irancell Telecommunications Services Company'},
    irancellAddress: {fa: 'میدان هروی، بلوار برادران پناهی نیا، خ زندی، ک قادری، ک علی دوست، پ ۵', en: 'No. 5, Alidoust Alley, Qaderi St., Zandi St., Shahid Panahinia St., Heravi Sq.'},
    tehran: {fa: 'تهران', en: 'Tehran'},

    //NoAccess
    noaccess: {fa: 'دسترسی شما هنوز در سامانه تعریف نشده است', en: 'Your access is not defined in the system yet'},

    UserUsers: {fa: 'کاربران گروه', en: 'Group Users'},
    adminName: {fa: 'مدیر گروه', en: 'Group Admin'},
    changePassword: {fa: 'تغییر گذرواژه', en: 'Change Password'},
    currentPassword: {fa: 'گذرواژه', en: 'Old Password'},
    newPassword: {fa: 'گذرواژه جدید', en: 'New Password'},
    passwordIsNotStrong: {fa: 'گذرواژه جدید قوی نیست', en: 'New Password is not strong'},
    changePasswordSuccess: {fa: 'گذرواژه با موفقیت تغییر یافت', en: 'Password is successfully changed'},
    userProfileProblem: {fa: 'اطلاعات پروفایل کاربر هنوز کامل نشده است', en: 'User profile information is not completed yet'},
    allUsers: {fa: 'همه کاربران', en: 'All users'},
    businessUsers: {fa: 'نمایندگان شرکت', en: 'Business'},
    individualUsers: {fa: 'اشخاص', en: 'Individual'},
    registrationDate: {fa: 'تاریخ عضویت', en: 'Registration Date'},

    isEnabled: {fa: 'فعال', en: 'Enabled'},
    isRegistered: {fa: 'ثبت‌نام', en: 'Registered'},
    hasProfile: {fa: 'پروفایل', en: 'Profile'},
    isAuthorized: {fa: 'تایید', en: 'Authorized'},
    hasPlan: {fa: 'طرح', en: 'Plan'},
    invoiceStatusTitle: {fa: 'وضعیت فاکتور', en: 'Invoice status'},
    planIsActive: {fa: 'طرح فعال است', en: 'Plan is active'},
    planIsInactive: {fa: 'طرح فعال نیست', en: 'Plan is inactive'},
    repetitiveEmails: {fa: 'ایمیل‌های تکراری', en: 'Repetitive emails'},
    activationDate: {fa: 'تاریخ فعال‌سازی', en: 'Activation date'},
    endDate: {fa: 'تاریخ پایان طرح', en: 'End date'},
    freePlan: {fa: 'طرح ۱ برای کسانی که در طول مدت نمایشگاه الکامپ در غرفه ایرانسل ثبت نام می‌کنند، رایگان است',
    en: 'Plan 1 is free only for those who registered for Irancell during Elecomp exhibition'},
    usersCount: {fa: 'تعداد کاربران', en: 'Users count'},
    ones: {fa: 'نفر', en: 'ones'},
    totalCapacity: {fa: 'ظرفیت کل', en: 'Total capacity is'},
    accessedQuota: {fa: 'کل حجم در دسترس', en: 'Total accessible quota is'},
    quotaIsInvalid: {fa: 'حجم وارد شده معتبر نیست', en: 'Quota is invalid'},


    // : {fa: '', en: ''},
  }
}
