import React from 'react'
import {Helmet} from "react-helmet";

const SinglePageTitle = ({title}) => {
  return (
    <Helmet>
         <title>{`Multi-Vendor - ${title}`}</title>
    </Helmet>
  )
}

export default SinglePageTitle
