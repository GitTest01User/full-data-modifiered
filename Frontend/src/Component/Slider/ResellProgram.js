

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



                <div id="enterprisesales35555" className="owl-carousel3333">


                    <OwlCarousel items={3} margin={20} autoplay={true} {...options}>
                        <div className="item">

                            <div className="demo233">
                                <img src="/Digi2limage/f1.png" className="card-img-top" />
                            </div>
                        </div>
                        <div className="item">
                            <div className="demo233">
                                <img src="/Digi2limage/f2.png" className="card-img-top" />
                            </div>
                        </div>
                        <div className="item">
                            <div className="demo233">
                                <img src="/Digi2limage/f3.png" className="card-img-top" />
                            </div>
                        </div>
                        <div className="item">
                            <div className="demo233">
                                <img src="/Digi2limage/f4.png" className="card-img-top" />
                            </div>
                        </div>
                        <div className="item">

                            <div className="demo233">
                                <img src="/Digi2limage/f5.png" className="card-img-top" />
                            </div>

                        </div>



                    </OwlCarousel>
                </div>




            </div>

        )
    }
}


export default OwlDemo





