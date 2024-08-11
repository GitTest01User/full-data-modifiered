import { lazy } from 'react';
import Loadable from 'app/components/Loadable';
import Blogs from './Component/Blogs';

import FAQUpdate from './Component/AddCompnent/tableUpdate/FAQUpdate';
import BlogManage from './Component/AddCompnent/tableManage/BlogManage';
import FAQManage from './Component/AddCompnent/tableManage/FAQManage';

import FAQCategory from './Component/AddCompnent/Categery/FAQCategory';
import CategoryUpdate from './Component/AddCompnent/Categery/CategoryUpdate';
import BlogUpdate from './Component/AddCompnent/tableUpdate/BlogUpdate';
import BlogsCategory from './Component/AddCompnent/Categery/BlogCategory';
import CategoryBlogtable from './Component/AddCompnent/Categery/CategoryBlogtable';

import PartnerUpdate from './Component/AddCompnent/tableUpdate/PartnerUpdate';

import PartnerManage from './Component/AddCompnent/tableManage/PartnerManage';
import TestimonalManage from './Component/AddCompnent/tableManage/TestimonalManage';
import Press from './Component/Press';
import PressUpdate from './Component/AddCompnent/tableUpdate/PressUpdate';
import PressManage from './Component/AddCompnent/tableManage/PressManage';
import Life from './Component/Life';
import LifeUpdate from './Component/AddCompnent/tableUpdate/LifeUpdate';
import LifeManage from './Component/AddCompnent/tableManage/LifeManage';
import Offers from './Component/Offers';
import OffersManage from './Component/AddCompnent/tableManage/OffersManage';
import OffersUpdate from './Component/AddCompnent/tableUpdate/OffersUpdate';
import Stories from './Component/Stories';
import StoriesUpdate from './Component/AddCompnent/tableUpdate/StoriesUpdate';
import StoriesManage from './Component/AddCompnent/tableManage/StoriesManage';
import CurrentOpenings from './Component/Opening';
import OpeningUpdate from './Component/AddCompnent/tableUpdate/OpeningUpdate';
import OpeningManage from './Component/AddCompnent/tableManage/OpeningManage';
import Header from './Component/Header';

