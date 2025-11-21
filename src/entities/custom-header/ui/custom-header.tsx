import React from 'react';
import {Link} from "next-view-transitions";

export const CustomHeader = () => {
    return (
        <div className="custom-header flex items-center justify-between lg:py-14 py-12">
            <div className="">
                <Link href='/' className="heading-2 no-underline hover:underline">Hung Van (Paul)</Link>
                <div>Junior Frontend Engineer</div>
             </div>
        </div>
    );
};

