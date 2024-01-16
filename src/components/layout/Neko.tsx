import { Neko as NekoClass } from 'neko-ts';
import { useEffect, useRef, useState } from 'react';

export default function Neko() {
  const neko = useRef<NekoClass>();
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleNeko = () => {
    if (isPlaying) {
      // eslint-disable-next-line no-console
      console.log('neko going mimis');
      neko.current?.sleep();
    } else {
      // eslint-disable-next-line no-console
      console.log('neko waking up');
      neko.current?.wake();
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!neko.current) {
      neko.current = new NekoClass({
        origin: {
          x: window.innerWidth - 90,
          y: window.innerHeight - 90,
        },
      });
    }

    neko.current?.sleep();
  }, [neko]);

  return (
    <div className="relative neko-container hidden sm:block">
      <div className="fixed bottom-5 right-5 neko-box">
        <button
          className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-orange-50 border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none opacity-50 hover:opacity-95 transition-all"
          onClick={toggleNeko}
          data-umami-event="Neko"
        >
          {isPlaying ? 'Get some rest, Neko!' : "Let's play, Neko!"}
        </button>
      </div>
    </div>
  );
}
