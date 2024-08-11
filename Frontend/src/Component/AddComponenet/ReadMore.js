

import React, { useState } from "react";

function ReadMoreLess() {
    const [isShowMore, setIsShowMore] = useState(false);

    const toggleReadMoreLess = () => {
        setIsShowMore(!isShowMore);
    };

    return (
        <div className="cardddd">
       

            <p className="lh-base mark-Bold para_first" >Every appliance has a particular lifespan. The use of appliances also depends on their condition, if an appliance is used excessively they tend to cause more repairs even if you do not use an appliance for a
                longer time still it might cause rust issues and damage internally. There are so many technological advances every year. New appliances come with many advanced features which benefit the consumer in many ways. </p>

            {isShowMore && (
                <p  className="lh-base mark-Bold para_first" >
                    Upgrading after a particular time provides one with the benefits such as a good return price for your old appliance and you can explore and enjoy new tech. Will save you from becoming a victim of heavy electricity bills and also avoid any short circuits which are usually caused by a used appliance.
                </p>
            )}

            <button onClick={toggleReadMoreLess} className="btn my-3 py-3 btn-gradient">
                {isShowMore ? "Read Less" : "Read More"}
            </button>
        </div>
    );
}

export default ReadMoreLess;
