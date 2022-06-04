export const last7 =  () => {
  var result = [];
  for (var i=0; i<7; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      result.push(`${d.getUTCMonth() + 1}/${d.getDate()}`) 
  }
  return(result.reverse());
}