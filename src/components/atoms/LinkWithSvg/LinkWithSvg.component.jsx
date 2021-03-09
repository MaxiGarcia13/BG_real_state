import React from 'react';
import Svg from '../Svg';
import styles from './linkWithSvg.styles.module.scss';

const LinkWithSvgComponent = ({ label, onClick, iconLeftSrc, iconRightSrc, className }) => {
    const handleOnclick = (ev) => {
        ev.preventDefault();
        if (typeof onClick === 'function') {
            onClick(ev);
        }
    };

    return (
        <a className={`${styles.wrapper} ${className}`} onClick={handleOnclick}>
            {typeof iconLeftSrc === 'string' && <Svg src={iconLeftSrc} />}
            <span>{label}</span>
            {typeof iconRightSrc === 'string' && <Svg src={iconRightSrc} />}
        </a>
    );
};
export default LinkWithSvgComponent;
