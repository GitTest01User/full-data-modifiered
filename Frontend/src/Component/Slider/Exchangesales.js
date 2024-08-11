

import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
const options = {
 
    responsiveClass: true,
    nav: false,
    dots: false,
    autoplay: false,
    navText: ["Prev", "Next"],
    smartSpeed: 1000,
    responsive: {
        0: {
            items: 1,
        },
        400: {
            items: 1,
            dots: false,
            margin: 30,
        },
        600: {
            items: 2,
            dots: false,
        },
        700: {
            items: 3,
            dots: false,
        },
        1000: {
            items: 3,
            dots: false,

        }
    },
};

export class OwlDemo extends Component {

    render() {
        return (

            <div>

                   <div id="exchange13222" className="owl-carousel112">
                               <div className="row">
            
                               <OwlCarousel items={3} margin={20} autoplay={true} {...options}>
                               <div className="item  ">
                                  <div className="card border-0 mb-3 demo233"
                                            style={{ borderRadius: `15px`,minHeight: `400px`, boxShadow: `0px 1px 20px 4px #00000021` }}>
                                            <img
                                                src="/digi2limage/boostedsalesfdfdf.png"
                                                className="card-img-top" />
                                            <div className="card-body mark-Medium pb-0">
                                                <h4 className="main_heading poppins-SemiBold text-capitalize text-start">
                                                    Boosted Sales:
                                                </h4>
                                                <p className='text-black'>Our exchange program drives increased sales by incentivizing customers to upgrade their old
                                                    appliances while enjoying the benefits.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item  ">
                                        <div className="card border-0 mb-3 demo233"
                                            style={{ borderRadius: `15px`,minHeight: `400px`, boxShadow: `0px 1px 20px 4px #00000021` }}>
                                            <img
                                                src="/digi2limage/loyaltybuilding.png"
                                                className="card-img-top" />
                                            <div className="card-body mark-Medium pb-0">
                                                <h4 className="main_heading poppins-SemiBold text-capitalize text-start">Loyalty Building:</h4>
                                                <p className='text-black'>Implementing an exchange program cultivates strong customer loyalty, fostering long-term
                                                    relationships and repeat business.</p>
                                            </div>
                                            <div className="card-footer border-0 p-0 bg-transparent">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item ">
                                        <div className="card border-0 mb-3 demo233"
                                            style={{ borderRadius: `15px`, minHeight: `400px`, boxShadow: `0px 1px 20px 4px #00000021` }}>
                                            <img
                                                src="/digi2limage/sustainabilitychampion.png"
                                                className="card-img-top" />
                                            <div className="card-body mark-Medium pb-0">
                                                <h4 className="poppins-SemiBold main_heading text-capitalize">Sustainability Champion:</h4>
                                                <p className='text-black'>Our exchange program actively promotes sustainable practices by encouraging customers to recycle
                                                    and reuse their old appliances.</p>
                                            </div>
                                            <div className="card-footer border-0 p-0 bg-transparent">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="card border-0 mb-3 demo233"
                                            style={{ borderRadius: `15px`, minHeight: `400px`, boxShadow: `0px 1px 20px 4px #00000021` }}>
                                            <img
                                                src="/digi2limage/competitiveedge.png"
                                                className="card-img-top" />
                                            <div className="card-body mark-Medium pb-0">
                                                <h4 className="main_heading poppins-SemiBold text-capitalize text-start">Competitive Edge:</h4>
                                                <p className='text-black'>Our exchange program offers a unique value proposition, attracting convenience-seeking customers.
                                                </p>
                                            </div>
                                            <div className="card-footer border-0 p-0 bg-transparent">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="card border-0 mb-3 demo233"
                                            style={{ borderRadius: `15px`,minHeight: `400px`, boxShadow: `0px 1px 20px 4px #00000021` }}>
                                            <img
                                                src="/digi2limage/upsellingopportunities.png"
                                                className="card-img-top" />
                                            <div className="card-body mark-Medium pb-0">
                                                <h4 className="main_heading poppins-SemiBold text-capitalize text-start">Upselling Opportunities:</h4>
                                                <p className='text-black'>Exchange program facilitates showcasing newer models, enhancing upselling opportunities.</p>
                                            </div>
                                            <div className="card-footer border-0 p-0 bg-transparent">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="card border-0 mb-3 demo233"
                                            style={{ borderRadius: `15px`, minHeight: `400px`, boxShadow: `0px 1px 20px 4px #00000021` }}>
                                            <img
                                                src="/digi2limage/marketexpansion.png"
                                                className="card-img-top" />
                                            <div className="card-body mark-Medium pb-0">
                                                <h4 className="main_heading poppins-SemiBold text-capitalize text-start">Market Expansion:</h4>
                                                <p className='text-black'>By implementing an appliance exchange program, we can attract new customers and expand our market
                                                    reach.</p>
                                            </div>
                                            <div className="card-footer border-0 p-0 bg-transparent">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="card border-0 mb-3 demo233"
                                            style={{ borderRadius: `15px`,minHeight: `400px`, boxShadow: `0px 1px 20px 4px #00000021` }}>
                                            <img
                                                src="/digi2limage/positivepublicimage.png"
                                                className="card-img-top" />
                                            <div className="card-body mark-Medium pb-0">
                                                <h4 className="main_heading poppins-SemiBold text-capitalize text-start">Positive Public Image:</h4>
                                                <p className='text-black'>Exchange program showcases our commitment to sustainability and social responsibility, fostering
                                                    a caring community perception.</p>
                                            </div>
                                            <div className="card-footer border-0 p-0 bg-transparent">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="card border-0 mb-3 demo233"
                                            style={{ borderRadius: `15px`,minHeight: `400px`, boxShadow: `0px 1px 20px 4px #00000021` }}>
                                            <img
                                                src="/digi2limage/smoothoperations.png"
                                                className="card-img-top" />
                                            <div className="card-body mark-Medium pb-0">
                                                <h4 className="main_heading poppins-SemiBold text-capitalize text-start">Smooth Operations:</h4>
                                                <p className='text-black'>We provide comprehensive tech support services to both customers and businesses, ensuring
                                                    seamless operations and resolving any technical issues swiftly.</p>
                                            </div>
                                            <div className="card-footer border-0 p-0 bg-transparent">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="card border-0 mb-3 demo233"
                                            style={{ borderRadius: `15px`,minHeight: `400px`, boxShadow: `0px 1px 20px 4px #00000021` }}>
                                            <img
                                                src="/digi2limage/qualityassurance.png"
                                                className="card-img-top" />
                                            <div className="card-body mark-Medium pb-0">
                                                <h4 className="main_heading poppins-SemiBold text-capitalize text-start">Quality Assurance:</h4>
                                                <p className='text-black'>Our exchange program includes a complimentary quality check for all appliances, guaranteeing that
                                                    they meet our standards for resale or recycling.</p>
                                            </div>
                                            <div className="card-footer border-0 p-0 bg-transparent">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="card border-0 mb-3 demo233"
                                            style={{ borderRadius: `15px`,minHeight: `400px`, boxShadow: `0px 1px 20px 4px #00000021` }}>
                                            <img
                                                src="/digi2limage/convenientpickup.png"
                                                className="card-img-top" />
                                            <div className="card-body mark-Medium pb-0">
                                                <h4 className="main_heading poppins-SemiBold text-capitalize text-start">Convenient Pickup:</h4>
                                                <p className='text-black'>We offer a hassle-free doorstep pickup service, saving customers valuable time and effort.</p>
                                            </div>
                                            <div className="card-footer border-0 p-0 bg-transparent">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="card border-0 mb-3 demo233"
                                            style={{ borderRadius: `15px`,minHeight: `400px`, boxShadow: `0px 1px 20px 4px #00000021` }}>
                                            <img
                                                src="/digi2limage/bestvalueguarantee.png"
                                                className="card-img-top" />
                                            <div className="card-body mark-Medium pb-0">
                                                <h4 className="main_heading poppins-SemiBold text-capitalize text-start">Best Value Guarantee:</h4>
                                                <p className='text-black'>We pride ourselves on offering the best prices for old appliances in the market, ensuring that
                                                    customers receive fair value for their items.</p>
                                            </div>
                                            <div className="card-footer border-0 p-0 bg-transparent">
                                            </div>
                                        </div>
                                    </div>
            
                                    </OwlCarousel>
                                
                                </div>
                            </div>
            
            
            
            
                        </div >
           

             

        )
    }
}


export default OwlDemo









