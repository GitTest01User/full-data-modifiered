import React from 'react'

export default function SmartDetailSell() {
    return (
        <div>
            <title> Sell Your Old Television - Digi2L</title>


            <section data-bg="/Digi2limage/hero43424.png" id="smartSellHero" className="hero_section d-flex justify-content-center align-items-xl-center rocket-lazyload"
                style={{ backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '250px', paddingTop: '250px' }}
            >
                <div className="smartSellHero  heroform">
                    <div className="text-md-center text-white py-4  px-4">
                        <h1 className="poppins-SemiBold lh-base font_family">Sell Your Old Television</h1>
                        <label className="mark-Medium">
                            <p className="text-capitalize h4">Don’t miss out on any news and updates! Sell your old television hassle-free.</p>
                        </label>
                    </div>
                </div>
            </section>

            <section className="container my-3 my-lg-5 px-4 px-lg-0 py-3 py-lg-5" style={{ paddingTop: '50px', paddingRight: '50px', paddingLeft: '50px' }}>
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-6 px-xl-5 pt-3">
                        <h1 className="poppins-SemiBold main_heading">Dead Pixels:</h1>
                        <p className="lh-base poppins-Medium para_first" style={{ fontSize: '14px' }}>Dead pixels are a common issue with older LCD/LED TVs. This can cause small dots or lines to appear on the screen, which can be distracting and affect picture quality.</p>

                    </div>
                    <div className="col-lg-6 order-lg-last order-first pb-4 pb-lg-0 text-center" id="smartbuy4">

                        <img className="img-fluid" src="/Digi2limage/dead-pixels-new.png" width="250px" alt="" />
                    </div>
                </div>
            </section>
            <section className="container my-3 my-lg-5 px-4 px-lg-0 py-3 py-lg-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-6 px-xl-5 pt-3">
                        <h1 className="poppins-SemiBold main_heading">Burn-In:</h1>
                        <p className="lh-base poppins-Medium para_first" style={{ fontSize: '14px' }}>Burn-in occurs when a static image is displayed on the screen for a prolonged period, causing the image to be permanently etched onto the screen.</p>

                    </div>
                    <div className="col-lg-6 order-lg-last order-first pb-4 pb-lg-0 text-center" id="smartbuy4">
                        <img className="img-fluid" src="/Digi2limage/burn-in-new.png" width="250px" alt="" />
                    </div>
                </div>
            </section>
            <section className="container my-3 my-lg-5 px-4 px-lg-0 py-3 py-lg-5" style={{ paddingRight: '50px', paddingLeft: '50px' }}>
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-6 px-xl-5 pt-3">
                        <h1 className="poppins-SemiBold main_heading">Sound Quality:</h1>
                        <p className="lh-base poppins-Medium para_first" style={{ fontSize: '14px' }}>Older TVs often have poor sound quality, resulting in a less immersive viewing experience.</p>

                    </div>
                    <div className="col-lg-6 order-lg-last order-first pb-4 pb-lg-0 text-center" id="smartbuy4">
                        <img className="img-fluid" src="/Digi2limage/sound-quality-new.png" width="250px" alt="" />
                    </div>
                </div>
            </section>
        </div>
    )
}
