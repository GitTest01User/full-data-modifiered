



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
            items: 5,

        }
    },
};

export class OwlDemo extends Component {

    render() {
        return (
            <div>

                <div className="row justify-content-center mb-3" id="demmodssfsdf">
                    <div className="col-lg-12 col-sm-12">
                        <div className="row justify-content-center p-3">
                            <OwlCarousel items={5} margin={20} autoplay={true} {...options}>
                                <div className=" ">
                                    <div className="slider item  "  >
                                        <div className="card border-0 mb-3 "
                                            style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                                            <div className="card-body mark-Medium pb-0  pl-5">
                                                <h6 class="poppins-Bold main_heading text-capitalize text-start" id="smartsell30">
                                                    Self-Quality Check Beforehand            </h6>
                                                <p class="mb-0" id="smartsell31"><small>
                                                    Get a self-quality check done in the comfort of your home, and get best price for your old appliance.              </small></p>

                                            </div>
                                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                                <img style={{ borderRadius: '15px', width: '100%' }} src="/Digi2limage/slide1216.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className=" ">
                                    <div className="slider item " >
                                        <div className="card border-0 mb-3  "

                                            style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                                            <div className="card-body mark-Medium pb-0  pl-5">
                                                <h6 class="poppins-Bold main_heading text-capitalize text-start" id="smartsell22">
                                                    Free Doorstep Pickup            </h6>
                                                <p class="mb-0" id="smartsell23"><small>
                                                    Get hassle-free doorstep pickup at no extra cost.              </small></p>

                                            </div>
                                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                                <img style={{ borderRadius: '15px', width: '100%' }} src="/Digi2limage/slide1212.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>



                                </div>
                                <div className=" ">


                                    <div className="slider item " >
                                        <div className="card border-0 mb-3 "
                                            style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                                            <div className="card-body mark-Medium pb-0  pl-5">
                                                <h6 class="poppins-Bold main_heading text-capitalize text-start" id="smartsell24">
                                                    Best Exchange Value            </h6>
                                                <p class="mb-0" id="smartsell25"><small>
                                                    Get the best exchange rate for your old appliances in no time.              </small></p>

                                            </div>
                                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                                <img style={{ borderRadius: '15px', width: '100%' }} src="/Digi2limage/slide1213.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className=" ">


                                    <div className="slider item "  >
                                        <div className="card border-0 mb-3 "
                                            style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                                            <div className="card-body mark-Medium pb-0  pl-5">
                                                <h6 class="poppins-Bold main_heading text-capitalize text-start" id="smartsell26">
                                                    No hidden charges            </h6>
                                                <p class="mb-0" id="smartsell27"><small>
                                                    The price you see is the price you get. Get fixed prices as per the product condition with no hidden charges.              </small></p>

                                            </div>
                                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                                <img style={{ borderRadius: '15px', width: '100%' }} src="/Digi2limage/slide1214.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" ">
                                    <div className="slider item " >
                                        <div className="card border-0 mb-3 "
                                            style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                                            <div className="card-body mark-Medium pb-0  pl-5">
                                                <h6 class="poppins-Bold main_heading text-capitalize text-start" id="smartsell28">
                                                    Quick payment            </h6>
                                                <p class="mb-0" id="smartsell29"><small>
                                                    Payment is made instantly at the time of pickup.              </small></p>

                                            </div>
                                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                                <img style={{ borderRadius: '15px', width: '100%' }} src="/Digi2limage/slide1215.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>




                                </div>
                                <div className=" ">

                                    <div className="slider item "  >
                                        <div className="card border-0 mb-3 "
                                            style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                                            <div className="card-body mark-Medium pb-0  pl-5">
                                                <h6 class="poppins-Bold main_heading text-capitalize text-start" id="smartsell30">
                                                    Self-Quality Check           </h6>
                                                <p class="mb-0" id="smartsell31"><small>
                                                    Get a self-quality check done in the comfort of your home            </small></p>

                                            </div>
                                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                                <img style={{ borderRadius: '15px', width: '100%' }} src="/Digi2limage/slide1216.svg" alt="" />
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



