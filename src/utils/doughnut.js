export const getDoughnutColors = (proportion) => {
  // if (proportion < 0.25) {
  //   // green
  //   doughnutColor = "#0FAF4B"
  //   doughnutHighlight = "#05552D"
  // } else if (proportion < 0.5) {
  //   // blue
  //   doughnutColor = "#0F6987"
  //   doughnutHighlight = "#053241"
  // } else if (proportion < 0.75) {
  //   // orange
  //   doughnutColor = "#F5821E"
  //   doughnutHighlight = "#DC6428"
  // } else {
  //   // red
  //   doughnutColor = "#E12D6E"
  //   doughnutHighlight = "#BE1E50"
  // }

  doughnutColor = "#7d7d7d"
  doughnutHighlight = "rgb(196, 195, 201)"

  console.log('getDoughnutColors', proportion, doughnutColor, doughnutHighlight);
  return {doughnutColor, doughnutHighlight,}
}

export const getDoughnutData = (used, total, label1, label2, isQuota)  => {
  console.log('getDoughnutData', used, total, label1, label2, isQuota);
  const {doughnutColor, doughnutHighlight} = getDoughnutColors(used/total)
  return [{
    value: Math.round((total - used)/(isQuota?1024*1024*1024:1)),
    color: doughnutColor,
    highlight: doughnutHighlight,
    label: label1,
  }, {
    value: Math.round(used/(isQuota?1024*1024*1024:1)),
    color: "#FFC30F",
    highlight: "#FAEB19",
    label: label2,
  }]
}
