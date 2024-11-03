import {Helmet} from "react-helmet";
import React from 'react';
import { useLocation } from 'react-router-dom';
import { formatTitle } from "../functions/func";

const MetaData = () => {

  const location = useLocation();

  // Get current path and format it into a title
  const pageTitle = formatTitle(location.pathname);

  return (
    <Helmet>
            <title>{`Multi-Vendor - ${pageTitle}`}</title>
    </Helmet>
  )
}

export default MetaData
