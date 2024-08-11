

import React from 'react';
import OwlCarousel from 'react-owl-carousel';

import $ from 'jquery';
import { useEffect } from 'react';



const options = {
    margin: 20,
    responsiveClass: true,
    nav: true,
    dots: true,
    autoplay: false,
    navText: ["", ""],
    smartSpeed: 1000,
    responsive: {
        0: {
            items: 1,
        },
        400: {
            items: 1,
            dots: false,
            margin: 30,
            nav: false,
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

export default function OwlDemo() {

    useEffect(() => {

        $('.owl-prev').addClass('slick-prev slick-arrow')

        $('.owl-next').addClass('slick-next slick-arrow')

      

    })

    return (
        <div>

            <div id="Digi2lPartner222" className="owl-carousel222" >


                <OwlCarousel items={4} margin={20} autoplay={true} {...options}>

                    <div className="slider item">
                        <div className="card border-0 mb-3 "
                            style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                            <div className="card-body mark-Medium pb-0">
                                <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="dealer15">
                                    End-To-End Transparent Process</h6>

                            </div>
                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                <img src="/Digi2limage/resell1.svg" style={{ borderRadius: '15px', width: '100%' }} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="slider item">
                        <div className="card border-0 mb-3 "
                            style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                            <div className="card-body mark-Medium pb-0">
                                <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="dealer14">
                                    Tech Enabled</h6>

                            </div>
                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                <img src="/Digi2limage/resell2.svg" style={{ borderRadius: '15px', width: '100%' }} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="slider item">
                        <div className="card border-0 mb-3 "
                            style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                            <div className="card-body mark-Medium pb-0">
                                <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="dealer13">
                                    Single Window Disposal   </h6>

                            </div>
                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                <img src="/Digi2limage/resell3.svg" style={{ borderRadius: '15px', width: '100%' }} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="slider item">
                        <div className="card border-0 mb-3 "

                            style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                            <div className="card-body mark-Medium pb-0">
                                <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="dealer8">

                                    No Logistics Or Storage Cost</h6>

                            </div>
                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                <img src="/Digi2limage/resell4.svg" style={{ borderRadius: '15px', width: '100%' }} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="slider item">
                        <div className="card border-0 mb-3 "
                            style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                            <div className="card-body mark-Medium pb-0">
                                <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="dealer9">

                                    Spot Payment</h6>

                            </div>
                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                <img src="/Digi2limage/resell5.svg" style={{ borderRadius: '15px', width: '100%' }} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="slider item">
                        <div className="card border-0 mb-3 "
                            style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                            <div className="card-body mark-Medium pb-0">
                                <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="dealer10">

                                    Free Doorstep Pickup </h6>

                            </div>
                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                <img src="/Digi2limage/resell6.svg" style={{ borderRadius: '15px', width: '100%' }} alt="" />
                            </div>
                        </div>
                    </div>


                </OwlCarousel>
            </div>








        </div>

    )

}













