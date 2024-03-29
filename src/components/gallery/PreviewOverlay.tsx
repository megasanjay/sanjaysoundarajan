import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface PreviewOverlayProps {
  id: string;
  publishedAt: string;
}

const PreviewOverlay: React.FC<PreviewOverlayProps> = ({ id, publishedAt }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const mainFunction = () => {
      if (typeof window !== 'undefined' && window.localStorage) {
        const localImageId = window.localStorage.getItem(id);

        if (localImageId === 'true') {
          setIsLiked(true);
        }
      }
    };

    // call the function in half a second intervals
    const interval = setInterval(mainFunction, 500);

    // clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [id]);

  const handleLikeButtonClick = async (id: string) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (isLiked) {
        window.localStorage.removeItem(id);

        window.umami.track('Unlike Image', { id });

        setIsLiked(false);
      } else {
        window.localStorage.setItem(id, 'true');

        window.umami.track('Like Image', { id });

        setIsLiked(true);

        try {
          const res = await fetch('/api/gallery', {
            method: 'POST',
            body: JSON.stringify({ imageId: id }),
          });

          if (!res.ok) {
            throw new Error('Something went wrong');
          } else {
            // eslint-disable-next-line no-console
            console.log('Success');
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }
    }
  };

  return (
    <div className="overlay absolute bottom-[-1px] flex h-14 w-full items-center justify-between rounded-lg px-4 pt-6 opacity-0 transition-all group-hover:bottom-0 group-hover:opacity-100">
      <button
        className="mb-1"
        onClick={(e) => {
          e.stopPropagation();
          handleLikeButtonClick(id);
        }}
        data-umami-event="Gallery"
        data-umami-event-type="Reaction"
        data-umami-event-id={id}
        data-umami-event-reaction={isLiked ? 'Unlike' : 'Like'}
      >
        {isLiked ? (
          <Icon
            icon="mdi:heart"
            width="24"
            height="24"
            className="cursor-pointer text-red-700 transition-all hover:text-red-500"
          />
        ) : (
          <Icon
            icon="mdi:heart-outline"
            width="24"
            height="24"
            className="cursor-pointer text-gray-200 transition-all hover:text-red-500"
          />
        )}
      </button>
      <p className="cursor-default text-right text-sm text-gray-200">
        {dayjs(publishedAt).format('MMMM D, YYYY')}
      </p>
    </div>
  );
};

export default PreviewOverlay;
