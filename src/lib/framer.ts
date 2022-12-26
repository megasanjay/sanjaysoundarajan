export const textContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      ease: 'anticipate',
    },
  },
};

export const textItem = {
  hidden: { opacity: 0, translateY: 100 },
  show: { opacity: 1, translateY: 0 },
};

export const galleryContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      ease: 'anticipate',
      delay: 0.5,
    },
  },
};

export const galleryItem = {
  hidden: { opacity: 0, translateY: 100 },
  show: { opacity: 1, translateY: 0 },
};
