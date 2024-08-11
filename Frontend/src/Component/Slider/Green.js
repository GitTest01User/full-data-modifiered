

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
            items: 4,
            dots: true,

        }
    },
};

export class OwlDemo extends Component {

    render() {
        return (


            <div>
            <div id="circulareconomy35544545" className="owl-carousel454545">
            <OwlCarousel items={4} margin={20} autoplay={true} {...options}>
                    <div className="item">
                        <div className="card border-0 mb-3 demo233"
                            style={{ borderRadius: `15px`, minHeight: `400px`, boxShadow: `0px 1px 20px 4px #00000021` }}

                        ><img src="/Digi2limage/demo1.png" className="card-img-top" />
                            <div className="card-body mark-Medium pb-0">
                                <h6 className="poppins-SemiBold main_heading lh-base text-capitalize" >
                                    Certificates of Sustainability:
                                </h6>
                                <p className="poppins text-black">We provide Green Certificates to your customers, showcasing their dedication to sustainable practices and environmental stewardship. These certificates serve as a tangible recognition of their efforts in promoting a greener planet.</p>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="card border-0 mb-3 demo233"
                            style={{ borderRadius: `15px`, minHeight: `400px`, boxShadow: `0px 1px 20px 4px #00000021` }}
                        >
                            <img src="/Digi2limage/demo2.png" className="card-img-top" />
                            <div className="card-body mark-Medium pb-0">
                                <h6 className="poppins-SemiBold main_heading lh-base text-capitalize">Extend Product Lifecycles:</h6>
                                <p className="poppins text-black">Emphasizing reuse and refurbishment extends product lifecycles, reducing waste and landfill accumulation.</p>
                            </div>
                            <div className="card-footer border-0 p-0 bg-transparent">
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="card border-0 mb-3 demo233"
                            style={{ borderRadius: `15px`, minHeight: `400px`, boxShadow: `0px 1px 20px 4px #00000021` }}
                        >
                            <img src="/Digi2limage/demo3.png" className="card-img-top" />
                            <div className="card-body mark-Medium pb-0">
                                <h6 className="poppins-SemiBold main_heading lh-base text-capitalize">Encourage Responsible Consumption:</h6>
                                <p className="poppins text-black">The circular economy promotes choosing repairable, upgradable, and recyclable products, creating economic opportunities and reducing waste.</p>
                            </div>
                            <div className="card-footer border-0 p-0 bg-transparent">
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="card border-0 mb-3 demo233"
                            style={{ borderRadius: `15px`, minHeight: `400px`, boxShadow: `0px 1px 20px 4px #00000021` }}>
                            <img src="/Digi2limage/demo4.png" className="card-img-top" />
                            <div className="card-body mark-Medium pb-0">
                                <h6 className="poppins-SemiBold main_heading lh-base text-capitalize">Climate Change Mitigation:</h6>
                                <p className="poppins text-black">Circular practices reduce greenhouse gas emissions from production, transportation, and waste management, contributing to a sustainable future with a minimized carbon footprint.</p>
                            </div>
                            <div className="card-footer border-0 p-0 bg-transparent">
                            </div>
                        </div>
                    </div>
                    </OwlCarousel>
            </div>



        </div >



        )
    }
}


export default OwlDemo