import CategoryUpdateBlogs from './Component/AddCompnent/Categery/CategoryUpdateBlogs';
import Serving from './Component/Serving';
import ServingUpdate from './Component/AddCompnent/tableUpdate/ServingUpdate';
import ServingManage from './Component/AddCompnent/tableManage/ServingManage';
import Page from './Component/Page';
import PageUpdate from './Component/AddCompnent/tableUpdate/PageUpdate';
import PageManage from './Component/AddCompnent/tableManage/PageManage';
import Enquires from './Component/Enquires';
import EnquiresUpdate from './Component/AddCompnent/tableUpdate/EnquiresUpdate';
import AddFAQCategory from './Component/AddCompnent/addCategery/AddFAQCategory';
import AddBlogCategory from './Component/AddCompnent/addCategery/AddBlogCategory';
import Profile from './Component/Profile';
import ProfileUpdate from './Component/AddCompnent/tableUpdate/ProfileUpdate';
import User from './Component/User';
import UserListUpdate from './Component/AddCompnent/tableUpdate/UserListUpdate';
import { Analytics } from '@mui/icons-material';
import ViewUser from './Component/AddCompnent/addCategery/ViewUser';
import UpdateRole from './Component/AddCompnent/addCategery/UpdateRole';
import Role from './Component/Role';
import RoleUpdate from './Component/AddCompnent/tableUpdate/RoleUpdate';
import UserCreate from './Component/AddCompnent/tableManage/UserCreate';
import Reseller from './Component/Reseller';
import ResellerUpdate from './Component/AddCompnent/tableUpdate/ResellerUpdate';
import ResellerManage from './Component/AddCompnent/tableManage/ResellerManage';
import Partner from './Component/Partner';
import Partners from './Component/Partners';
import PartnersUpdate from './Component/AddCompnent/tableUpdate/PartnersUpdate';
import PartnersManage from './Component/AddCompnent/tableManage/PartnersManage';
import TestimonalCreateBox from './Component/testimonialCreateBox';
import RoleManage from './Component/AddCompnent/tableManage/RoleManage';
import TestimonialManage from './Component/AddCompnent/tableManage/TestimonalManage';
import TestimonialUpdate from './Component/AddCompnent/tableUpdate/TestmonialUpdate';
import HeaderManage from './Component/AddCompnent/tableManage/HeaderManage';
import HeaderUpdate from './Component/AddCompnent/tableUpdate/HeaderUpdate';
import CreateMenu from './Component/CreateMenu';
import SubMenuManage from './Component/AddCompnent/tableManage/SubMenuManage';
import Footer from './Component/Footer';
import FooterUpdate from './Component/AddCompnent/tableUpdate/FooterUpdate';
import CreateFooterMenu from './Component/CreateFooterMenu';
import FooterMenuManage from './Component/AddCompnent/tableManage/FooterMenuManage';
import FooterMenuSubManage from './Component/AddCompnent/tableManage/FooterMenuSubManage';
import FollowUs from './Component/SocialMedia';
import FollowUpdate from './Component/AddCompnent/tableUpdate/FollowUpdate';
import FollowManage from './Component/AddCompnent/tableManage/FollowManage';
import IconHeader from './Component/IconHeader';
import IconHeaderUpdate from './Component/AddCompnent/tableUpdate/IconHeaderUpdate';
import IconHeaderManage from './Component/AddCompnent/tableManage/IconHeaderManage';
import Logo from './Component/Logo';
import LogoUpdate from './Component/AddCompnent/tableUpdate/LogoUpdate';
import QuickLink from './Component/QuickLink';
import QuickLinkUpdate from './Component/AddCompnent/tableUpdate/QuickLinkUpdate';
import FooterLogo from './Component/FooterLogo';
import FooterLogoUpdate from './Component/AddCompnent/tableUpdate/FooterLogoUpdate';
import Detail from './Component/Detail';
import DetailUpdate from './Component/AddCompnent/tableUpdate/DetailUpdate';
import OfficeDetail from './Component/OfficeDetail';
import OfficeDetailUpdate from './Component/AddCompnent/tableUpdate/OfficeDetailUpdate';
import OfficeDetailManage from './Component/AddCompnent/tableManage/OfficeDetailManage';
import Counter from './Component/Counter';
import CounterUpdate from './Component/AddCompnent/tableUpdate/CounterUpdate';
import CounterManage from './Component/AddCompnent/tableManage/CounterManage';
import QuickLinkManage from './Component/AddCompnent/tableManage/QuickLinkManage';
import TestimonialsCreateBox from './Component/testimonialCreateBox';
import Testimonials from './Component/Testimonial';

const FAQ = Loadable(lazy(() => import('./Component/FAQ')));

