import { Analytics } from '@vercel/analytics/react';
import '../style/index.css'
import {loadCursor} from '../util/cursor';
import {useEffect, useRef, useState} from 'react';

function MyApp({ Component, pageProps }) {
  const [colorMode, setColorMode] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const preferredColorMode = prefersDark.matches ? 'dark' : 'light';

    setColorMode(preferredColorMode);

    root.classList.remove('light', 'dark');
    root.classList.add(preferredColorMode);
  }, []);

  const ballCanvas = useRef<HTMLDivElement>(null);
  useEffect(() => {
		if (typeof window === 'undefined' || !ballCanvas.current) {
			return;
		}

		return loadCursor(ballCanvas.current);
	}, []);

  return (
    <>
      <div className="text-black dark:text-white flex flex-row justify-center w-full h-full bg-gradient-to-bl from-white to-[#fff] dark:from-black dark:to-[#001429] min-h-screen">
        <div className="w-[80%] md:w-[45rem]">
          <Component {...pageProps} />
          </div>
      </div>
      <div
        ref={ballCanvas}
        className="ball-transitions pointer-events-none fixed z-30 h-6 w-6 rounded-full border border-black bg-transparent opacity-0 shadow-md duration-200 dark:border-white" 
      />
      <Analytics />
    </>
  );
}

export default MyApp;
