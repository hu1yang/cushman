import React, { useEffect } from "react";
import { Loader } from './style'
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { Spin} from 'antd'

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const Loading = () => {
    useEffect(() => {
        NProgress.start();
        return () => {
          NProgress.done();
        };
    }, []);
    return (
        <Loader className="app-container">
            <Spin />
        </Loader>
    );
}
export default Loading