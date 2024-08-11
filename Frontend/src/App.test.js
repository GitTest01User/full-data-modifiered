import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});












{/* <Routes>
					<Route path='/' element={<Home />}>Home</Route>
			
					<Route path='/about/' element={<About/>}>About</Route>

					<Route path='/smart-sell/' element={<SmartSell />}>SmartSell</Route>
					<Route path='/assured-buyback/' element={<SmartBuy />}>SmartBuy</Route>
					<Route path='/exciting-offers/' element={<Excitingoffers />}>ExcitingOffers</Route>
					<Route path='/reseller-enquiry/' element={<ResellerEnquiry />}>ResellerEnquire</Route>
					<Route path='/blogs/' element={<Blogs />}>Blogs</Route>
					<Route path='/press/' element={<Press />}>Press</Route>
					<Route path='/faq/' element={<FAQ />}>FAQ</Route>
					<Route path='/success-stories/' element={<SuccessStories />}>SuccessStories</Route>
					
					<Route path='/customer-reviews/' element={<CustomerReviews />}></Route>
					
					<Route path='/corporate-enquiry/logistics-partnership/' element={<LogisticsPartnership />}></Route>
				
					<Route path='/contact/' element={<Contact />}></Route>
					<Route path='/abb-policies/' element={<AbbPolicies />}></Route>
					<Route path='/policies/' element={<Policy />}></Route>
					<Route path='/exchange-terms-condition/' element={<TermsAndCondition />}></Route>
					<Route path='/privacy-policy/' element={<PrivacyPolicy />}></Route>
					<Route path='/posh-law/' element={<POSHLaw />}></Route>
					<Route path='/cookie-policy/' element={<CookiePolicy />}></Route>
					<Route path='/smart-sell-air-conditioner/' element={<SmartSellAirConditioner />}></Route>
					<Route path='/smart-sell-refrigerator/' element={<SmartSellRefrigerator />}></Route>
					<Route path='/blogs/:id' element={<BlogDetail />}></Route>
					<Route path='/success-stories/:id' element={<SuccessStoriesbosch />}></Route>
					<Route path='/corporate-enquiry/exchange/' element={<Exchange />}>Exchange</Route>
					<Route path='/corporate-enquiry/abb/' element={<BuybackPlan />}>BuybackPlan</Route>
					<Route path='/corporate-enquiry/circular-economy/' element={<CircularEconomy />}>CircularEconomy</Route>
					<Route path='/corporate-enquiry/enterprise-sales/' element={<EnterpriseSales />}></Route>
					<Route path='/corporate-enquiry/program-partnership/' element={<ProgramPartnership />}></Route>
					<Route path='/smart-sell-tv/' element={<SmartSellTv />}></Route>
					<Route path='/smart-sell-washing-machine/' element={<SmartSellWashingMachine />}></Route>
					<Route path='/how-to-redeem-guide/' element={<Redeem />}></Route>
					<Route path='/smart-sell-tv/know-more-tv/' element={<SmartDetailSell />}></Route>
					<Route path='/value-check' element={<ChackValue />}></Route>
					<Route path='/get-exact-value' element={<GetExactValue />}></Route>
					<Route path='/thank-you' element={<Thankyou />}></Route>
					<Route path='/corporate-enquiry/' element={<CorporateEnquiry />}></Route>
					<Route path='/smart-sell-refrigerator/knowmore/' element={<SmartSellKnowMore />}></Route>
					<Route path='/smart-sell-refrigerator/knowmore-2/' element={<SmartSellKnowMore2 />}></Route>
					<Route path='/sitemap' element={<Sitemap />}></Route>
					<Route path='/corporate-enquiry/exchange/1' element={<ExchangeVideoQR />}></Route>
					<Route path='/exciting-offers/1' element={<OfferDigi2l />}></Route>

					<Route path='*' element={<PageNotFound />}></Route>
					


				</Routes>   */}
				{/* <Routes>
					<Route path='/' element={<Home />}>Home</Route>
					
					<Route path='*' element={<PageNotFound />}></Route>
					<Route path='/about/' element={<About/>}>About</Route>

					<Route path='/smart-sell/' element={<SmartSell />}>SmartSell</Route>
					<Route path='/assured-buyback/' element={<SmartBuy />}>SmartBuy</Route>
					<Route path='/exciting-offers/' element={<Excitingoffers />}>ExcitingOffers</Route>
					<Route path='/reseller-enquiry/' element={<ResellerEnquiry />}>ResellerEnquire</Route>
					<Route path='/blogs/' element={<Blogs />}>Blogs</Route>
					<Route path='/press/' element={<Press />}>Press</Route>
					<Route path='/faq/' element={<FAQ />}>FAQ</Route>
					<Route path='/success-stories/' element={<SuccessStories />}>SuccessStories</Route>
					<Route path='/blogs/:id' element={<BlogDetail />}></Route>
					<Route path='/success-stories/:id' element={<SuccessStoriesbosch />}></Route>
					<Route path='/corporate-enquiry/exchange/' element={<Exchange />}>Exchange</Route>
					<Route path='/corporate-enquiry/abb/' element={<BuybackPlan />}>BuybackPlan</Route>
					<Route path='/corporate-enquiry/circular-economy/' element={<CircularEconomy />}>CircularEconomy</Route>
					<Route path='/corporate-enquiry/enterprise-sales/' element={<EnterpriseSales />}></Route>
					<Route path='/corporate-enquiry/program-partnership/' element={<ProgramPartnership />}></Route>
					<Route path='/customer-reviews/' element={<CustomerReviews />}></Route>
					<Route path='/corporate-enquiry/logistics-partnership/' element={<LogisticsPartnership />}></Route>
				
					<Route path='/contact/' element={<Contact />}></Route>
					<Route path='/abb-policies/' element={<AbbPolicies />}></Route>
					<Route path='/policies/' element={<Policy />}></Route>
					<Route path='/exchange-terms-condition/' element={<TermsAndCondition />}></Route>
					<Route path='/privacy-policy/' element={<PrivacyPolicy />}></Route>
					<Route path='/posh-law/' element={<POSHLaw />}></Route>
					<Route path='/cookie-policy/' element={<CookiePolicy />}></Route>
					<Route path='/smart-sell-air-conditioner/' element={<SmartSellAirConditioner />}></Route>
					<Route path='/smart-sell-refrigerator/' element={<SmartSellRefrigerator />}></Route>

					<Route path='/smart-sell-tv/' element={<SmartSellTv />}></Route>
					<Route path='/smart-sell-washing-machine/' element={<SmartSellWashingMachine />}></Route>
					<Route path='/how-to-redeem-guide/' element={<Redeem />}></Route>
					<Route path='/smart-sell-tv/know-more-tv/' element={<SmartDetailSell />}></Route>
					<Route path='/value-check' element={<ChackValue />}></Route>
					<Route path='/get-exact-value' element={<GetExactValue />}></Route>
					<Route path='/thank-you' element={<Thankyou />}></Route>
					<Route path='/corporate-enquiry/' element={<CorporateEnquiry />}></Route>
					<Route path='/smart-sell-refrigerator/knowmore/' element={<SmartSellKnowMore />}></Route>
					<Route path='/smart-sell-refrigerator/knowmore-2/' element={<SmartSellKnowMore2 />}></Route>
					<Route path='/sitemap' element={<Sitemap />}></Route>
					<Route path='/corporate-enquiry/exchange/1' element={<ExchangeVideoQR />}></Route>
					<Route path='/exciting-offers/1' element={<OfferDigi2l />}></Route>


					


				</Routes> */}


















