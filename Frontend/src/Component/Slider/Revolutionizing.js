



import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
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


                <div id="circulareconomy16664" className="owl-carousel7665">

                    <OwlCarousel items={4} margin={20} autoplay={true} {...options}>

                        <div className="item">
                            <div className="card border-0 mb-3 demo233"
                                style={{ borderRadius: '15px', boxShadow: '0px 1px 20px 4px #00000021' }}
                            >

                                <img src='/Digi2limage/222.png' className="card-img-top" />
                                <div className="card-body mark-Medium pb-0">
                                    <h6 className="poppins-SemiBold main_heading lh-base text-capitalize    text-start" >
                                        E-waste Generation in <br />India:
                                    </h6>
                                    <p className="poppins-Regular text-black">India generated 32 lakh tonnes (LT) of e-waste in 2019,</p>
                                    <div className="collapse p-0" id="collapseWidthExample1">
                                        <p className="poppins-Regular text-black">with the potential of extracting gold worth $0.7-1 billion from e-waste.</p>
                                    </div>
                                    <div className="mt-4 mb-4">
                                        <Link style={{ color: '#A7A7A7' }} data-bs-toggle="collapse" data-bs-target="#collapseWidthExample1">Read More<svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.94995 7.5L20.625 7.5" stroke="#A7A7A7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.6001 3.41669L20.6251 7.50002L16.6001 11.5834" stroke="#A7A7A7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>     </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="card border-0 mb-3 demo233" style={{ borderRadius: '15px', boxShadow: '0px 1px 20px 4px #00000021' }}>
                                <img src='/Digi2limage/333.png' className="card-img-top" />
                                <div className="card-body mark-Medium pb-0">
                                    <h6 className="poppins-SemiBold main_heading lh-base text-capitalize    text-start">Limited Recycling <br /> Capacity:</h6>
                                    <p className="poppins-Regular text-black">Most recyclers underutilize authorized capacity, </p>
                                    <div className="collapse p-0" id="collapseWidthExample2">
                                        <p className="poppins-Regular text-black">processing only 22% of 10.1 LT e-waste in 2019-20.</p>
                                    </div>
                                    <div className="mt-4 mb-4">
                                        <Link style={{ color: '#A7A7A7' }} data-bs-toggle="collapse" data-bs-target="#collapseWidthExample2">Read More<svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.94995 7.5L20.625 7.5" stroke="#A7A7A7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.6001 3.41669L20.6251 7.50002L16.6001 11.5834" stroke="#A7A7A7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>     </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="card border-0 mb-3 demo233"

                                style={{ borderRadius: '15px', boxShadow: '0px 1px 20px 4px #00000021' }}
                            >

                                <img src='/Digi2limage/444.png' className="card-img-top" />
                                <div className="card-body mark-Medium pb-0">
                                    <h6 className="poppins-SemiBold main_heading lh-base text-capitalize    text-start">Global Collection and Recycling Rates:</h6>
                                    <p className="poppins-Regular text-black">Globally, 17.4% formally collected and recycled in 2019; </p>
                                    <div className="collapse p-0" id="collapseWidthExample3">
                                        <p className="poppins-Regular text-black">developed countries have 50-70% rates. Predicted 747 LT e-waste generation by 2030.</p>
                                    </div>
                                    <div className="mt-4 mb-4">
                                        <Link style={{ color: '#A7A7A7' }} data-bs-toggle="collapse" data-bs-target="#collapseWidthExample3">Read More<svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.94995 7.5L20.625 7.5" stroke="#A7A7A7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.6001 3.41669L20.6251 7.50002L16.6001 11.5834" stroke="#A7A7A7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>     </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="card border-0 mb-3 demo233" style={{ borderRadius: '15px', boxShadow: '0px 1px 20px 4px #00000021' }}>
                                <img src='/Digi2limage/555.png' className="card-img-top" />
                                <div className="card-body mark-Medium pb-0">
                                    <h6 className="poppins-SemiBold main_heading lh-base text-capitalize   text-start">Robust Collection Chain Needed:</h6>
                                    <p className="poppins-Regular text-black">India lacks a dedicated e-waste collection chain,</p>
                                    <div className="collapse p-0" id="collapseWidthExample4">
                                        <p className="poppins-Regular text-black">hampers recycling. Investments required for eco-friendly metal recovery processes.</p>
                                    </div>
                                    <div className="mt-4 mb-4">
                                        <Link style={{ color: '#A7A7A7' }} data-bs-toggle="collapse" data-bs-target="#collapseWidthExample4">Read More<svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.94995 7.5L20.625 7.5" stroke="#A7A7A7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.6001 3.41669L20.6251 7.50002L16.6001 11.5834" stroke="#A7A7A7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>     </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="card border-0 mb-3 demo233" style={{ borderRadius: '15px', boxShadow: '0px 1px 20px 4px #00000021' }}>
                                <img src='/Digi2limage/666.png' className="card-img-top" />
                                <div className="card-body mark-Medium pb-0">
                                    <h6 className="poppins-SemiBold main_heading lh-base text-capitalize   text-start">Environmental and Health Implications:</h6>
                                   
                                    <p className="poppins-Regular text-black">E-waste recycling essential to prevent harm from toxic </p>
                                    <div className="collapse p-0" id="collapseWidthExample5">
                                        <p className="poppins-Regular text-black">substances like BFR and CFCs.</p>
                                    </div>
                                    <div className="mt-4 mb-4">
                                        <Link style={{ color: '#A7A7A7' }} data-bs-toggle="collapse" data-bs-target="#collapseWidthExample5">Read More<svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.94995 7.5L20.625 7.5" stroke="#A7A7A7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.6001 3.41669L20.6251 7.50002L16.6001 11.5834" stroke="#A7A7A7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>     </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="card border-0 mb-3 demo233" style={{ borderRadius: '15px', boxShadow: '0px 1px 20px 4px #00000021' }}>
                                <img src='/Digi2limage/777.png' className="card-img-top" />
                                <div className="card-body mark-Medium pb-0">
                                    <h6 className="poppins-SemiBold main_heading lh-base text-capitalize    text-start">Government Initiatives and Incentives:</h6>
                                    <p className="poppins-Regular text-black">E-waste Rules 2016 and SPECS promote formal..</p>
                                    <div className="collapse p-0" id="collapseWidthExample6">
                                        <p className="poppins-Regular text-black">recycling. Incentives for modern facilities and EPR implemented for
                                            e-waste management.</p>
                                    </div>
                                    <div className="mt-4 mb-4">
                                        <Link
                                         style={{ color: '#A7A7A7' }} data-bs-toggle="collapse" data-bs-target="#collapseWidthExample6">Read More<svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.94995 7.5L20.625 7.5" stroke="#A7A7A7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M16.6001 3.41669L20.6251 7.50002L16.6001 11.5834" stroke="#A7A7A7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>     </Link>
                                    </div>
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





