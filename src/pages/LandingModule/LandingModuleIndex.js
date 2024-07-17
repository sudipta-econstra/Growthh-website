import React, { useEffect, useState } from 'react'
import '../../landingAssets/css/bootstrap.min.css';
import '../../landingAssets/css/custom-animated.css';
import '../../landingAssets/css/default.css';
import '../../landingAssets/css/font-awesome.min.css';
import '../../landingAssets/css/magnific-popup.css';
import '../../landingAssets/css/magnific.dark.css';
import '../../landingAssets/css/magnific.rtl.css';
import '../../landingAssets/css/main.css';
import '../../landingAssets/css/style.css';
import Loader from '../landing/loder/Loader.jsx';
import Drawer from '../landing/Mobile/Drawer.jsx';
import useToggle from '../landing/Hooks/useToggle.js';
import HomeOneHeader from '../landing/Home/HomeOneHeader.jsx';
import FaqHomeOne from '../landing/Home/FaqHomeOne.jsx';
import ProjectHomeOne from '../landing/Home/ProjectHomeOne.jsx';
import FooterHomeOne from '../landing/Home/FooterHomeOne.jsx';
import BackToTop from '../landing/BackToTop.jsx';
import ModuleWrapper from './ModuleWrapper.js';

function LandingModuleIndex() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  const [drawer, drawerAction] = useToggle(false);
  return (
    <>
      {loading && (
        <div className={`appie-loader ${loading ? 'active' : ''}`}>
          <Loader />
        </div>
      )}
      <div className={`appie-visible ${loading === false ? 'active' : ''}`}>

        <Drawer drawer={drawer} action={drawerAction.toggle} />
        <HomeOneHeader action={drawerAction.toggle}/>
        <ModuleWrapper/>
        <FaqHomeOne />
        <ProjectHomeOne />
        <FooterHomeOne />
        <BackToTop />
      </div>

    </>
  )
}

export default LandingModuleIndex