// import Partner from './Component/Slider/Partner'
// import Success from './Component/Slider/Success'

// import Offers from './Component/Slider/Offers'
// import Life from './Component/Slider/Life'
// import News from './Component/Slider/News'
// import Trust from './Component/Slider/Trust'
// import Exchangeslider from './Component/Slider/Exchangeslider'
// import Exchangesales from './Component/Slider/Exchangesales'
// import UpdateSlider from './Component/Slider/UpdateSlider'
// import AbbPlan from './Component/Slider/ABBplan'
// import Seamless from './Component/Slider/Seamless'
// import LetsPartnerUp from './Component/AddComponenet/LetsPartnerUp'
// import Revolutionizing from './Component/Slider/Revolutionizing'
// import Goals from './Component/Slider/Goals'
// import Green from './Component/Slider/Green'
// import HowitWorks from './Component/Slider/HowItWorks'
// import Beyond from './Component/Slider/Beyond'
// import ResellProgram from './Component/Slider/ResellProgram'
// import ProgramSlider from './Component/Slider/ProgramSlider'
// import Voucher from './Component/Slider/Voucher'
// import HaveAQuestion from './Component/AddComponenet/HaveAQuestion'
// import UnlockingBenefits from './Component/Slider/UnlockingBenefits'
// import WhyPartner from './Component/Slider/WhyPartner'
// import Reseller from './Component/Slider/Reseller'
// import Serving from './Component/AddComponenet/Serving'
// import PlanMakes from './Component/Slider/PlanMakes'
// import Team from './Component/Slider/Team'
// import StepSell from './Component/AddComponenet/StepSell'
// import Scrolling from './Component/AddComponenet/Scrolling'
// import PartnersExprience from './Component/Slider/PartnersExperience'
// import BenefitFrom from './Component/Slider/BenefitFrom'
// import ReadMoreLess from './Component/AddComponenet/ReadMore'
// import Swiper from './Component/Slider/Swiper'
// import Modalddd from './Component/AddComponenet/Modalddd'
// import SmartBuyVideo from './Component/AddComponenet/SmartBuyVideo'

