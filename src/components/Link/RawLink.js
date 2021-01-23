import {Link} from "react-router-dom";
import React from "react";

const RawLink = ({children, ...props}) => {
    return (
        <Link {...props} style={{textDecoration: 'none', color: 'inherit'}}>{children}</Link>
    )
}


export default RawLink;