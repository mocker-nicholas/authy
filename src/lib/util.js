export const last7 = () => {
  var result = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    result.push(`${d.getUTCMonth() + 1}/${d.getDate()}`);
  }
  return result.reverse();
};

export const randId = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
