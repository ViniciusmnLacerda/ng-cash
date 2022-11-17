const formatValue = (value) => {
  const numberToString = value.toString();
  if (!numberToString.includes('.')) {
    const result = `${numberToString}.00`;
    return result;
  }
  const arrayOfStrings = numberToString.split('.');
  if (arrayOfStrings[1].length === 1) {
    const result = `${arrayOfStrings[0]}.${arrayOfStrings[1]}0`;
    return result;
  }
  return value;
};

export default formatValue;
