

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


                <div id="abb15555" className="owl-carousel1">


                    <OwlCarousel items={4} margin={20} autoplay={true} {...options}>
                        <div className="item">
                            <div className="card border-0 mb-3 demo233" style={{ borderRadius: '15px', minHeight: `400px`, boxShadow: '0px 1px 20px 4px #00000021' }}>

                                <img src='/Digi2limage/1222.png' className="card-img-top" />
                                <div className="card-body mark-Medium pb-0">
                                    <h4 className="main_heading poppins-SemiBold text-capitalize text-start" >
                                        Enhanced Customer <br />Loyalty:
                                    </h4>
                                    <p className="poppins-Regular text-black">ABB plan builds long-term relationships and trust by catering to customers' needs beyond the purchase.</p>
                                </div>
                                <div className="card-footer border-0 p-0 bg-transparent">
                                </div>
                            </div>
                        </div>


                        <div className="item">
                            <div className="card border-0 mb-3 demo233" style={{ borderRadius: '15px', minHeight: `400px`, boxShadow: '0px 1px 20px 4px #00000021' }}>

                                <img src='/Digi2limage/2.png' className="card-img-top" />
                                <div className="card-body mark-Medium pb-0">
                                    <h4 className="main_heading poppins-SemiBold text-capitalize text-start">Customer <br />Retention:</h4>
                                    <p className="poppins-Regular text-black">Best Return Price, Self-Quality Check, Free Pickup, and hassle-free services ensure peace of mind and retain customers.</p>
                                </div>
                                <div className="card-footer border-0 p-0 bg-transparent">
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="card border-0 mb-3 demo233"
                                style={{ borderRadius: '15px', minHeight: `400px`, boxShadow: '0px 1px 20px 4px #00000021' }}>

                                <img src='/Digi2limage/3.png' className="card-img-top" />
                                <div className="card-body mark-Medium pb-0">
                                    <h4 className="main_heading poppins-SemiBold text-capitalize text-start">Streamlined Appliance Upgradation:</h4>
                                    <p className="poppins-Regular text-black">Hassle-free upgrades keep customers up-to-date with the latest technology</p>
                                </div>
                                <div className="card-footer border-0 p-0 bg-transparent">
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="card border-0 mb-3 demo233" style={{ borderRadius: '15px', minHeight: `400px`, boxShadow: '0px 1px 20px 4px #00000021' }}>

                                <img src='/Digi2limage/4.png' className="card-img-top" />
                                <div className="card-body mark-Medium pb-0">
                                    <h4 className="main_heading poppins-SemiBold text-capitalize text-start">Environmental and Health Implications:</h4>
                                    <p className="poppins-Regular text-black">Responsible disposal methods promote sustainability and demonstrate environmental commitment.</p>
                                </div>
                                <div className="card-footer border-0 p-0 bg-transparent">
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="card border-0 mb-3 demo233" style={{ borderRadius: '15px', minHeight: `400px`, boxShadow: '0px 1px 20px 4px #00000021' }}
                            >

                                <img src='/Digi2limage/5.png' className="card-img-top" />
                                <div className="card-body mark-Medium pb-0">
                                    <h4 className="main_heading poppins-SemiBold text-capitalize text-start">Reduction of Electronic <br />Waste:</h4>
                                    <p className="poppins-Regular text-black">Upgrading appliances responsibly helps reduce electronic waste.</p>
                                </div>
                                <div className="card-footer border-0 p-0 bg-transparent">
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="card border-0 mb-3 demo233" style={{ borderRadius: '15px', minHeight: `400px`, boxShadow: '0px 1px 20px 4px #00000021' }}>

                                <img src='/Digi2limage/6.png' className="card-img-top" />
                                <div className="card-body mark-Medium pb-0">
                                    <h4 className="main_heading poppins-SemiBold text-capitalize text-start">Positive Brand <br /> Image:</h4>
                                    <p className="poppins-Regular text-black">ABB plan enhances brand image, customer trust, and reputation.</p>
                                </div>
                                <div className="card-footer border-0 p-0 bg-transparent">
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="card border-0 mb-3 demo233"
                                style={{ borderRadius: '15px', minHeight: `400px`, boxShadow: '0px 1px 20px 4px #00000021' }}>

                                <img src='/Digi2limage/7.png' className="card-img-top" />
                                <div className="card-body mark-Medium pb-0">
                                    <h4 className="main_heading poppins-SemiBold text-capitalize text-start">Competitive <br />Advantage:</h4>
                                    <p className="poppins-Regular text-black">ABB plan sets brands apart, attracting more customers and increasing market share.</p>
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





