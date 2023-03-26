import moment from 'moment';
export const calculateDuration = (start, end) => {
  const startTime = moment(start).format('hh:mm:ss a');
  const endTime = moment(end).format('hh:mm:ss a');

// duration in minutes
  const totalDuration = moment.duration(moment(endTime, 'HH:mm:ss a').diff(moment(startTime, 'HH:mm:ss a'))).asMinutes();
  
  const hoursDuration= Math.floor(totalDuration / 60);
  const minutesDuration=totalDuration  % 60;

  return {hoursDuration,minutesDuration,totalDuration}
};


export const calculateTotalDuration= (sessions) => {
  let totalDuration = 0;
  if(sessions){
    sessions.forEach((session) => {
      let tmp = calculateDuration(session.start,session.end);
      totalDuration += tmp.totalDuration;
   })
  }
  return totalDuration;
};


