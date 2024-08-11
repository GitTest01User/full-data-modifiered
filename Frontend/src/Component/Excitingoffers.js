import React from 'react'
import Offers from './Slider/Offers'
import HaveAQuestion from './AddComponenet/HaveAQuestion'
import PostApi from '../WebService/PostApi'



export default function Excitingoffers() {
  
    
    return (
        <div>
            <title>Exciting Offers - Digi2L</title>

            <div>
                <section id="hero_banner">
                    <div className="wrapper_herobanner54545 position-relative"

                        style={{ backgroundImage: `url("/Digi2limage/themes/digi2l/assets/images/pages_slider/offers/img1.png")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: "500px"}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-1"></div>
                                <div className="col-lg-5 col-md-6 d-flex align-items-center mt-5" style={{ height: "400px" ,marginTop:'80px'}} >
                                    <h1 className="text-capitalize lh-base text-white poppins-Bold mt-5 pt-5" id="eoffer1" style={{zIndex:'99999'}}>Unbelievable Offers <br></br> At Unbeatable Prices!</h1>
                                </div>
                                <div className="col-lg-5 col-md-6 mt-5" id="eoffer1" style={{ position: 'absolute', right:'0' ,bottom:'0'}}>
                                    <img 
                                        src="/Digi2limage/uploads/2022/12/img2-11.png"
                                        className="img-fluid pt-5" />
                                </div>
                                <div className="col-lg-1"></div>
                            </div>

                        </div>
                    </div>
                </section>



                <section className="offer_Section">
                    <div className="testimonial_section py-4 mb-3">
                        <div className="text-center">
                            <h1 className="lh-base poppins-SemiBold py-4" id="eoffer3">Ongoing Offers</h1>
                        </div>
                     
                        <Offers/>
                    </div>
                </section>


                <section className=" section_bg section_bg">
                    <div className="container pb-5 px-3 py-3">
                        <h1 style={{color:'#070139'}}  className="poppins-SemiBold text-center px-2 py-4" id="eoffer4">We Love To Hear From You</h1>
                       <HaveAQuestion id='ExcitingOffer' Api={PostApi.ExcitingOffersPostApi}/>
                    </div>
                </section>
            </div>

        </div>
    )
}
