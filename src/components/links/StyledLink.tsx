import React from 'react';

import ExternalLink from '@/components/links/ExternalLink';
import InternalLink from '@/components/links/InternalLink';

type StyledLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

const StyledLink = React.forwardRef<HTMLAnchorElement, StyledLinkProps>(
  ({ children, href, className }, ref) => {
    const isExternal = href.startsWith('http') || href.startsWith('https');

    return (
      <>
        {isExternal ? (
          <ExternalLink href={href} className={className} ref={ref}>
            {children}
          </ExternalLink>
        ) : (
          <InternalLink href={href} className={className} ref={ref}>
            {children}
          </InternalLink>
        )}
      </>
    );
  }
);

export default StyledLink;
