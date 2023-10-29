
export function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
  
    // Format the date
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    // Format the time
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12) || 12; // Convert 0 to 12 for AM
    const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  
    // Combine the formatted date and time
    const formattedDateTime = `${formattedDate} | ${formattedTime}`;
  
    return formattedDateTime;
  }