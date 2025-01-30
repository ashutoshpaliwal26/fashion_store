'use client'

import { useEffect, useState } from "react"

type messageType = "SUCCESS" | "ERROR"

const Toast = () => {
    const [show, setShow] = useState<boolean>(false);
    const [toasMessage, setToastMessage] = useState<string>("");
    const [error, setError] = useState<messageType>("SUCCESS");

    const showToast = (message: string, type: messageType="SUCCESS", duration: number | undefined) => {
        setShow(true);
        setError(type);
        setToastMessage(message);
        setTimeout(() => {
            setShow(false);
        }, duration)
    }

    useEffect(() => {
        window.showToast = showToast;
    }, [])

    return (
        <>
            {show && <div className={`z-20 absolute animate-toast top-20 left-1/3 w-1/3 ${error=="SUCCESS" ? 'bg-green-900' : 'bg-red-800'} p-3 rounded-xl border-2 border-gray-400 flex justify-center items-center ml-10 mr-32`}>
                <p className="text-white font-semibold">{toasMessage}</p>
            </div>}
        </>
    )
}

export default Toast