
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
            dots: true,

        }
    },
};

export class OwlDemo extends Component {

    render() {
        return (

            <div>


            <div id="enterprisesales15554" className="owl-carousel4444">
            <OwlCarousel items={3} margin={20} autoplay={true} {...options}>
                    <div className="item">
                        <div className="card border-0 mb-3 demo233"
                            style={{ borderRadius: '15px', boxShadow: '0px 1px 20px 4px #00000021' }}



                        >

                                <img src='/Digi2limage/s_10.png' className="card-img-top" />
                            <div className="card-body mark-Medium pb-0">
                                <h4 className="poppins-SemiBold main_heading lh-base text-capitalize" >
                                Digi2L Meeting With Digi2L Team
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="card border-0 mb-3 demo233" style={{ borderRadius: '15px', minHeight: `400px`, boxShadow: '0px 1px 20px 4px #00000021' }}
                        >

                                <img src='/Digi2limage/s_20.png' className="card-img-top" />
                            <div className="card-body mark-Medium pb-0">
                                <h4 className="poppins-SemiBold main_heading lh-base text-capitalize">Digi2L Submits Campaign Strategy</h4>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="card border-0 mb-3 demo233" style={{ borderRadius: '15px', minHeight: `400px`, boxShadow: '0px 1px 20px 4px #00000021' }}
                        >
<img src='/Digi2limage/s_30.png' className="card-img-top" />
                            <div className="card-body mark-Medium pb-0">
                                <h4 className="poppins-SemiBold main_heading lh-base text-capitalize">Customer Registers Exchange Details</h4>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="card border-0 mb-3 demo233" style={{ borderRadius: '15px', minHeight: `400px`,  boxShadow: '0px 1px 20px 4px #00000021' }}
                        >
                      <img src='/Digi2limage/s_40.png' className="card-img-top" />
                            <div className="card-body mark-Medium pb-0">
                                <h4 className="poppins-SemiBold main_heading lh-base text-capitalize">Customer Approves Exchange Price</h4>
                            </div>
                            <div className="card-footer border-0 p-0 bg-transparent">
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="card border-0 mb-3 demo233" style={{ borderRadius: '15px', minHeight: `400px`, boxShadow: '0px 1px 20px 4px #00000021' }}>
                          <img src='/Digi2limage/s_50.png'  className="card-img-top" />
                            <div className="card-body mark-Medium pb-0">
                                <h4 className="poppins-SemiBold main_heading lh-base text-capitalize">Product Quality Check</h4>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="card border-0 mb-3 demo233" style={{ borderRadius: '15px', minHeight: `400px`, boxShadow: '0px 1px 20px 4px #00000021' }}
                        >
                         <img src='/Digi2limage/s_60.png'  className="card-img-top" />
                            <div className="card-body mark-Medium pb-0">
                                <h4 className="poppins-SemiBold main_heading lh-base text-capitalize">Free Doorstep Pickup</h4>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="card border-0 mb-3 demo233"


                            style={{ borderRadius: '15px', minHeight: `400px`, boxShadow: '0px 1px 20px 4px #00000021' }}>
                       <img src='/Digi2limage/s_70.png'  className="card-img-top" />
                            <div className="card-body mark-Medium pb-0">
                                <h4 className="poppins-SemiBold main_heading lh-base text-capitalize">Spot Payment To Customer</h4>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="card border-0 mb-3 demo233" style={{ borderRadius: '15px', minHeight: `400px`, boxShadow: '0px 1px 20px 4px #00000021' }}>

                                <img src='/Digi2limage/s_80.png'  className="card-img-top" />
                            <div className="card-body mark-Medium pb-0">
                                <h4 className="poppins-SemiBold main_heading lh-base text-capitalize">Digi2L Submits Campaign Report</h4>
                            </div>
                        </div>
                    </div>
                    </OwlCarousel>
            </div>




        </div>


        )
    }
}


export default OwlDemo





