import React, { useEffect } from "react";
import { useLocation } from "react-router";

export const ScrollToTop = React.memo( (props: any) => {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return <>{props.children}</>
})