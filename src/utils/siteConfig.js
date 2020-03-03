import {ADMIN} from './role'
export const siteConfig = {
  key: location.href.includes('irancell') || location.href.includes('mtn')
   || location.href.includes('local')
   ? 'mtn': 'pg',
  pg: {
    lightColor: '#3c8dbc',
    baseColor: 'blue',
    smallFirstPart: 'P',
    smallSecondPart: 'G',
    bigFirstPart: 'Persian',
    bigSecondPart: 'Gig',
    faFirstPart: 'پرشین',
    faSecondPart: 'گیگ',
    headerBackground: 'blue',
    role: ADMIN.superadmin,
    brand: {en: 'PersianGig', fa: 'پرشین گیگ',},
    businessBrand: {en: 'PersianGig', fa: 'پرشین گیگ',},
    url: 'http://www.persiangig.com',
  },
  mtn: {
    lightColor: '#ffcc00',
    baseColor: 'yellow',
    smallFirstPart: 'MT',
    smallSecondPart: 'N',
    bigFirstPart: 'Iran',
    bigSecondPart: 'cell',
    headerBackground: 'mtn',
    role: ADMIN.admincfs,
    brand: {en: 'Irancell', fa: 'ایرانسل'},
    businessBrand: {en: 'MAAD', fa: 'ماد'},
    url: 'https://irancell.ir',
  }
}
