import { Icon } from '@iconify/react';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { HiClipboardCopy } from 'react-icons/hi';
import { toast, ToastContainer } from 'react-toastify';

import LottieAnimation from '@/components/lotties';

import LottieAnimationData from '~/lotties/stream.json';

interface PreviewOverlayProps {
  imageId: string;
  imageAuthorURL: string;
  imageAuthorProfilePicture: string;
  imagePrompt: string;
  likesCount: number;
}

const ZoomedOverlay: React.FC<PreviewOverlayProps> = ({
  imageId,
  imageAuthorURL,
  imageAuthorProfilePicture,
  imagePrompt,
  likesCount,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const localImageId = window.localStorage.getItem(imageId);

      if (localImageId === 'true') {
        setIsLiked(true);
      }

      axios
        .get(`/api/gallery/?id=${imageId}`)
        .then((response) => {
          if (response.data.imageId === imageId) {
            setLocalLikesCount(response.data.likesCount);
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
    }
  }, [imageId]);

  const handleLikeButtonClick = async (id: string) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (isLiked) {
        window.localStorage.removeItem(id);

        window.umami.track('Unlike Image', { id });

        setIsLiked(false);
        setLocalLikesCount(localLikesCount - 1);
      } else {
        window.localStorage.setItem(id, 'true');

        window.umami.track('Like Image', { id });

        setIsLiked(true);

        if (localLikesCount <= 0) {
          setLocalLikesCount(1);
        } else {
          setLocalLikesCount(localLikesCount + 1);
        }

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

  const copyToClipboard = (str: string, id: string) => {
    navigator.clipboard
      .writeText(str)
      .then(() => {
        window.umami.track('Copy Prompt', { id });

        notify();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  const notify = () => toast.success('Prompt copied to clipboard!');

  return (
    <>
      <div className="overlay absolute bottom-[-5px] flex h-max w-full flex-col divide-y divide-slate-400/50 rounded-lg px-4 pt-6 text-sky-100 opacity-0 transition-all group-hover:bottom-0 group-hover:opacity-100">
        <div className="my-2 flex flex-row items-end justify-between">
          <div className="mb-1 flex flex-wrap items-center justify-start text-sm">
            <span>Generated by </span>
            <a href={imageAuthorURL} target="_blank" rel="noopener noreferrer ">
              <Image
                src={imageAuthorProfilePicture}
                alt=""
                width={30}
                height={30}
                className="ml-2 rounded-full transition-opacity hover:opacity-70"
              />
            </a>
          </div>

          <div className="mb-2 flex flex-col items-center justify-center">
            <button
              className=""
              onClick={(e) => {
                e.stopPropagation();
                handleLikeButtonClick(imageId);
              }}
              data-umami-event="Gallery"
              data-umami-event-type="Reaction"
              data-umami-event-id={imageId}
              data-umami-event-reaction={isLiked ? 'Unlike' : 'Like'}
            >
              {isLiked ? (
                <div className="flex flex-col items-center justify-center">
                  <LottieAnimation
                    animationData={LottieAnimationData}
                    width={50}
                    height={100}
                  />
                  <Icon
                    icon="mdi:heart"
                    width="24"
                    height="24"
                    className="cursor-pointer text-red-500 transition-all hover:text-red-400"
                  />
                </div>
              ) : (
                <Icon
                  icon="mdi:heart-outline"
                  width="24"
                  height="24"
                  className="cursor-pointer text-gray-200 transition-all hover:text-red-500"
                />
              )}
            </button>
            {localLikesCount > 0 && (
              <div>
                <p className="w-[50px] text-center font-black">
                  {localLikesCount}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between space-x-2 pb-3 pt-1 text-sm">
          <p>{imagePrompt}</p>
          <div className="flex justify-end text-slate-100">
            <HiClipboardCopy
              size={25}
              className="cursor-pointer rounded-lg transition-all hover:text-orange-400"
              onClick={() => {
                copyToClipboard(imagePrompt, imageId);
              }}
            />
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default ZoomedOverlay;
