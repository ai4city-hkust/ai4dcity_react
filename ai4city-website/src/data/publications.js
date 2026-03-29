export const PUBLICATION_ITEMS = [
  {
    id: 1774775739519,
    title: "DSTI-Net: A Dynamic Spatial–Temporal Interaction Network With Semantic Guidance for 2-D and 3-D Change Detection",
    desc: "本文提出了DSTI-Net框架，用于从双时相光学遥感图像中进行二维和三维的变化检测。在训练过程中，DSTI-Net 以双时相光学图像作为输入，并由二维变化标签和三维高程变化标签进行监督。在推理阶段，仅需要双时相光学图像，网络会直接预测二维变化图和三维高程变化",
    mediaContent: "/images/publication/640.png",
    link: "https://ieeexplore.ieee.org/document/11417956",
    date: "10.1109/TGRS.2026.3669158",
    topic: "Data Understanding",
    year: "2026"
  },
  {
    id: 6,
    title: "Dual-domain representation alignment for unsupervised height estimation from cross-resolution remote sensing images",
    desc: " In this work, we explore a Data Understandingorld applications to investigate the task of height estimation under unsupervised domain adaptation. ",
    date: "https://doi.org/10.1016/j.isprsjprs.2025.10.035",
    link: "https://doi.org/10.1016/j.isprsjprs.2025.10.035",
    articleId: "DUALDO",
    topic: "Built-environment and Urban System Understanding",
    year: "2026",
    mediaContent: "/images/publication/dual-domain.png"
  },
  {
    id: 4,
    title: "ULSR-GS: : Urban large-scale surface reconstruction Gaussian splatting with multi-view geometric consistency",
    desc: "Extensive experiments on large-scale aerial benchmark datasets demonstrate that ULSR-GS consistently outperforms existing single- and multi-GPU Gaussian Splatting methods. Furthermore, compared to MVS pipelines, our approach achieves comparable or superior geometric quality while being substantially more time-efficient, making it a practical solution for scalable 3D modeling in digital twin and urban mapping applications.",
    date: "https://doi.org/10.1016/j.isprsjprs.2025.10.008",
    link: "https://doi.org/10.1016/j.isprsjprs.2025.10.008",
    articleId: "ULSR",
    topic: "AI based 3D City Modeling",
    year: "2025",
    mediaContent: "/images/research/USLR-GS/1-s2.0-S092427162500396X-gr19.jpg"
  },
  {
    id: 3,
    title: "Sat2City: 3D City Generation from A Single Satellite Image with Cascaded Latent Diffusion",
    desc: "Recent advancements in generative models have enabled 3D urban scene generation from satellite imagery, unlocking promising applications in gaming, digital twins, and beyond. However, most existing methods rely heavily on neural rendering techniques, which hinder their ability to produce detailed 3D structures on a broader scale, largely due to the inherent structural ambiguity derived from relatively limited 2D observations. To address this challenge, we propose Sat2City, a novel framework that synergizes the representational capacity of sparse voxel grids with latent diffusion models, tailored specifically for our novel 3D city dataset.",
    date: "https://doi.org/10.48550/arXiv.2507.04403",
    link: "https://arxiv.org/abs/2507.04403",
    articleId: "s2c",
    topic: "AI based 3D City Modeling",
    year: "2025",
    mediaContent: "/images/research/s2c2.png"
  },
  {
    id: 33,
    title: "gdverse: An R Package for Spatial Stratified Heterogeneity Family",
    desc: "the lack of a comprehensive and user-friendly software tool has greatly limitedtheir broader application in geospatial analysis and environmental modeling. To address this gap, an R package gdverse has beendeveloped to integrate various SSH models, leveraging R's rich statistical and spatial data processing capabilities while natively supporting multicore parallel computing in the widely used R environment. ",
    date: " https://doi.org/10.1111/tgis.70032",
    link: "https://www.researchgate.net/profile/Wenbo-Lv-3/publication/390204234_gdverse_An_R_Package_for_Spatial_Stratified_Heterogeneity_Family/links/67e4e367920b736ca9b08418/gdverse-An-R-Package-for-Spatial-Stratified-Heterogeneity-Family.pdf",
    articleId: "gdverse",
    topic: "Data Understanding",
    year: "2025",
    mediaContent: "/images/research/gdverse.png"
  },
  {
    id: 2,
    title: "Depth2Elevation: Scale Modulation with Depth Anything Model for Single-view Remote Sensing Image Height Estimation",
    desc: "In this study, we introduce the foundation model in the field of elevation estimation and propose a novel depth-to-elevation (Depth2Elevation) model, marking the first application of the depth anything model (DAM) to height estimation in remote sensing images. ",
    link: "https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10978076",
    date: "doi: 10.1109/TGRS.2025.3564820.",
    articleId: "d2e",
    topic: "AI based 3D City Modeling",
    year: "2025",
    mediaContent: "/images/research/D2E.png"
  },
  {
    id: 1,
    title: "BuildingView: Constructing Urban Building Exteriors Databases with Street View Imagery and Multimodal Large Language Mode",
    desc: "To address these challenges, we propose BuildingView, a novel approach that integrates high-resolution visual data from Google Street View with spatial information from OpenStreetMap via the Overpass API. This research improves the accuracy of urban building exterior data, identifies key sustainability and design indicators, and develops a framework for their extraction and categorization. Our methodology includes a systematic literature review, building and Street View sampling, and annotation using the ChatGPT-4O API. The resulting database, validated with data from New York City, AmData Understanding tool for urban studies, supporting informed decision-making in urban planning, architectural design, and environmental policy.",
    link: "https://arxiv.org/abs/2409.19527",
    date: "arXiv:2409.19527",
    articleId: "BV",
    topic: "Built-environment and Urban System Understanding",
    year: "2024",
    mediaContent: "/images/publication/BV.png"
  }
];
