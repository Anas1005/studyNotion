

export function formatDuration(durationInSeconds) {
  if (durationInSeconds < 60) {
    return `${Math.round(durationInSeconds)} sec`;
  } else if (durationInSeconds === 60) {
    return '1 min';
  } else {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.round((durationInSeconds % 3600) / 60);

    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    } else {
      return `${minutes} min`;
    }
  }
}

  export function secondsToHMS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const roundedSeconds = Math.round(seconds % 60);
  
    const formatNumber = (number) => (number < 10 ? `0${number}` : `${number}`);
  
    if (hours > 0) {
      return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(roundedSeconds)}`;
    } else {
      return `${formatNumber(minutes)}:${formatNumber(roundedSeconds)}`;
    }
  }
  