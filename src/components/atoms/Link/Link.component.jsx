import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

const Link = ({ children, href, className, activeClassName }) => {
    const router = useRouter();

    const classNames = useMemo(() => `${className} ${router.pathname === href && activeClassName}`, [href, router]);

    const handleClick = (e) => {
        e.preventDefault();
        router.push(href);
    };

    return (
        <a href={href} onClick={handleClick} className={classNames}>
            {children}
        </a>
    );
};

export default Link;
