import React from 'react';
import { ReactSVG } from 'react-svg';
import style from './svg.styles.module.scss';

const SvgComponent = ({ src, className }) => {
    return <ReactSVG src={src} className={`${style.wrapper} ${className}`} />;
};

export default SvgComponent;
