"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import { useEffect } from "react";

const ProgressBarProvider = ({ children }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    useEffect(() => {
        NProgress.done();
        return () => {
            NProgress.start();
        };
    }, [searchParams, pathname])

    return (
        <>
            {children}
            <ProgressBar
                height="3px"
                color="#FACC15"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </>
    );
};

export default ProgressBarProvider;