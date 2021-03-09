import React, { forwardRef, useRef, useState, useEffect } from 'react';
import InputSearch from '../InputSearch';
import Modal from '../../atoms/Modal';
import styles from './autoCompleteInput.styles.module.scss';

const AutoCompleteInputComponent = ({ className, children, onChange, value = '', action, ...props }, ref) => {
    const conteinerRef = useRef(null);
    const inputRef = useRef(null);
    const expandedContainerRef = useRef(null);

    const [inputValue, setInputValue] = useState(value);
    const [expand, setExpand] = useState(false);
    const [inputStyle, setInputStyle] = useState({});
    const [itemContainerStyle, setItemContainerStyle] = useState({});

    const handleOnfocus = (e) => {
        e.preventDefault();
        if (inputValue.length > 0) {
            show();
        }
    };

    const handleOnKeyUp = (e) => {
        e.preventDefault();

        if (e.keyCode === 13) {
            action(e);
            return reset();
        }

        if (inputValue.length > 0) {
            if (!expand) {
                show();
            }
        } else {
            reset();
            inputRef.current.focus();
        }
    };

    const handleOnChange = (e) => {
        e.preventDefault();

        if (value.length === 0) {
            setInputValue(e.target.value);
        }

        if (onChange) {
            onChange(e);
        }
    };

    const reset = () => {
        setInputStyle({});
        setExpand(false);
    };

    const show = () => {
        setBoundingCLientReact();
        setExpand(true);
    };

    const setBoundingCLientReact = () => {
        const boundingClient = conteinerRef.current.getBoundingClientRect();
        setInputStyle({
            width: `${boundingClient.width}px`,
            marginTop: `${boundingClient.top}px`,
            marginLeft: `${boundingClient.left}px`,
            height: `${boundingClient.height}px`,
        });
        setItemContainerStyle({
            width: `${boundingClient.width}px`,
            marginLeft: `${boundingClient.left}px`,
        });
    };

    const handleClickOutside = (event) => {
        if (expandedContainerRef.current && !expandedContainerRef.current.contains(event.target)) {
            reset();
        }
    };

    useEffect(() => {
        window.addEventListener('resize', setBoundingCLientReact);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('resize', setBoundingCLientReact);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [conteinerRef.current]);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    return (
        <>
            <div ref={ref} className={`${styles.wrapper} ${className}`}>
                <InputSearch
                    ref={conteinerRef}
                    inputRef={inputRef}
                    value={inputValue}
                    onChange={handleOnChange}
                    onKeyUp={handleOnKeyUp}
                    onFocus={handleOnfocus}
                    {...props}
                />
            </div>

            {expand && (
                <>
                    <Modal className={styles.modal}>
                        <div ref={expandedContainerRef} className={`${styles.wrapper} ${styles.expand} ${className}`}>
                            <InputSearch
                                value={inputValue}
                                onChange={handleOnChange}
                                onKeyUp={handleOnKeyUp}
                                onFocus={handleOnfocus}
                                style={inputStyle}
                                autoFocus
                                {...props}
                            />
                            <div className={styles.itemContainer} style={itemContainerStyle}>
                                {children}
                            </div>
                        </div>
                    </Modal>
                </>
            )}
        </>
    );
};

export default forwardRef(AutoCompleteInputComponent);
