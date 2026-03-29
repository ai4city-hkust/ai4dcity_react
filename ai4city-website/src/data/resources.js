export const RESOURCES_LIST_ITEMS = [
  {
    id: 7, 
    title: "MeTreec v1.0",
    desc: `MeTreec is a "one-stop" processing pipeline designed for individual tree point clouds:
It receives segmented individual tree point clouds (.xyz format, Z-axis oriented upwards), calls AdTree (Du et al., 2019) to complete the 3D reconstruction, and subsequently performs mesh repair (hole filling) based on CGAL. It then calculates key tree metrics—such as Tree Height, Diameter at Breast Height (DBH), Crown Radius (CR), Crown Depth (CD), and Volume/Surface Area—from the skeleton or filtered leaf nodes. Simultaneously, it outputs a single JSON report and a batch CSV summary file.`,
    img: "/images/resource/metree.jpg", 
    date: "https://github.com/ai4city-hkust/Metreec-v1.0",
    link: "https://github.com/ai4city-hkust/Metreec-v1.0",
  },
  {
    id: 6, 
    title: "MeTreec v1.0",
    desc: `MeTreec is a "one-stop" processing pipeline designed for individual tree point clouds:
It receives segmented individual tree point clouds (.xyz format, Z-axis oriented upwards), calls AdTree (Du et al., 2019) to complete the 3D reconstruction, and subsequently performs mesh repair (hole filling) based on CGAL. It then calculates key tree metrics—such as Tree Height, Diameter at Breast Height (DBH), Crown Radius (CR), Crown Depth (CD), and Volume/Surface Area—from the skeleton or filtered leaf nodes. Simultaneously, it outputs a single JSON report and a batch CSV summary file.`,
    img: "/images/resource/metree.jpg", 
    date: "https://github.com/ai4city-hkust/Metreec-v1.0",
    link: "https://github.com/ai4city-hkust/Metreec-v1.0",
  },
  {
    id: 5, 
    title: "gdverse: An R Package for Spatial Stratified Heterogeneity Family",
    desc: "The lack of a comprehensive and user-friendly software tool has greatly limitedtheir broader application in geospatial analysis and environmental modeling. To address this gap, an R package gdverse has beendeveloped to integrate various SSH models, leveraging R's rich statistical and spatial data processing capabilities while natively supporting multicore parallel computing in the widely used R environment.",
    img: "/images/resource/gdverse.png", 
    date: "https://github.com/stscl/gdverse",
    link: "https://github.com/stscl/gdverse",
  },
  {
    id: "3-1", 
    title: "spEDM: Spatial Empirical Dynamic Modeling",
    desc: "spEDM is an R package for spatial causal discovery. It extends Empirical Dynamic Modeling (EDM) from time series to spatial cross-sectional data, provides seamless support for vector and raster spatial data via tight integration with the sf and terra packages, and enables data-driven causal inference from spatial snapshots.",
    img: "/images/resource/spEDM.png", 
    date: "https://stscl.github.io/spEDM/ ",
    link: "https://stscl.github.io/spEDM/",
  },
  {
    id: "3-2", 
    title: "tEDM: Temporal Empirical Dynamic Modeling",
    desc: "The tEDM package provides a suite of tools for exploring and quantifying causality in time series using Empirical Dynamic Modeling (EDM). It is particularly designed to detect, differentiate, and reconstruct causal dynamics in systems where traditional assumptions of linearity and stationarity may not hold.",
    img: "/images/resource/tEDM.png", 
    date: "https://stscl.github.io/tEDM/",
    link: "https://stscl.github.io/tEDM/",
  },
  {
    id: 4, 
    title: "Foursquare2ArcGIS",
    desc: "Foursquare Open Source Places (FSQ OS Places) is a high-quality, open POI (Points of Interest) dataset released by Foursquare, containing over 104 million POIs worldwide. While platforms like OpenStreetMap (OSM) and Overture Maps aim to improve open POI coverage, FSQ OS Places provides a more extensive and precise dataset. This repository provides a step-by-step guide on downloading POI data and converting it from GeoJSON to Shapefile (SHP) for use in ArcGIS Pro, QGIS, and other GIS applications.",
    img: "/images/research/f2a.png", 
    date: "https://github.com/ai4city-hkust/Foursquare2ArcGIS",
    link: "https://github.com/ai4city-hkust/Foursquare2ArcGIS",
  },
  {
    id: 2, 
    title: "BuildingView",
    desc: "BuildingView is an advanced tool designed to enhance urban analysis by integrating high-resolution visual data from Google Street View with spatial information from OpenStreetMap via the Overpass API. This tool focuses on creating detailed urban building exterior databases, identifying critical indicators for energy efficiency, environmental sustainability, and human-centric design. Through a systematic approach involving literature review, Street View sampling, and annotation using the ChatGPT-4.0 API, BuildingView improves the precision of urban building data.",
    img: "/images/resource/Buildingview.png", 
    date: "https://github.com/Jasper0122/BuildingView",
    link: "https://github.com/Jasper0122/BuildingView"
  },
];