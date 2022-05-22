import React from "react";
import { Helmet } from "react-helmet";

const MetaSection = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

MetaSection.defaultProps = {
  title: "Welcome To our Shop",
  description: "We sell the best equipents",
  keywords: "best equipements, cheap equipments, top companies equipments",
};

export default MetaSection;