const materialRoutes = [

  { path: '/backend/faq', element: <FAQ /> },
  { path: '/backend/blog', element: <Blogs /> },
  { path: '/backend/manage-blog', element: <BlogManage /> },
  { path: '/backend/update-faq', element: <FAQUpdate /> },
  { path: '/backend/update-blog', element: <BlogUpdate /> },
  { path: '/backend/manage-faq', element: <FAQManage /> },
  { path: '/backend/manage-faq-category', element: <AddFAQCategory /> },
  { path: '/backend/manage-blog-category', element: <AddBlogCategory /> },
  { path: '/backend/category-faq', element: <FAQCategory /> },
  { path: '/backend/category-blog', element: <BlogsCategory /> },
  { path: '/backend/update-category', element: <CategoryUpdate /> },
  { path: '/backend/update-category-blog', element: <CategoryUpdateBlogs /> },
  { path: '/backend/partner', element: <Partner /> },
  { path: '/backend/update-partner', element: <PartnerUpdate /> },
  { path: '/backend/manage-partner', element: <PartnerManage /> },
  { path: '/backend/testimonials', element: <Testimonials /> },
  { path: '/backend/reseller', element: <Reseller /> },
  { path: '/backend/partners', element: <Partners /> },

  { path: '/backend/testimonials-create', element: <TestimonialsCreateBox /> },
  { path: '/backend/update-partners', element: <PartnersUpdate /> },
  { path: '/backend/manage-partners', element: <PartnersManage /> },
  { path: '/backend/update-reseller', element: <ResellerUpdate /> },
  { path: '/backend/manage-reseller', element: <ResellerManage /> },
  { path: '/backend/manage-testimonials', element: <TestimonialManage /> },
  { path: '/backend/update-testimonials', element: <TestimonialUpdate /> },
  { path: '/backend/press', element: <Press /> },
  { path: '/backend/update-press', element: <PressUpdate /> },
  { path: '/backend/manage-press', element: <PressManage /> },
  { path: '/backend/life', element: <Life /> },
  { path: '/backend/update-life', element: <LifeUpdate /> },
  { path: '/backend/manage-life', element: <LifeManage /> },
  { path: '/backend/offers', element: <Offers /> },
  { path: '/backend/manage-offers', element: <OffersManage /> },
  { path: '/backend/update-offers', element: <OffersUpdate /> },
  { path: '/backend/stories', element: <Stories /> },
  { path: '/backend/update-stories', element: <StoriesUpdate /> },
  { path: '/backend/manage-Stories', element: <StoriesManage /> },

  { path: '/backend/current-openings', element: <CurrentOpenings /> },

  { path: '/backend/current-openings-update', element: <OpeningUpdate /> },

  { path: '/backend/manage-current-openings', element: <OpeningManage /> },
  { path: '/backend/serving', element: <Serving /> },
  { path: '/backend/update-serving', element: <ServingUpdate /> },
  { path: '/backend/manage-serving', element: <ServingManage /> },
  { path: '/backend/routes-page', element: <Page /> },
  { path: '/backend/update-routes-page', element: <PageUpdate /> },
  { path: '/backend/manage-routes-page', element: <PageManage /> },
  { path: '/backend/contact-enquires', element: <Enquires /> },
  { path: '/backend/update-contact-enquires', element: <EnquiresUpdate /> },
  { path: '/backend/menu', element: <Header /> },
  { path: '/backend/manage-menu', element: <HeaderManage /> },
  { path: '/backend/update-menu', element: <HeaderUpdate /> },

  { path: '/backend/profile', element: <Profile /> },
  { path: '/backend/profile/details', element: <Profile /> },
  { path: '/backend/user', element: <User /> },
  { path: '/backend/user-manage', element: <UserCreate /> },
  { path: '/backend/users', element: <UserListUpdate /> },
  { path: '/backend/profile-manage', element: <ProfileUpdate /> },
  { path: '/backend/userview', element: <ViewUser /> },
  { path: '/backend/role-update', element: <UpdateRole /> },
  { path: '/backend/role', element: <Role /> },
  { path: '/backend/update-role', element: <RoleUpdate /> },
  { path: '/backend/role-manage', element: <RoleManage /> },
  { path: '/backend/menu-create', element: <CreateMenu /> },
  { path: '/backend/manage-submenu', element: <SubMenuManage /> },
  { path: '/backend/footer', element: <Footer /> },
  { path: '/backend/update-footer', element: <FooterUpdate /> },
  { path: '/backend/footer-menu-create', element: <CreateFooterMenu /> },
  { path: '/backend/manage-footer-menu', element: <FooterMenuManage /> },
  { path: '/backend/manage-footer-sub-menu', element: <FooterMenuSubManage /> },
  { path: '/backend/follow', element: <FollowUs /> },
  { path: '/backend/update-follow', element: <FollowUpdate /> },
  { path: '/backend/manage-follow', element: <FollowManage /> },
  { path: '/backend/icon', element: <IconHeader /> },
  { path: '/backend/update-icon', element: <IconHeaderUpdate /> },
  { path: '/backend/manage-icon', element: <IconHeaderManage /> },
  { path: '/backend/logo', element: <Logo /> },
  { path: '/backend/update-logo', element: <LogoUpdate /> },
  { path: '/backend/link', element: <QuickLink /> },
  { path: '/backend/update-link', element: <QuickLinkUpdate /> },
  { path: '/backend/manage-quicklink', element: <QuickLinkManage /> },
  { path: '/backend/footer-logo', element: <FooterLogo /> },
  { path: '/backend/update-footer-logo', element: <FooterLogoUpdate /> },
  { path: '/backend/footer-detail', element: <OfficeDetail /> },
  { path: '/backend/footer-detail-update', element: <OfficeDetailUpdate /> },
  { path: '/backend/manage-detail', element: <OfficeDetailManage /> },
  { path: '/backend/counter', element: <Counter /> },
  { path: '/backend/update-counter', element: <CounterUpdate /> },
  { path: '/backend/manage-counter', element: <CounterManage /> }
];

export default materialRoutes;
