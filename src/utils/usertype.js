import React from 'react'
import {UserType} from './user'
import { isArrayOK, } from './array'
import {language} from './language'
export const UserTypes = groups => {
  const userGroups = groups.filter(grp => UserType[grp.name] && grp.name != 'user_group')
  return isArrayOK(userGroups)? userGroups.map((grp, index) =>
    <span key={index} className={`text-${UserType[grp.name].color}`}>
      {UserType[grp.name][language.key]}
      {/*index < userGroups.length - 1? language.key == 'fa'? '، ':', ':' '*/}
      {index < userGroups.length - 1? <br/>:''}
    </span>
  ): <span>&nbsp;</span>
}
