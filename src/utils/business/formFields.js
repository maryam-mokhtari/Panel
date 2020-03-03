export const formFields =
{
  searchGroupUsers: [
    {
      name: 'email',
      searchParam: 'email',
      displayName: 'email',
    },
    {
      name: 'active',
      type: 'select',
      isNullRequired: true,
      searchParam: 'active',
      displayName: 'active',
    },
  ],
  changeUserQuota: [
    {
      name: 'quota',
      type: 'number',
      placeholder: 'GB',
      isRequired: true,
      displayName: 'quota',
    }
  ]
}
