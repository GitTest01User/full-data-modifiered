


import React, { Component } from 'react';
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
            <div className="slider item" >
              <div className="card border-0 mb-3  "

                style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                <div className="card-body mark-Medium pb-0">
                  <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="dealer8">
                    Transparent process with <br /> complete visibility</h6>

                </div>
                <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                  <img style={{ borderRadius: '15px', width: '100%'  }} src="/Digi2limage/slide1.svg" alt="" />
                </div>
              </div>
            </div>

            <div className="slider item" >
              <div className="card border-0 mb-3 "
                style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                <div className="card-body mark-Medium pb-0">
                  <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="dealer15">
                    24/7 Support</h6>

                </div>
                <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                  <img style={{ borderRadius: '15px', width: '100%' }} src="/Digi2limage/slide8.svg" alt="" />
                </div>
              </div>
            </div>

            <div className="slider item "  >
              <div className="card border-0 mb-3 "
                style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                <div className="card-body mark-Medium pb-0">
                  <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="dealer14">
                    High Return On <br /> Investment</h6>

                </div>
                <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                  <img style={{borderRadius: '15px', width: '100%'  }} src="/Digi2limage/slide7.svg" alt="" />
                </div>
              </div>
            </div>

            <div className="slider item" >
              <div className="card border-0 mb-3 "
                style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                <div className="card-body mark-Medium pb-0">
                  <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="dealer13">
                    Buy in units-Sell In <br /> Units</h6>

                </div>
                <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                  <img style={{ borderRadius: '15px', width: '100%'  }} src="/Digi2limage/slide6.svg" alt="" />
                </div>
              </div>
            </div>


            <div className="slider item"  >
              <div className="card border-0 mb-3 "
                style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                <div className="card-body mark-Medium pb-0">
                  <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="dealer12">
                    No investment in large <br /> Inventory</h6>

                </div>
                <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                  <img style={{ borderRadius: '15px', width: '100%'  }} src="/Digi2limage/slide5.svg" alt="" />
                </div>
              </div>
            </div>


            <div className="slider item" >
              <div className="card border-0 mb-3 "
                style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                <div className="card-body mark-Medium pb-0">
                  <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="dealer11">
                    Free delivery at your <br /> Doorstep </h6>

                </div>
                <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                  <img style={{ borderRadius: '15px', width: '100%' }} src="/Digi2limage/slide4.svg" alt="" />
                </div>
              </div>
            </div>

            <div className="slider item"  >
              <div className="card border-0 mb-3 "
                style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                <div className="card-body mark-Medium pb-0">
                  <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="dealer10">
                    Quality checked and <br /> graded products </h6>

                </div>
                <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                  <img style={{ borderRadius: '15px', width: '100%' }} src="/Digi2limage/slide3.svg" alt="" />
                </div>
              </div>
            </div>
            <div className="slider item" >
              <div className="card border-0 mb-3 "
                style={{ borderRadius: `15px`, minHeight: `275px`, boxShadow: `0px 1px 20px 4px #00000021` }}>

                <div className="card-body mark-Medium pb-0">
                  <h6 className="lh-base main_heading poppins-Bold text-capitalize text-start" id="dealer9">
                    Easy registration and <br /> onboarding</h6>

                </div>
                <div className="bg-transparent11111 border-0 card-footer p-0 text-end">
                  <img style={{borderRadius: '15px', width: '100%'}} src="/Digi2limage/slide2.svg" alt="" />
                </div>
              </div>
            </div>



          </OwlCarousel>
        </div>








      </div>

    )
  
}









