
import React, { Component } from "react";
import Slider from "react-slick";

export default class ProgramSlider extends Component {
    render() {

        const settings = {

            autoplay: true,
            autoplaySpeed: 1000,
            speed: 700,
            draggable: true,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
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



                <div id="programpartnership454545" className="owl-carousel5454455">
                    <Slider {...settings}>
                        <div className="item">
                            <img src='/Digi2limage/s_1.png' className="card-img-top" />
                        </div>
                        <div className="item">
                            <img src='/Digi2limage/s_2.png' className="card-img-top" />
                        </div>
                        <div className="item">
                            <img src='/Digi2limage/s_3.png' className="card-img-top" />
                        </div>
                        <div className="item">
                            <img src='/Digi2limage/s_4.png' className="card-img-top" />
                        </div>
                        <div className="item">
                            <img src='/Digi2limage/s_1.png' className="card-img-top" />
                        </div>
                        <div className="item">
                            <img src='/Digi2limage/s_1.png' className="card-img-top" />
                        </div>
                        <div className="item">
                            <img src='/Digi2limage/s_2.png' className="card-img-top" />
                        </div>
                        <div className="item">
                            <img src='/Digi2limage/s_3.png' className="card-img-top" />
                        </div>
                        <div className="item">
                            <img src='/Digi2limage/s_4.png' className="card-img-top" />
                        </div>
                        <div className="item">
                            <img src='/Digi2limage/s_1.png' className="card-img-top" />
                        </div>

                    </Slider>
                </div>





            </div>


        );
    }
}
