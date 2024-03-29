import React, {ChangeEvent, Dispatch, useCallback, useEffect, useRef, useState} from 'react';
import {addNotification} from "../../../../_bll/main/appReducer";
import {v1} from "uuid";
import styles from "../../Template.module.scss";
import {useAppDispatch} from "../../../../_bll/main/store";

type InputImgType = {
    nickNameValue?: string
    checkChangeName?: boolean
    setFileURL: Dispatch<any>
    setFile64: Dispatch<any>
    setError: Dispatch<boolean>
    setErrorTypeFile: Dispatch<boolean>
}

export const InputImg: React.FC<InputImgType> = React.memo( (props) => {
    const {
        setFileURL,
        setFile64,
        setError,
        setErrorTypeFile,
        checkChangeName,
        nickNameValue,
    } = props

    let dispatch = useAppDispatch()
    const inRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<any>();

    const checkTypeFile = useCallback( () => {
        switch (file.type) {
            case 'image/png':
            case 'image/jpg':
            case 'image/jpeg':
                setError(false)
                return false
            default:
                dispatch(addNotification({
                    type: "error",
                    message: `The file type must be png, jpg or jpeg`,
                    id: v1(),
                }))
                setError(true)
                return true
        }
    }, [dispatch, setError, file])

    const upload = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const newFile = e.target.files && e.target.files[0];

        if (newFile) {
            setFile(newFile);
            setFileURL(window.URL.createObjectURL(newFile));
            reader.onloadend = () => {
                setFile64(reader.result);
            };
            reader.readAsDataURL(newFile);
        }
    }, [setFile64, setFileURL])

    useEffect(() => {
        if (checkChangeName || file !== undefined) {
            setError(false)
        } else {
            setError(true)
        }
        if (file && +file.size >= 2097152) {
            setError(true)
        }

    }, [checkChangeName, file, setError])


    useEffect(() => {
        if (file !== undefined) {
            if (+file.size <= 2097152) {
                setError(false)
            } else {
                setError(true)
                dispatch(addNotification({
                    type: "error",
                    message: `Image size should not exceed 2 megabytes`,
                    id: v1(),
                }))
            }
            setErrorTypeFile(checkTypeFile())
        }
    }, [file, nickNameValue, dispatch, setErrorTypeFile, checkTypeFile, setError])

    return (
        <>
            <input
                ref={inRef}
                type={'file'}
                style={{display: 'none'}}
                onChange={upload}
                accept=".jpg, .jpeg, .png"
            />
            <span onClick={() => inRef && inRef.current && inRef.current.click()}
                  className={styles.changeAvatar}>&#9998;</span>
        </>
    )
})
