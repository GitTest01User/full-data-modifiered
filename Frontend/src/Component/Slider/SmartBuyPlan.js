



import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
const options = {
    margin: 20,
    responsiveClass: true,
    nav: false,
    dots: true,
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

        }
    },
};

export class OwlDemo extends Component {

    render() {
        return (
            <div>

                <div className="row justify-content-center mb-3" id="demmodssfsdf">
                    <div className="col-lg-12 col-sm-10">
                        <div className="row justify-content-center p-3">

                            <OwlCarousel items={4} margin={20} autoplay={true} {...options}>
                                <div className="">
                                    <div className="slider item " >
                                        <div className="card border-0 mb-3  "

                                            style={{ borderRadius: `15px`, minHeight: `385px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                                            <div className="card-body mark-Medium pb-0">
                                                <h6 class="poppins-Bold main_heading text-capitalize">Best buyback value guaranteed</h6>
                                                <p class="mb-0"><small> Digi2L:Assured Buyback Plan guarantees the best value for your appliances and gadgets
                                                    today, for a resale of up to 5 years. So why wait ! Choose the best plan that suits you.</small></p>

                                            </div>
                                            <div className="bg-transparent222222 border-0  p-0 text-end">
                                                <img style={{ borderRadius: '15px', width: '100%' }} src="/Digi2limage/icon1434334.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="">

                                    <div className="slider item" >
                                        <div className="card border-0 mb-3 "
                                            style={{ borderRadius: `15px`, minHeight: `385px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                                            <div className="card-body mark-Medium pb-0">
                                                <h6 class="poppins-Bold main_heading text-capitalize">Seamless, Hassle-Free Buybacks</h6>
                                                <p class="mb-0"><small>No worries, no tension, just sit and relax. Our executives will do a free
                                                    doorstep pickup and instantly credit the assured buyback value into your account.
                                                </small></p>

                                            </div>
                                            <div className="bg-transparent222222 border-0  p-0 text-end">
                                                <img style={{ borderRadius: '15px', width: '100%' }} src="/Digi2limage/slide1215.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="">

                                    <div className="slider item "  >
                                        <div className="card border-0 mb-3 "
                                            style={{ borderRadius: `15px`, minHeight: `385px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                                            <div className="card-body mark-Medium pb-0">
                                                <h6 class="poppins-Bold main_heading text-capitalize">Protection against price variations</h6>
                                                <p class="mb-0"><small> No need to worry about model discontinuity or price fluctuations during resale
                                                    of your used appliances. Your price is protected and guaranteed.
                                                </small></p>

                                            </div>
                                            <div className="bg-transparent222222 border-0  p-0 text-end">
                                                <img style={{ borderRadius: '15px', width: '100%' }} src="/Digi2limage/icon332332.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="slider item" >
                                        <div className="card border-0 mb-3 "
                                            style={{ borderRadius: `15px`, minHeight: `385px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                                            <div className="card-body mark-Medium pb-0">
                                                <h6 class="poppins-Bold main_heading text-capitalize">Easy Upgrades with great savings</h6>
                                                <p class="mb-0"><small>Upgrading to new models become easier and cheaper with the Digi2L:Assured Buyback Plan
                                                    that guarantees a fixed price for your used appliances.</small></p>
                                            </div>
                                            <div className="bg-transparent222222 border-0  p-0 text-end">
                                                <img style={{ borderRadius: '15px', width: '100%' }} src="/Digi2limage/icon43424234234.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>




                                </div>
                                <div className="">


                                    <div className="slider item" >
                                        <div className="card border-0 mb-3 "
                                            style={{ borderRadius: `15px`, minHeight: `385px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                                            <div className="card-body mark-Medium pb-0">
                                                <h6 class="poppins-Bold main_heading text-capitalize">Seamless, Hassle-Free Buybacks</h6>
                                                <p class="mb-0"><small>No worries, no tension, just sit and relax. Our executives will do a free
                                                    doorstep pickup and instantly credit the assured buyback value into your account.
                                                </small></p>

                                            </div>
                                            <div className="bg-transparent222222 border-0  p-0 text-end">
                                                <img style={{ borderRadius: '15px', width: '100%' }} src="/Digi2limage/slide1213.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="">

                                    <div className="slider item " >
                                        <div className="card border-0 mb-3  "

                                            style={{ borderRadius: `15px`, minHeight: `385px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                                            <div className="card-body mark-Medium pb-0">
                                                <h6 class="poppins-Bold main_heading text-capitalize">Best buyback value guaranteed</h6>
                                                <p class="mb-0"><small> Digi2L:Assured Buyback Plan guarantees the best value for your appliances and gadgets
                                                    today, for a resale of up to 5 years. So why wait ! Choose the best plan that suits you.</small></p>

                                            </div>
                                            <div className="bg-transparent222222 border-0  p-0 text-end">
                                                <img style={{ borderRadius: '15px', width: '100%' }} src="/Digi2limage/icon1434334.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </OwlCarousel>
                        </div>

                    </div>
                </div>








            </div>

        )
    }
}


export default OwlDemo



