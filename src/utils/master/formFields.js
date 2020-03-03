import { language, ln, dir, swip, } from '../language'
export const formFields =
{
  uploadISO: [
    {
      name: 'isoname',
      displayName: 'isoName',
      isRequired: true,
    },{
      name: 'isourl',
      displayName: 'isoURL',
      isRequired: true,
    },{
      name: 'isomd5',
      displayName: 'checksumMD5',
    },
  ],
  updatePassword: [
    {
      name: 'password',
      displayName: 'password',
      type: 'password',
      isRequired: true,
    },
  ],
  addHyp: [
    {
      name: 'hypName',
      displayName: 'hypeName',
      isRequired: true,
    },{
      name: 'ipAddress',
      displayName: 'ipAddress',
      isRequired: true,
    },{
      name: 'validIPAddress',
      displayName: 'validIPAddress',
      isRequired: true,
    },{
      name: 'cpuCores',
      displayName: 'cpuCores',
      type: 'number',
      isRequired: true,
    },{
      name: 'ram',
      displayName: 'ram',
      type: 'number',
      placeholder: 'GB',
      isRequired: true,
    },{
      name: 'zfs',
      displayName: 'zfsArrayName',
      placeholder: 'ci08',
      isRequired: true,
    },{
      name: 'location',
      displayName: 'location',
      type: 'select',
      isRequired: true,
    }
  ],
  migrateVm: [
    {
      name: 'hyp',
      type: 'select',
      displayName: 'hypervisor',
      isNullRequired: true,
      isRequired: true,
    }
  ],
  updateVmInvoice: [
    {
      name: 'totalPrice',
      type: 'number',
      displayName: 'price',
      isRequired: true,
    },
    {
      name: 'from',
      type: 'date',
      displayName: 'fromDate',
      isRequired: true,
    },
    {
      name: 'to',
      type: 'date',
      displayName: 'toDate',
      isRequired: true,
    },
    {
      name: 'dueDate',
      type: 'date',
      displayName: 'dueDate',
      isRequired: true,
    },
    {
      name: 'paid',
      type: 'select',
      displayName: 'payStatus',
      isRequired: true,
    }
  ],
  updateBalance: [
    {
      name: 'balance',
      type: 'number',
      displayName: 'addBalance',
      placeholder: 'IRR',
      isRequired: true,
    },
    {
      name: 'defaultBalance',
      type: 'label',
      displayName: 'newBalance',
    }
  ],
  searchUsers: [
    {
      name: 'username',
      searchParam: 'username',
      displayName: 'username',
    },
    {
      name: 'displayName',
      searchParam: 'displayName',
      displayName: 'name',
    },
    {
      name: 'email',
      searchParam: 'email',
      displayName: 'email',
    },
    {
      name: 'mobileNumber',
      type: 'number',
      searchParam: 'mobileNumber',
      displayName: 'mobile',
    },
    {
      name: 'enabled',
      type: 'select',
      isNullRequired: true,
      searchParam: 'enabled',
      displayName: 'enabled',
    },
    {
      name: 'authorized',
      type: 'select',
      isNullRequired: true,
      searchParam: 'authorized',
      displayName: 'authorized',
    },
    {
      name: 'customerType',
      type: 'select',
      isNullRequired: true,
      searchParam: 'profile.customerType',
      displayName: 'customerType'
    },
  ],
  searchCadminUsers: [
    {
      name: 'id',
      searchParam: 'id',
      displayName: 'profileId',
    },
    {
      name: 'companyNationalCode',
      searchParam: 'profile.companyNationalCode',
      displayName: 'companyNationalCode',
    },
    {
      name: 'company',
      searchParam: 'profile.company',
      displayName: 'companyName',
    },
    {
      name: 'username',
      searchParam: 'username',
      displayName: 'username',
    },
    {
      name: 'nationalId',
      searchParam: 'profile.nationalId',
      displayName: swip('nationalId', 'cadmin'),
    },
    {
      name: 'displayName',
      searchParam: 'displayName',
      displayName: swip('name', 'cadmin'),
    },
    {
      name: 'email',
      searchParam: 'email',
      displayName: 'email',
    },
    {
      name: 'mobileNumber',
      type: 'number',
      searchParam: 'mobileNumber',
      displayName: 'mobile',
    },
    {
      name: 'enabled',
      type: 'select',
      isNullRequired: true,
      searchParam: 'enabled',
      displayName: 'enabled',
    },
    {
      name: 'authorized',
      type: 'select',
      isNullRequired: true,
      searchParam: 'authorized',
      displayName: 'authorized',
    },
  ],
  searchEndUserUsers: [
    {
      name: 'id',
      searchParam: 'id',
      displayName: 'profileId',
    },
    {
      name: 'username',
      searchParam: 'username',
      displayName: 'username',
    },
    {
      name: 'email',
      searchParam: 'email',
      displayName: 'email',
    },
    {
      name: 'enabled',
      type: 'select',
      isNullRequired: true,
      searchParam: 'enabled',
      displayName: 'enabled',
    },
  ],
  searchCFSInvoices: [
    {
      name: 'pName',
      searchParam: 'product.name',
      displayName: 'productName',
    },
    {
      name: 'username',
      searchParam: 'user.username',
      displayName: 'username',
    },
    {
      name: 'createdDate1',
      searchParam: 'createdAt1',
      type: 'date',
      displayName: 'createdDateFrom',
    },
    {
      name: 'createdDate2',
      searchParam: 'createdAt2',
      type: 'date',
      displayName: 'createdDateTo',
    },
    {
      name: 'paidDate1',
      searchParam: 'approvedAt1',
      type: 'date',
      displayName: 'paidDateFrom',
    },
    {
      name: 'paidDate2',
      searchParam: 'approvedAt2',
      type: 'date',
      displayName: 'paidDateTo',
    },
    {
      name: 'invoiceStatus',
      type: 'select',
      isNullRequired: true,
      searchParam: 'invoice.invoiceStatus',
      displayName: 'invoiceStatus',
    },
    {
      name: 'totalPrice',
      searchParam: 'totalPrice',
      displayName: 'price',
    },
    {
      name: 'period',
      searchParam: 'recurringPeriod',
      type: 'select',
      isNullRequired: true,
      displayName: 'period',
    },
    {
      name: 'preInvoiceSerial',
      searchParam: 'preInvoiceSerial',
      displayName: 'preInvoiceSerial',
    },
    {
      name: 'serial',
      searchParam: 'serial',
      displayName: 'invoiceSerial',
    },
    {
      name: 'payIdentifier',
      searchParam: 'payIdentifier',
      displayName: 'payIdentifier',
    },
    {
      name: 'paid',
      type: 'select',
      isNullRequired: true,
      searchParam: 'invoice.paid',
      displayName: 'paid',
    },
  ],
  searchGroups: [
    {
      name: 'groupName',
      searchParam: 'groupName',
      displayName: 'groupName',
    },
    {
      name: 'memberCount',
      searchParam: 'memberCount',
      displayName: 'memberCount',
    },
    {
      name: 'planName',
      searchParam: 'plan.name',
      displayName: 'planName',
    },
    {
      name: 'username',
      searchParam: 'adminUser.username',
      displayName: 'adminUser',
    },
  ],
  vmSearchInvoices: [
    {
      name: 'refCode',
      searchParam: 'invoice.refCode',
      displayName: 'refCode',
    },
    {
      name: 'vmName',
      searchParam: 'vmBill.name',
      displayName: 'vmName',
    },
    {
      name: 'username',
      searchParam: 'invoice.user.username',
      displayName: 'username',
    },
    {
      name: 'os',
      type: 'select',
      isNullRequired: true,
      searchParam: 'vmBill.os',
      displayName: 'os',
    },
    {
      name: 'from1',
      searchParam: 'invoice.from1',
      type: 'date',
      displayName: 'startDateFrom',
    },
    {
      name: 'from2',
      searchParam: 'invoice.from2',
      type: 'date',
      displayName: 'startDateTo',
    },
    {
      name: 'to1',
      searchParam: 'invoice.to1',
      type: 'date',
      displayName: 'endDateFrom',
    },
    {
      name: 'to2',
      searchParam: 'invoice.to2',
      type: 'date',
      displayName: 'endDateTo',
    },
    {
      name: 'paidDate1',
      searchParam: 'invoice.approvedAt1',
      type: 'date',
      displayName: 'paidDateFrom',
    },
    {
      name: 'paidDate2',
      searchParam: 'invoice.approvedAt2',
      type: 'date',
      displayName: 'paidDateTo',
    },
    {
      name: 'paid',
      type: 'select',
      isNullRequired: true,
      searchParam: 'invoice.paid',
      displayName: 'paid',
    },
    {
      name: 'period',
      searchParam: 'vmBill.lastInvoice.recurringPeriod',
      type: 'select',
      isNullRequired: true,
      displayName: 'period',
    },
  ],
  searchVmBills: [
    {
      name: 'name',
      searchParam: 'name',
      displayName: 'name',
    },
    {
      name: 'os',
      type: 'select',
      isNullRequired: true,
      searchParam: 'os',
      displayName: 'os',
    },
    {
      name: 'disk',
      searchParam: 'primaryDisk',
      displayName: 'Disk',
      type: 'number',
      placeholder: 'gb',
    },
    {
      name: 'ram',
      searchParam: 'ram',
      displayName: 'Ram',
      type: 'number',
      placeholder: 'gb',
    },
    {
      name: 'cpu',
      searchParam: 'cpuCores',
      displayName: 'Cpu',
      type: 'number',
      placeholder: 'cores',
    },
    {
      name: 'username',
      searchParam: 'lastInvoice.user.username',
      displayName: 'username',
    },
    {
      name: 'from1',
      searchParam: 'invoice.from1',
      type: 'date',
      displayName: 'startDateFrom',
    },
    {
      name: 'from2',
      searchParam: 'invoice.from2',
      type: 'date',
      displayName: 'startDateTo',
    },
    {
      name: 'to1',
      searchParam: 'invoice.to1',
      type: 'date',
      displayName: 'endDateFrom',
    },
    {
      name: 'to2',
      searchParam: 'invoice.to2',
      type: 'date',
      displayName: 'endDateTo',
    },
    {
      name: 'paid',
      searchParam: 'lastInvoice.paid',
      type: 'select',
      isNullRequired: true,
      displayName: 'paid',
    },
    // {
    //   name: 'payable',
    //   searchParam: 'lastInvoice.payable',
    //   type: 'select',
    //   isNullRequired: true,
    //   displayName: 'Payabale',
    // },
    {
      name: 'period',
      searchParam: 'lastInvoice.recurringPeriod',
      type: 'select',
      isNullRequired: true,
      displayName: 'period',
    },
    {
      name: 'vmState',
      searchParam: 'vm.state',
      type: 'select',
      isNullRequired: true,
      displayName: 'vmState',
    },

  ],
  searchProducts: [
    {
      name: 'name',
      searchParam: 'name',
      displayName: 'name',
    },
    /*
    {
      name: 'category',
      searchParam: 'category',
      type: 'select',
      isNullRequired: true,
      displayName: 'category',
    },
    */
    {
      name: 'defaultPlan',
      searchParam: 'defaultPlan',
      type: 'select',
      isNullRequired: true,
      displayName: 'default',
    },
    {
      name: 'uiVisible',
      searchParam: 'uiVisible',
      type: 'select',
      isNullRequired: true,
      displayName: 'uiVisible',
    },
    {
      name: 'active',
      searchParam: 'active',
      type: 'select',
      isNullRequired: true,
      displayName: 'active',
    },
  ],
  addEditProduct: [
    {
      name: 'name',
      displayName: 'productName',
      isRequired: true,
    },
    {
      name: 'category',
      type: 'select',
      displayName: 'category',
      isRequired: true,
      isNullRequired: true,
    },
    {
      name: 'priceInfo',
      type: 'number',
      displayName: 'priceInfo',
      placeholder: 'IRR',
    },
    {
      name: 'jsonInfo',
      type: 'textarea',
      displayName: 'jsonInfo',
      isRequired: true,
    },
    {
      name: 'featureInfo',
      type: 'textarea',
      displayName: 'featureInfo',
      isRequired: true,
    },
    {
      name: 'defaultPlan',
      displayName: 'default',
      type: 'checkbox',
    },
    {
      name: 'active',
      displayName: 'active',
      type: 'checkbox',
    },
    {
      name: 'uiVisible',
      displayName: 'uiVisible',
      type: 'checkbox',
    },
  ],
  addProductFeature: [
    {
      name: 'name',
      displayName: 'name',
      isRequired: true,
    }
  ],
  addEditPFA: [
    {
      name: 'productfeatureId',
      displayName: 'productFeature',
      type: 'select',
      isNullRequired: true,
      isRequired: true,
      readOnlyOnEdit: true,
    },
    {
      name: 'type',
      displayName: 'type',
      type: 'select',
    },
    {
      name: 'required',
      displayName: 'required',
      type: 'checkbox',
    },
    {
      name: 'active',
      displayName: 'active',
      type: 'checkbox',
    },
  ],
  addEditPC: [
    {
      name: 'componentOrder',
      displayName: 'componentOrder',
      type: 'number',
      isRequired: true,
    },
    {
      name: 'from',
      displayName: 'from',
      type: 'date',
      isRequired: true,
    },
    {
      name: 'to',
      displayName: 'to',
      type: 'date',
      isRequired: true,
    },
    {
      name:  'priceType',
      displayName: 'priceType',
      type: 'select',
      isNullRequired: true,
      isRequired: true,
    },
    {
      name:  'frequencyMeasure',
      displayName: 'frequencyMeasure',
      type: 'select',
      isNullRequired: true,
      isRequired: true,
    },
    {
      name:  'valueApplication',
      displayName: 'valueApplication',
      type: 'select',
      isNullRequired: true,
      isRequired: true,
    },
    {
      name:  'recurringPeriod',
      displayName: 'recurringPeriod',
      type: 'select',
      isNullRequired: true,
      isRequired: true,
    },
    {
      name:  'title',
      displayName: 'title',
      type: 'select',
      isNullRequired: true,
      isRequired: true,
    },
  ],
  addEditQB: [
    {
      name: 'calculationType',
      displayName: 'calculationType',
      type: 'select',
      isNullRequired: true,
      isRequired: true,
      readOnlyOnEdit: true,
    },
    {
      name: 'lowerBound',
      displayName: 'lowerBound',
      type: 'number',
      isRequired: true,
    },
    {
      name: 'upperBound',
      displayName: 'upperBound',
      type: 'number',
      isRequired: true,
    },
    {
      name: 'value',
      displayName: 'value',
      type: 'number',
      isRequired: true,
      placeholder: 'IRR',
    },
    {
      name: 'value2',
      displayName: 'value2',
      type: 'number',
      placeholder: 'IRR',
    },
  ],
  chartForm: [
    {
      name: 'from',
      displayName: 'from',
      type: 'date',
    },
    {
      name: 'to',
      displayName: 'to',
      type: 'date',
    },
  ],
  exportFile: [
    {
      name: 'from',
      displayName: 'from',
      type: 'date',
      isRequired: true,
    },
    {
      name: 'to',
      displayName: 'to',
      type: 'date',
      isRequired: true,
    }
  ]
}
