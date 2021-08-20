// date.js

const getMonthName = (num) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Nov', 'Dec'];
    return months[num];
  };
  
  const formatDate = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = getMonthName(date.getMonth());
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
  
    return `${year} ${month} ${day}, ${hour}:${minutes}`;
  };
  
  module.exports = formatDate;