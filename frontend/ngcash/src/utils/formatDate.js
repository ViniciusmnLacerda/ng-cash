const formatDate = (date) => {
  const newDate = date.split('-');
  return date === '' ? '' : `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
};

export default formatDate;
