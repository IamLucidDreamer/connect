export const truncate = (input) => {
    return input?.length > 250 ? `${input.substring(0, 250)}...` : input;
}

export const isStringEmpty = (val) => {
    if (val?.length !== 0) {
        return val
    }
    else {
        return false
    }
}

const formatDateToMonthYear = (date) => {
    if (!date) return ''; 
  
    const parsedDate = new Date(date); 
    if (isNaN(parsedDate)) {
      console.error("Invalid date format");
      return '';
    }

    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(parsedDate);
  };
  
  export default formatDateToMonthYear;