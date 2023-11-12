import Link from 'next/link';
import React from 'react';

type InternalLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

const InternalLink = React.forwardRef<HTMLAnchorElement, InternalLinkProps>(
  ({ children, href, className }, ref) => {
    return (
      <Link ref={ref} href={href} passHref>
        <span
          className={`${className} link link-underline link-underline-black cursor-pointer text-orange-500 transition-[color] hover:text-orange-400`}
        >
          {children}
        </span>
      </Link>
    );
  },
);

export default InternalLink;
