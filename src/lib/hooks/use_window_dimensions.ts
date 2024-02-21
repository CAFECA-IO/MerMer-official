// Ref: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
// Info: (20240212) get width and height of current screen

'use client'
import { useState, useEffect } from 'react';
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  if (typeof window === 'undefined')  {
    return {width: undefined, height: undefined}
  }
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
