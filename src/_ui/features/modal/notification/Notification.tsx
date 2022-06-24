import React, {useEffect, useState} from 'react';
import styles from './notification.module.scss'
import {useAppDispatch} from "../../../../_bll/main/store";
import {removeNotification} from "../../../../_bll/main/appReducer";

export type NotificationType = {
    id: string
    type: Type
    message: string
}

export type Type = "success" | "error"
type setIntervalType = ReturnType<typeof setInterval>

export const Notification: React.FC<NotificationType> = ({id, type, message}) => {
    const [exit, setExit] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<setIntervalType>();

    const dispatch = useAppDispatch()

    const handleStartTimer = () => {
        const idInterval = setInterval(() => {
            setWidth((prev) => {
                if (prev < 100) {
                    return prev + 0.5
                }
                clearInterval(idInterval)
                return prev
            })
        }, 20)
        setIntervalId(idInterval)
    }

    const handlePauseTimer = () => {
        clearInterval(intervalId)
    }

    const handleCloseNotification = () => {
        handlePauseTimer()
        setExit(true)
        setTimeout(() => {
            dispatch(removeNotification(id))
        }, 400)
    }


    useEffect(() => {
        if (width === 100) {
            //close Notification
            handleCloseNotification()
        }
    }, [width]);

    useEffect(() => {
        handleStartTimer()
    }, []);

    return (
        <div onMouseLeave={handleStartTimer}
             onMouseEnter={handlePauseTimer}
             className={`${styles.notificationItem} ${exit ? styles.exit : ''}`}>
            <p className={`${styles.message}  ${type === "error" && styles.error}`}>{message}</p>
            <div style={{'width': `${width}%`}}
                 className={`${styles.bar} ${type === "success" ? styles.success : styles.error}`}/>
        </div>
    );
};
