export const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(':');
    let formattedTime = '';
    let meridiem = 'AM';
    let hour = parseInt(hours, 10);
    
    if (hour === 0) {
      formattedTime = `12:${minutes} ${meridiem}`;
    } else if (hour > 12) {
      hour -= 12;
      meridiem = 'PM';
      formattedTime = `${hour}:${minutes} ${meridiem}`;
    } else if (hour === 12) {
      meridiem = 'PM';
      formattedTime = `${hour}:${minutes} ${meridiem}`;
    } else {
      formattedTime = `${hour}:${minutes} ${meridiem}`;
    }
    return formattedTime;
  };

  export function getTimeOfDay(hour) {
    if (hour >= 5 && hour < 12) {
        return "morning";
    } else if (hour >= 12 && hour < 18) {
        return "afternoon";
    } else {
        return "evening";
    }
}