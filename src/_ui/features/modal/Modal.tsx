import React, {CSSProperties} from 'react';

interface IModal {
    enableBackground?: boolean;
    backgroundStyle?: CSSProperties;
    backgroundOnClick?: () => void;

    width: number;
    height: number;
    modalStyle?: CSSProperties;
    modalOnClick?: () => void;
    modalClassName: string

    show: boolean
    children: React.ReactNode
}

const Modal: React.FC<IModal> = (
    {
        enableBackground,
        backgroundStyle,
        backgroundOnClick = () => {
        },

        width,
        height,
        modalStyle,
        modalOnClick = () => {
        },
        modalClassName,

        show,
        children,
    }
) => {
    const top = `calc(50vh - ${height / 2}px)`;
    const left = `calc(50vw - ${width / 2}px)`;

    if (!show) return null;

    return (
        <>
            {enableBackground && <div
                style={{
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    width: '100vw',
                    height: '100vh',

                    background: 'black',
                    opacity: 0.35,
                    zIndex: 20,

                    ...backgroundStyle,
                }}
                onClick={backgroundOnClick}
            />}
            <div
                style={{
                    position: 'fixed',
                    top,
                    left,
                    width,
                    height,
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',

                    background: '',
                    zIndex: 21,

                    ...modalStyle,
                }}
                className={modalClassName}
                onClick={modalOnClick}
            >
                {children}
            </div>
        </>
    );
};

export default Modal;