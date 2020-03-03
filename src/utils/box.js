
export const loadBox = (refs, isCollapseIconNeeded, loadData, ...args) => {
  console.log('loadBox', refs, 'loaddata', loadData, 'args ', args)
  const btnClasses = refs.collapseBtn.classList
  if (isCollapseIconNeeded) {
    if (Array.from(btnClasses).includes('fa-plus')) {
      btnClasses.remove('fa-plus')
      btnClasses.add('fa-minus')
    } else {
      btnClasses.remove('fa-minus')
      btnClasses.add('fa-plus')
    }
  }
  if (Array.from(btnClasses).includes('fa-minus')) {
    if (loadData != null) {
      loadData(...args)
    }
  }
}
