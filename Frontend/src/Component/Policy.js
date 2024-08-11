import React from 'react'

export default function Policy() {
    return (
        <div>
            <div>


            <section  className="blog_detail_hero position-relative py-2 mb-5 rocket-lazyload" 
            style={{backgroundImage: `url("/Digi2limage/Pathbg.svg")` , backgroundRepeat: 'no-repeat',marginTop:'0px' ,backgroundSize:'cover' ,height: '202px'}} >
            
                        
                        
                        <img src="/Digi2limage/blog_detail1.svg" alt=""
                        
                         style={{position:'absolute',right:'0px ',bottom:"0px" }}
                          />

                            <img src="/Digi2limage/blog_detail2.svg" alt=""
                             style={{position:'absolute',left:'0px ' ,top:'0px'}} />
                            <div className="text-center py-5">
                                <h4 className="poppins-SemiBold lh-base py-4">Return, Cancellation and Refund Policy</h4>
                            </div>
                        </section>
               

                        <div className="container">
                            <div className="row">
                                <div className="col-md-10 mx-auto mb-4">
                                    <h5 style={{textAlign:'center'}} >Return</h5>
                                    <p>We do not accept requests for retums due to intemal policies. Retum requests will only be considered if your order is misplaced. If you wish to request a return, please contact us within 72 hours of delivery before sending the order back to us. Please include images of received items if your order has been misplaced. If your retum request is approved, you must send the items in unused and undamaged condition and in its original packaging. You will be responsible for shipping costs. Digi2L reserves the right to reject a request for return.</p>
                                    <p>&nbsp;</p>
                                    <h5 style={{textAlign:'center'}}>Cancellation</h5>
                                    <p>If you want to cancel the order for some reason, you can request a cancellation by contacting us with the details of your order. Cancellation request will only be processed if the order has not been appointed to our Logistics Partner. Once the LGC is dispatched for pickup, it cannot be cancelled. The orders are usually dispatched within 24 hours of successful payment. Please note that a cancellation request does not guarantee the cancellation of your order. For security reasons, we require you to contact us through the mobile number or email address used while ordering. Digi2L reserves the right to reject a request for cancellation.</p>
                                    <p>&nbsp;</p>
                                    <h5  style={{textAlign:'center'}}>Refund</h5>
                                    <p>In case of cancellations or returns, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>
                                    <p>&nbsp;</p>
                                </div>
                            </div>
                        </div>

                    </div>
            </div>
            )
}
