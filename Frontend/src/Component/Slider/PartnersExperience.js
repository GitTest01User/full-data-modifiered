
import React, { Component } from "react";
import Slider from "react-slick";

export default class PartnersExprience extends Component {
    render() {
        const settings = {

            autoplay: true,
            autoplaySpeed: 1000,
            speed: 700,
            draggable: true,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]


        };
        return (
            <div>
                <div className="testimonial-slider2222">

                    <Slider {...settings}>

                        <div className="testimonial-slide position-relative">
                            <img className="img-fluid" src="/digi2limage/quote-2.svg"
                                alt="" style={{ position: 'absolute', top: '-11px' }} />
                            <div className="testimonial_box">
                                <div className="testimonial_box-top">
                                    <div className="testimonial_box-text pt-3">
                                        <p className="mark-Medium"><p>I am very happy with the product, service and support from digi2L. The service quality is par excellence and the concept is executed very well to the last detail.</p>
                                        </p>
                                    </div>
                                    <div className="testimonial_box-img">
                                        <img src="/digi2limage/testimonial_2-1.png.webp" />
                                    </div>

                                    <div className="">
                                        <p className="mark-Medium common_blue" style={{ font: '13px' }}><small>- Atikur Rahman, Star Refrigeration</small> </p>
                                    </div>
                                </div>

                            </div>
                            <img className="img-fluid" src="/digi2limage/quote-1.svg"
                                alt="" style={{ position: 'absolute', bottom: '-11px', right: '0px', zIndex: '-1' }} />
                        </div>




                        <div className="testimonial-slide position-relative">
                            <img className="img-fluid" src="/digi2limage/quote-2.svg"
                                alt="" style={{ position: 'absolute', top: '-11px' }} />
                            <div className="testimonial_box">
                                <div className="testimonial_box-top">
                                    <div className="testimonial_box-text pt-3">
                                        <p className="mark-Medium"><p>Our dealership has used Digi2L.com for approximately 5 years now and they have been great. Always there to help when we need it from the support team to our account managers.</p>
                                        </p>
                                    </div>
                                    <div className="testimonial_box-img">
                                        <img src="/digi2limage/testimonial_1-1.png.webp" />
                                    </div>

                                    <div className="">
                                        <p className="mark-Medium common_blue" style={{ font: '13px' }}><small>- Mahesh Prakhar, Founder, Mahesh Home Appliances</small> </p>
                                    </div>
                                </div>

                            </div>
                            <img className="img-fluid" src="/digi2limage/quote-1.svg"
                                alt="" style={{ position: 'absolute', bottom: '-11px', right: '0px', zIndex: '-1' }} />
                        </div>

                    </Slider>


                </div>









            </div>
        );
    }
}
