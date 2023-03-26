/**
 *
 * Footer
 *
 */

 import React from 'react';

 import { Link } from 'react-router-dom';
 import { Container } from 'reactstrap';
 import Newsletter from '../../../containers/Newsletter';
 import googleplay from'../../../../public/images/googleplay.png';
 import appstore from '../../../../public/images/app-store-png-logo-33107.png';
 
 const Footer = () => {
   const infoAboutLinks = [
     { id: 0, name: 'Contact Us', to: '/contact' },
     { id: 1, name: 'About Us', to: '/about' },
     { id: 2, name: 'Terms & Conditions', to: '/terms' },
     { id: 3, name: 'Privacy Policy', to: '/privacypolicy' },
   ];

   const infoSalesLinks = [
    { id: 0, name: 'Sell With Us', to: '/sell' },
    { id: 1, name: 'Track Your Order', to: '/shipping' },
    { id: 2, name: 'Bulk Purchasing', to: '/bulkpurchasing' },
    { id: 3, name: 'FAQs', to: '/faqs' },
  ];
 
   const footerBusinessLinks = (
     <ul className='support-links'>
       <li className='footer-link'>
         <Link to='/dashboard'>Account Details</Link>
       </li>
       <li className='footer-link'>
         <Link to='/dashboard/orders'>Orders</Link>
       </li>
     </ul>
   );
 
   const footerAboutLinks = infoAboutLinks.map(item => (
     <li key={item.id} className='footer-link'>
       <Link key={item.id} to={item.to}>
         {item.name}
       </Link>
     </li>
   ));

   const footerSalesLinks = infoSalesLinks.map(item => (
    <li key={item.id} className='footer-link'>
      <Link key={item.id} to={item.to}>
        {item.name}
      </Link>
    </li>
  ));
 
   return (
     <footer className='footer'>
       <Container>
         <div className='footer-content'>
           <div className='footer-block'>
             <div className='block-title'>
               <h2>Smartupdeal</h2>
             </div>
             <div className='block-content'>
             Smartupdeal addresses the realization of a brighter future. We help you to explore futuristic approaches with the latest technologies.
             </div>
             {/* <button id="home_button" style={{ backgroundImage:`url(${image})` }}>click me</button> */}
           <img  src={googleplay} height={90} width={90}/>
           <img  src={appstore} height={90} width={90}/>
 
           </div>
           <div className='footer-block'>
             <div className='block-title'>
               <h2>About Us</h2>
             </div>
             <div className='block-content'>
               <ul>{footerAboutLinks}</ul>
             </div>
           </div>
           <div className='footer-block'>
             <div className='block-title'>
               <h2>Customer Care</h2>
             </div>
             <div className='block-content'>
               <ul>{footerSalesLinks}</ul>
             </div>
           </div>
           <div className='footer-block'>
             <div className='block-title'>
               <h2>Newsletter</h2>
               <Newsletter />
             </div>
             <div>
               <ul className='footer-social-item'>
                 <li>
                   <a href='/#facebook' rel='noreferrer noopener' target='_blank'>
                     <span className="facebook-icon">
                     </span>
                   </a>
                 </li>
                 <li>
                   <a href='/#instagram' rel='noreferrer noopener' target='_blank'>
                   <span className='instagram-icon' />
                   </a>
                 </li>
                 <li>
                   <a href='/#pinterest' rel='noreferrer noopener' target='_blank'>
                   <span className='pinterest-icon' />
                   </a>
                 </li>
                 <li>
                   <a href='/#twitter' rel='noreferrer noopener' target='_blank'>
                   <span className='twitter-icon' />
                   </a>
                 </li>
               </ul>
             </div>
           </div>
         </div>
         <div className='footer-copyright'>
           <span>© {new Date().getFullYear()} Smartupdeal</span>
         </div>
 
       </Container>
     </footer>
   );
 };
 
 export default Footer;