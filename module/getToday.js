export default getToday = () => {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  let data = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate()
  };

  if(month < 10) month = `0${month}`;
  if(day < 10) day = `0${day}`;

  data.dateString = `${year}-${month}-${day}`;

  return data;
}