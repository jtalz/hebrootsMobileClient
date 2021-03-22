import React, {useState, useEffect} from 'react';
import { Stopwatch } from "react-native-stopwatch-timer";

const options = {
    container: {
      backgroundColor: "white",
      padding: 5,
      borderRadius: 5,
      width: 220,
    },
    text: {
      fontSize: 30,
      color: "#000",
      marginLeft: 7,
      fontFamily: "Bodoni 72",
    },
  };

const StopwatchTimer = ({start, reset, dispatch}) => {
    const [time, setCurrentTime] = useState(0);
    const getFormattedTime = (time) => {
        setCurrentTime(time);
      };

      /* useEffect(() => {
        dispatch({ type: "startTimer" });
      }, []); */
    return (
        <Stopwatch
          laps
          msecs
          start={start}
          reset={reset}
          options={options}
          getTime={getFormattedTime}
        />
    )
}

export default StopwatchTimer;