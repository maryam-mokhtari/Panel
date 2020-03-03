export const ADMIN ={
  superadmin: 'superuser_group',
  readonlysuperadmin: 'superuser_readonly_group',
  authorization: 'admin_customer_authorizer_group',
  invoice: 'admin_financial_group',
  admincws: 'admin_cws',
  admincfs: 'admin_cfs',
  groupadmin: 'admin_cfs_group',
  enduser: 'user_cfs_group',
  zerouser: 'user_group'
}

export const isUserInRole = (role, userData) => {
  if (userData) {
    let roles = userData.groups.map(grp => grp.name)
    if ((role == ADMIN.admincfs || role == ADMIN.readonlysuperadmin) && roles.includes(ADMIN.authorization)) {
      return false
    }
    if ((role == ADMIN.admincfs || role == ADMIN.readonlysuperadmin) && roles.includes(ADMIN.invoice)) {
      return false
    }
    if (role == ADMIN.readonlysuperadmin && roles.includes(ADMIN.admincfs)) {
      return false
    }
    if (role == ADMIN.admincfs && roles.includes(ADMIN.readonlysuperadmin)) {
      return true
    }
    if (role == ADMIN.admincfs && roles.includes(ADMIN.superadmin)) {
      return true
    }
    if (role == ADMIN.admincws && roles.includes(ADMIN.superadmin)) {
      return true
    }
    return (
    // roles.includes(ADMIN.superadmin) ||
      roles.includes(role)
      || roles.includes(role.toLowerCase()) || roles.includes(role.toUpperCase()))
  }
  return false
}

export const getUserRole = (userData) => {
  let roles = userData.groups.map(grp => grp.name)
  if (isUserInRole(ADMIN.admincfs, userData) && isUserInRole(ADMIN.admincws, userData)) {
    return ADMIN.superadmin
  } else if (isUserInRole(ADMIN.admincfs, userData)) {
    return ADMIN.admincfs
  } else if (isUserInRole(ADMIN.admincws, userData)) {
    return ADMIN.admincws
  } else if (isUserInRole(ADMIN.groupadmin, userData)) {
    return ADMIN.groupadmin
  } else if (isUserInRole(ADMIN.readonlysuperadmin, userData)) {
    return ADMIN.readonlysuperadmin
  } else if (isUserInRole(ADMIN.enduser, userData)) {
    return ADMIN.enduser
  } else if (isUserInRole(ADMIN.zerouser, userData)) {
    return ADMIN.zerouser
  }
}
