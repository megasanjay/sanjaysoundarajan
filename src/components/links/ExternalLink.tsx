import React from 'react';

type ExternalLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

const ExternalLink = React.forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ children, href, className }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={`${className} link link-underline link-underline-black text-orange-500 transition-[color] hover:text-orange-400`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  },
);

export default ExternalLink;
