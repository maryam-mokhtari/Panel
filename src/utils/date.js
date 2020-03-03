import Jalaali from 'jalaali-js'
import {language} from './language'

export const getDate = (epoch) => {
  const date = new Date(epoch)
  const mm = date.getMonth() + 1
  const dd = date.getDate()

  return [date.getFullYear(),
    (mm>9 ? '' : '0') + mm,
    (dd>9 ? '' : '0') + dd
  ].join('-')
}

export const getPDate = (epoch) => {
  return language.key == 'fa'? getPersianDate(epoch): getDate(epoch)
}

export const getPersianDate = (epoch) => {
  const date = new Date(epoch)
  const jalaaliDate = Jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate())
  const h = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours()
  const m = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()
  const month = (jalaaliDate.jm < 10) ? '0' + jalaaliDate.jm : jalaaliDate.jm
  const day = (jalaaliDate.jd < 10) ? '0' + jalaaliDate.jd : jalaaliDate.jd

  return (jalaaliDate.jy) + '/' + month + '/'
  + day
}
