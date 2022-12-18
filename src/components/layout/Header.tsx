import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

const navigationBarLinks = [
  { href: '/projects', label: 'projects' },
  { href: '/publications', label: 'publications' },
  { href: '/about', label: 'about me' },
  { href: '/gallery', label: 'gallery' },
];

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inClient, setInClient] = React.useState(false);
  const router = useRouter();

  const routerPathNameArray = router.pathname.split('/');

  React.useEffect(() => {
    setInClient(typeof window !== 'undefined');
  }, []);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '100%' },
  };

  return (
    <header className="sticky top-0 z-10  bg-white">
      <div className=" relative mx-auto flex h-14 max-w-screen-lg items-center justify-between">
        <Link href="/" passHref>
          <span className="cursor-pointer pl-4 text-base font-bold hover:text-gray-600">
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
                      className={`cursor-pointer text-base font-medium transition-all hover:text-sky-600 ${
                        routerPathNameArray.includes(href.replace('/', ''))
                          ? 'text-sky-500'
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
              className="flex cursor-pointer items-center justify-center rounded-lg p-2 transition-all hover:bg-slate-100 hover:text-sky-500 md:hidden"
              onClick={() => setIsOpen((isOpen) => !isOpen)}
            >
              <Icon icon="bytesize:menu" width="25" height="25" />
            </div>

            <div className="mx-4  w-[2px] bg-slate-400" aria-hidden></div>

            <a
              href="https://github.com/megasanjay"
              target="_blank"
              rel="noopener noreferrer"
              className="umami--click--github-profile-link mx-2 flex items-center"
            >
              <div className="flex cursor-pointer items-center justify-center transition-all hover:text-sky-500">
                <Icon icon="akar-icons:github-fill" width="25" height="25" />
              </div>
            </a>
            <a
              href="https://twitter.com/megasanjay"
              target="_blank"
              rel="noopener noreferrer"
              className="umami--click--twitter-profile-link mx-2 flex items-center"
            >
              <div className="flex cursor-pointer items-center justify-center transition-all hover:text-sky-500">
                <Icon icon="akar-icons:twitter-fill" width="25" height="25" />
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/sanjay-soundarajan/"
              target="_blank"
              rel="noopener noreferrer"
              className="umami--click--linkedin-profile-link mx-2 flex items-center"
            >
              <div className="flex cursor-pointer items-center justify-center transition-all hover:text-sky-500">
                <Icon
                  icon="akar-icons:linkedin-box-fill"
                  width="25"
                  height="25"
                />
              </div>
            </a>
          </div>

          {inClient && (
            <motion.div
              animate={isOpen ? 'open' : 'closed'}
              variants={variants}
              className={
                `fixed top-0 right-0 z-20` +
                `${inClient ? ` block` : ` hidden`}`
              }
            >
              <ul className=" flex h-screen w-auto flex-col border border-r-2 bg-white px-2 text-right">
                <div
                  className="mr-2 mt-1 mb-2 flex cursor-pointer items-center justify-end pt-2 transition-all hover:text-sky-500"
                  onClick={() => setIsOpen((isOpen) => !isOpen)}
                >
                  <Icon icon="ci:close-big" width={25} height={25} />
                </div>
                {navigationBarLinks.map(({ href, label }) => (
                  <Link href={href} passHref key={`${href}${label}`}>
                    <li
                      className={`cursor-pointer rounded-md px-3 py-2 text-base transition-all  hover:bg-slate-100  hover:text-sky-600 ${
                        routerPathNameArray.includes(href.replace('/', ''))
                          ? 'text-sky-500'
                          : ''
                      } `}
                      onClick={() => setIsOpen((isOpen) => !isOpen)}
                    >
                      <span className=" ">{label}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            </motion.div>
          )}
        </nav>
      </div>
    </header>
  );
}
