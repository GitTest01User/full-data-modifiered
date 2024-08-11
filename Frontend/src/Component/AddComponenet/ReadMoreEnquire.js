

import React, { useState } from "react";

function ReadMoreEnquire() {
    const [isShowMore, setIsShowMore] = useState(false);

    const toggleReadMoreLess = () => {
        setIsShowMore(!isShowMore);
    };

    return (
        <div className="cardddd">


            <p className="lh-base mark-Bold para_first" > It is a proven fact that success of primary market relies heavily on the penetration of the secondary market. Product exchange program has hence become a great sale enabler in the durable industry. However, managing a product exchange campaign is a complex process of connecting retailers, resellers, and the sales team in a highly unorganized used
                appliances market like India.  </p>
            {isShowMore && (
                <p className="lh-base mark-Bold para_first" >
                    The huge cost overrun, reverse logistics, warehousing, managing the
                liquidation and reconciliation takes the focus off from your primary market sales to an unproductive
                secondary sale. 
                    This is where Digi2L as an organization makes the difference in ensuring a complete
                    end-to-end execution strategy of the product exchange program with finesse and perfection. So, no more
                    worries on logistics or storage of exchanged products and no scouting for resellers. What's more,
                    we make instant payment to customers on exchanged products. Just leave it to us, and your team can
                    focus on primary sales to create the competitive edge in the market.
                </p>
            )}

            <button onClick={toggleReadMoreLess} className="btn my-3 py-3 btn-gradient">
                {isShowMore ? "Read Less" : "Read More"}
            </button>
        </div>
    );
}

export default ReadMoreEnquire;
