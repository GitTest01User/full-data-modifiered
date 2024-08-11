

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

  useEffect(()=>{
  
    $('.owl-prev').addClass('slick-prev slick-arrow')
   
    $('.owl-next').addClass('slick-next slick-arrow')
})
 
    return (
      <div>

        <div id="Digi2lPartner222" className="owl-carousel222" >


          <OwlCarousel items={4} margin={20} autoplay={true} {...options}>
           
          <div className="item slider">
                        <div className="card border-0 mb-3"
                            style={{ borderRadius: '15px', minHeight: '275px', boxShadow: '0px 1px 20px 4px #00000021' }}>

                            <div className="card-body mark-Medium pb-0">
                                <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="corporate33">
                                    End-To-End Execution Strategy                  </h6>

                            </div>
                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                <img style={{ borderRadius: '15px', width: '100%' }}
                                    src="/Digi2limage/exchange1.svg"
                                    alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="item slider">
                        <div className="card border-0 mb-3"

                            style={{ borderRadius: '15px', minHeight: '275px', boxShadow: '0px 1px 20px 4px #00000021' }}>

                            <div className="card-body mark-Medium pb-0">
                                <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="corporate34">
                                    Transparent Process With Complete Visibility</h6>

                            </div>
                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                <img style={{ borderRadius: '15px', width: '100%' }}
                                    src="/Digi2limage/exchange2.svg"
                                    alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="item slider">
                        <div className="card border-0 mb-3"
                            style={{ borderRadius: '15px', minHeight: '275px', boxShadow: '0px 1px 20px 4px #00000021' }}>

                            <div className="card-body mark-Medium pb-0">
                                <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="corporate35">
                                    Easy Registration And Onboarding                  </h6>

                            </div>
                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                <img style={{ borderRadius: '15px', width: '100%' }}
                                    src="/Digi2limage/exchange3.svg"
                                    alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="item slider">
                        <div className="card border-0 mb-3"
                            style={{ borderRadius: '15px', minHeight: '275px', boxShadow: '0px 1px 20px 4px #00000021' }}>

                            <div className="card-body mark-Medium pb-0">
                                <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="corporate36">
                                    No Logistics & Warehousing Cost</h6>

                            </div>
                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                <img style={{ borderRadius: '15px', width: '100%' }}
                                    src="/Digi2limage/exchange4.svg"
                                    alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="item slider">
                        <div className="card border-0 mb-3"
                            style={{ borderRadius: '15px', minHeight: '275px', boxShadow: '0px 1px 20px 4px #00000021' }}>

                            <div className="card-body mark-Medium pb-0">
                                <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="corporate37">
                                    No Reseller Scouting</h6>

                            </div>
                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                <img style={{ borderRadius: '15px', width: '100%' }}
                                    src="/Digi2limage/exchange5.svg"
                                    alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="item slider">
                        <div className="card border-0 mb-3"
                            style={{ borderRadius: '15px', minHeight: '275px', boxShadow: '0px 1px 20px 4px #00000021' }}>

                            <div className="card-body mark-Medium pb-0">
                                <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="corporate38">
                                    No productivity loss or cost over run </h6>

                            </div>
                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                <img style={{ borderRadius: '15px', width: '100%' }}
                                    src="/Digi2limage/exchange6.svg"
                                    alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="item slider">
                        <div className="card border-0 mb-3"
                            style={{ borderRadius: '15px', minHeight: '275px', boxShadow: '0px 1px 20px 4px #00000021' }}>

                            <div className="card-body mark-Medium pb-0">
                                <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="corporate40">
                                    Hassle free process</h6>

                            </div>
                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                <img style={{ borderRadius: '15px', width: '100%' }}
                                    src="/Digi2limage/exchange7.svg"
                                    alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="item slider">
                        <div className="card border-0 mb-3"
                            style={{ borderRadius: '15px', minHeight: '275px', boxShadow: '0px 1px 20px 4px #00000021' }}>

                            <div className="card-body mark-Medium pb-0">
                                <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="corporate41">
                                    Tech Enabled Platform</h6>

                            </div>
                            <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                                <img style={{ borderRadius: '15px', width: '100%' }}
                                    src="/Digi2limage/exchange8.svg"
                                    alt="" />
                            </div>
                        </div>
                    </div>

          </OwlCarousel>
        </div>








      </div>

    )
  
}