// import SmartBuyPalnprice from './Component/Slider/SmartBuyPalnprice'
// import WithDigi2lVideo from './Component/AddComponenet/WithDigi2LVideo'
// import SmartBuyPlan from './Component/Slider/SmartBuyPlan'
// import SmartSellPlan from './Component/Slider/SmartSellPlan'
// import Swiper2 from './Component/Slider/Swiper2'


{/* <Route path='/StepSell' element={<StepSell />}></Route> */ }
{/* <Route path='/Partner' element={<Partner />}></Route>
					<Route path='/PlanMakes' element={<PlanMakes />}></Route>
					<Route path='/Serving' element={<Serving />}></Route>
					<Route path='/Success' element={<Success />}></Route> */}

{/* 					
					<Route path='/Offers' element={<Offers />}></Route> */}


{/* <Route path='/Life' element={<Life />}></Route>
					<Route path='/News' element={<News />}></Route>
					<Route path='/Trust' element={<Trust />}></Route>
					<Route path='/Exchangeslider' element={<Exchangeslider />}></Route>
					<Route path='/Exchangesales' element={<Exchangesales />}></Route>
					<Route path='/UpdateSlider' element={<UpdateSlider />}></Route>
					<Route path='/ABBPlan' element={<AbbPlan />}></Route>
					<Route path='/Seamless' element={<Seamless />}></Route>
					<Route path='/LetsPartnerUp' element={<LetsPartnerUp />}></Route>
					<Route path='/Revolutionizing' element={<Revolutionizing />}></Route>
					<Route path='/Goals' element={<Goals />}></Route>
					<Route path='/Green' element={<Green />}></Route> */}

{/* <Route path='/HowitWorks' element={<HowitWorks />}></Route>
					<Route path="/Beyond" element={<Beyond />} ></Route>
					<Route path='/ResellProgram' element={<ResellProgram />}></Route>

					<Route path='/ProgramSlider' element={<ProgramSlider />}></Route>
					<Route path='/Voucher' element={<Voucher />}></Route>
					<Route path='/UnlockingBenefits' element={<UnlockingBenefits />}></Route>
					<Route path='/WhyPartner' element={<WhyPartner />}></Route>
					<Route path='/Reseller' element={<Reseller />}></Route>
					<Route path='/Team' element={<Team />}></Route>
					
					<Route path='/HaveAQuestion' element={<HaveAQuestion />}></Route>
					

					<Route path='/Scrolling' element={<Scrolling />}></Route>
				
					<Route path='/PartnersExprience' element={<PartnersExprience />}></Route>
					<Route path='/BenefitFrom' element={<BenefitFrom />}></Route>
					
				
					<Route path='/ReadMore' element={<ReadMoreLess />}></Route>
					<Route path='/Swiper' element={<Swiper />}></Route>
					<Route path='/Modalddd' element={<Modalddd />}></Route>
					<Route path='/SmartBuyVideo' element={<SmartBuyVideo />}></Route>
					<Route path='' element={<SmartBuyPalnprice />}></Route>
					<Route path='/WithDigi2lVideo' element={<WithDigi2lVideo />}></Route>
					<Route path='/smartBuyPlan' element={<SmartBuyPlan />}></Route>

					<Route path='/SmartSellPlan' element={<SmartSellPlan />}></Route>
					<Route path='/Swiper2' element={<Swiper2 />}></Route> */}