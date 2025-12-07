import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const navigationBarLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/publications', label: 'Publications' },
  { href: '/about', label: 'About Me' },
  { href: '/hardware', label: 'Hardware' },
  { href: '/resume/SanjaySoundarajan-Resume.pdf', label: 'Resume' },
  // { href: '/gallery', label: 'Gallery' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [onTop, setOnTop] = useState(true);

  const router = useRouter();

  const routerPathNameArray = router.pathname.split('/');

  useEffect(() => {
    const handleScroll = () => {
      if (onTop !== (window.pageYOffset === 0)) {
        setOnTop(window.pageYOffset === 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onTop]);

  const variants = {
    closed: {
      opacity: 0,
      x: '100%',
    },
    open: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <header
      className={`${onTop ? 'bg-white/40' : 'shadow-sm bg-white'} sticky top-0 z-10 transition-all`}
    >
      <div className="relative mx-auto flex h-14 max-w-screen-lg items-center justify-between">
        <Link href="/" passHref>
          <span className="cursor-pointer pl-4 text-base font-bold hover:text-orange-400 lowercase">
            Home
          </span>
        </Link>

        <nav
          className={
            (process.env.NODE_ENV === `development` ? `debug-screens ` : ``) +
            `relative pr-1`
          }
        >
          <div className="flex ">
            <ul className="hidden items-center justify-between space-x-4 md:flex">
              {navigationBarLinks.map(({ href, label }) => (
                <li key={`${href}${label}`}>
                  <Link href={href} passHref>
                    <span
                      className={`cursor-pointer text-base font-medium transition-all hover:text-orange-400 lowercase ${
                        routerPathNameArray.includes(href.replace('/', ''))
                          ? '!text-orange-600'
                          : ''
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div
              className="flex cursor-pointer items-center justify-center rounded-lg p-2 transition-all hover:bg-slate-100 hover:text-orange-500 md:hidden"
              onClick={() => setIsOpen((isOpen) => !isOpen)}
            >
              <Icon icon="bytesize:menu" width="25" height="25" />
            </div>

            <div className="mx-4  w-[2px] bg-slate-400" aria-hidden></div>

            <a
              href="https://github.com/megasanjay"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 flex items-center"
              data-umami-event="GitHub Profile"
            >
              <div className="flex cursor-pointer items-center justify-center transition-all hover:text-amber-500">
                <Icon icon="akar-icons:github-fill" width="25" height="25" />
              </div>
            </a>

            <a
              href="https://twitter.com/megasanjay"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 flex items-center"
              data-umami-event="Twitter Profile"
            >
              <div className="flex cursor-pointer items-center justify-center transition-all hover:text-amber-500">
                <Icon icon="akar-icons:twitter-fill" width="25" height="25" />
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/sanjay-soundarajan/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 flex items-center"
              data-umami-event="LinkedIn Profile"
            >
              <div className="flex cursor-pointer items-center justify-center transition-all hover:text-amber-500">
                <Icon
                  icon="akar-icons:linkedin-box-fill"
                  width="25"
                  height="25"
                />
              </div>
            </a>
          </div>

          <motion.aside
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            variants={variants}
            className="fixed right-0 top-0 z-20"
          >
            <ul className="flex h-screen w-auto flex-col  border-l-2 bg-white px-2 text-right">
              <div
                className="mb-2 mr-2 mt-1 flex cursor-pointer items-center justify-end pt-2 transition-all hover:text-orange-500"
                onClick={() => setIsOpen((isOpen) => !isOpen)}
                role="button"
              >
                <Icon icon="ci:close-big" width={25} height={25} />
              </div>

              {navigationBarLinks.map(({ href, label }) => (
                <Link href={href} passHref key={`${href}${label}`}>
                  <motion.li
                    className={`cursor-pointer rounded-md px-3 py-2 text-base transition-all lowercase hover:bg-slate-100  hover:text-orange-400 ${
                      routerPathNameArray.includes(href.replace('/', ''))
                        ? '!text-orange-600'
                        : ''
                    } `}
                    onClick={() => setIsOpen((isOpen) => !isOpen)}
                  >
                    <span className=" ">{label}</span>
                  </motion.li>
                </Link>
              ))}
            </ul>
          </motion.aside>
        </nav>
      </div>
    </header>
  );
}
