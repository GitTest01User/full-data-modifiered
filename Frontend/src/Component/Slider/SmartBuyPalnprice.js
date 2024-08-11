import React from 'react'
import { SwiperSlide } from 'swiper/react';
import Swiper from './Swiper';

export default function SmartBuyPalnprice() {

    return (
        <div className=''>
            <Swiper style={{ marginRight: '20px', overflow: 'hidden' }}
                spaceBetween={20}
                slidesPerView={4}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                grabCursor={true}
                // modules={[Navigation]}
                dots={true}
                loop={true}



                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 24,
                    },
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 1,
                        spaceBetween: 24,
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                        slidesPerGroup: 1,
                    },
                    1336: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1936: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },

                }}

            >
                


                <div className="owl-stage-outer222 owl-height2222"  style={{ height: `401px` }}>
                    <div className="owl-stage2222" style={{
                        transform: `translate3d(0px, 0px, 0px)`, transition: `all 0s ease 0s`,

                    }}>





                        <SwiperSlide>
                            <div className="owl-item active" style={{ width: `312px`, marginRight: `20px` }}>
                                <div className="item">
                                    <div className="card border-0 mb-3" style={{
                                        borderRadius: `15px`, minHeight: `385px`, boxShadow: `0px 1px
                    20px 4px #00000021`}}>

                                        <div className="card-body mark-Medium pb-0 px-xl-4">
                                            <h6 className="poppins-Bold main_heading text-capitalize">Easy Upgrades with great savings</h6>
                                            <p >Upgrading to new models become easier and cheaper with the Digi2L Smart Buy
                                                Plan
                                                that guarantees a fixed price for your used appliances.</p>
                                        </div>
                                        <div className="card-footer border-0 p-0 bg-transparent">
                                            <img style={{ borderRadius: `15px`, width: `100%` }} src={require('/Digi2limage/smartBuy/icon4.svg').default}
                                                alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="owl-item active" style={{ width: `312px`, marginRight: `20px` }}>
                                <div className="item">
                                    <div className="card border-0 mb-3" style={{
                                        borderRadius: `15px`, minHeight: `385px`, boxShadow: `0px 1px
                    20px 4px #00000021`}}>

                                        <div className="card-body mark-Medium pb-0 px-xl-4">
                                            <h6 className="poppins-Bold main_heading text-capitalize">Easy Upgrades with great savings</h6>
                                            <p className="mb-0"><small>Upgrading to new models become easier and cheaper with the Digi2L Smart Buy
                                                Plan
                                                that guarantees a fixed price for your used appliances.</small></p>
                                        </div>
                                        <div className="card-footer border-0 p-0 bg-transparent">
                                            <img style={{ borderRadius: `15px`, width: `100%` }} src={require('/Digi2limage/smartBuy/icon4.svg').default}
                                                alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="owl-item active" style={{ width: `312px`, marginRight: `20px` }}>
                                <div className="item">
                                    <div className="card border-0 mb-3" style={{
                                        borderRadius: `15px`, minHeight: `385px`, boxShadow: `0px 1px
                    20px 4px #00000021`}}>

                                        <div className="card-body mark-Medium pb-0 px-xl-4">
                                            <h6 className="poppins-Bold main_heading text-capitalize">Protection against price variations</h6>
                                            <p className="mb-0"><small> No need to worry about model discontinuity or price fluctuations during
                                                resale
                                                of your used appliances. Your price is protected and guaranteed.
                                            </small></p>
                                        </div>
                                        <div className="card-footer border-0 p-0 bg-transparent">
                                            <img style={{ borderRadius: `15px`, width: `100%` }} src={require('/Digi2limage/smartBuy/icon3.svg').default}
                                                alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="owl-item active" style={{ width: `312px`, marginRight: `20px` }}>
                                <div className="item">
                                    <div className="card border-0 mb-3" style={{
                                        borderRadius: `15px`, minHeight: `385px`, boxShadow: `0px 1px
                    20px 4px #00000021`}}>

                                        <div className="card-body mark-Medium pb-0 px-xl-4">
                                            <h6 className="poppins-Bold main_heading text-capitalize">Seamless, Hassle-Free Buybacks</h6>
                                            <p className="mb-0"><small>No worries, no tension, just sit and relax. Our executives will do a free
                                                doorstep pickup and instantly credit the assured buyback value into your account.
                                            </small></p>
                                        </div>
                                        <div className="card-footer border-0 p-0 bg-transparent">
                                            <img style={{ borderRadius: `15px`, width: `100%` }} src={require('/Digi2limage/smartBuy/icon2.svg').default}
                                                alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="owl-item active" style={{ width: `312px`, marginRight: `20px` }}>
                                <div className="item">
                                    <div className="card border-0 mb-3" style={{
                                        borderRadius: `15px`, minHeight: `385px`, boxShadow: `0px 1px
                    20px 4px #00000021`}}>

                                        <div className="card-body mark-Medium pb-0 px-xl-4">
                                            <h6 className="poppins-Bold main_heading text-capitalize">Best buyback value guaranteed</h6>
                                            <p className="mb-0"><small> Digi2L Smart Buy: Assured Buyback Plan guarantees the best value for your
                                                appliances and gadgets
                                                today, for a resale of up to 5 years. So why wait ! Choose the best plan that suits
                                                you.</small></p>
                                        </div>
                                        <div className="card-footer border-0 p-0 bg-transparent">
                                            <img style={{ borderRadius: `15px`, width: `100%` }} src={require('/Digi2limage/smartBuy/icon1.svg').default}
                                                alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </SwiperSlide>



                    </div>
                    {/* </div> */}




                    {/* 
                    <div className="owl-stage-outer owl-height" style={{ height: `401px` }}>
                        <div className="owl-stage" style={{
                            transform: `translate3d(0px, 0px, 0px)`, transition: `all 0s ease 0s`,
                            width: `1328px`
                        }}>
                          
                         
                       
                        
                       
                            <div className="owl-item active" style={{ width: `312px`, marginRight: `20px` }}>
                                <div className="item">
                                    <div className="card border-0 mb-3" style={{
                                        borderRadius: `15px`, minHeight: `385px`, boxShadow: `0px 1px
                    20px 4px #00000021`}}>

                                        <div className="card-body mark-Medium pb-0 px-xl-4">
                                            <h6 className="poppins-Bold main_heading text-capitalize">Easy Upgrades with great savings</h6>
                                            <p className="mb-0"><small>Upgrading to new models become easier and cheaper with the Digi2L Smart Buy
                                                Plan
                                                that guarantees a fixed price for your used appliances.</small></p>
                                        </div>
                                        <div className="card-footer border-0 p-0 bg-transparent">
                                            <img style={{ borderRadius: `15px`, width: `100%` }} src={require('/Digi2limage/smartBuy/icon4.svg').default}
                                                alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="owl-item active" style={{ width: `312px`, marginRight: `20px` }}>
                                <div className="item">
                                    <div className="card border-0 mb-3" style={{
                                        borderRadius: `15px`, minHeight: `385px`, boxShadow: `0px 1px
                    20px 4px #00000021`}}>

                                        <div className="card-body mark-Medium pb-0 px-xl-4">
                                            <h6 className="poppins-Bold main_heading text-capitalize">Easy Upgrades with great savings</h6>
                                            <p className="mb-0"><small>Upgrading to new models become easier and cheaper with the Digi2L Smart Buy
                                                Plan
                                                that guarantees a fixed price for your used appliances.</small></p>
                                        </div>
                                        <div className="card-footer border-0 p-0 bg-transparent">
                                            <img style={{ borderRadius: `15px`, width: `100%` }} src={require('/Digi2limage/smartBuy/icon4.svg').default}
                                                alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

            </Swiper>
        </div>
    );
}








