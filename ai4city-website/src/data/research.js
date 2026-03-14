export const RESEARCH_FOCUS = [
  {
    id: 1, 
    title: "AI based 3D City Modeling",
    desc: `- Generative-AI based 3D modeling
- 3DGS, point cloud, mesh learning
- Multi-perspective/modal based reconstruction
- RS imagery interpretation`,
    img: "/images/research/AccuCities-Accurate-3D-site-models.png", 
    date: "Updated Oct 10 2025",
    example: "Just like the ULSR-GS",
    link: "https://www.sciencedirect.com/science/article/pii/S092427162500396X?via%3Dihub"
  },
  {
    id: 2, 
    title: "Spatio-temporal (4D) Data Fusion",
    desc: `- Multi-modal data representation learning
- Spatio-temporal causality
- AI Agentic workflow
- XR scene interaction`,
    img: "/images/research/spt.png", 
    date: "Updated Oct 10 2025",
    example: "Just like our gdverse package",
    link: "https://www.researchgate.net/publication/390204234_gdverse_An_R_Package_for_Spatial_Stratified_Heterogeneity_Family"
  },
  {
    id: 3, 
    title: "Built-environment and Urban System Understanding",
    desc: `- Low-altitude intelligence
- Urban health (mobility, human diseases)
- Disaster Assessment
- Carbon neutrality and thermal environment`,
    img: "/images/research/maxresdefault.jpg", 
    date: "Updated Oct 10 2025",
    example: "Just like the BuildingView",
    link: "https://www.sciencedirect.com/science/article/pii/S092427162500396X?via%3Dihub"
  }
];

export const RESEARCH_PROJECTS = [
  {
    id: 4, 
    title: "ULSR-GS: Urban-scale Large Surface Reconstruction based on Gaussian Splatting",
    desc: "The latest work ULSR-GS[2] from our group, building upon the previous MVG-Splatting[3], proposes a 'point-to-photo partitioning + multi-view guided densification + cross-view depth/normal consistency constraint' framework: only the most relevant images are assigned to each sub-region, which is then optimized through multi-view depth aggregation and consistency loss for densification. It supports cross-GPU parallel training and enables independent mesh extraction with seamless stitching across sub-regions. On multiple urban-scale aerial survey datasets, it achieves consistent improvements over existing GS methods and significantly outperforms traditional MVS-based pipelines in overall runtime, opening new technical pathways for applications such as remote sensing mapping and digital twins.",
    img: "/images/news/ULSR/640.png", 
    date: "Updated Oct 10 2025",
    articleId: 'research-multimodal',
    link: "https://mp.weixin.qq.com/s/aNZjGcmorOJKLHZeelAmtw",
    topic: "Al based 3D City Modeling",
    year: "2026"
  },
  {
    id: 3, 
    title: "ICCV25—Sat2City: High-Fidelity 3D City Generation from a Single Satellite Image via Cascaded Latent Diffusion Models",
    desc: "Sat2City achieves effective integration of diffusion models with voxel representations, demonstrating for the first time the feasibility of efficiently generating city-scale 3D models from a single 2D satellite image. Looking ahead, the team will focus on improving the model's generalization capability and computational efficiency on real-world urban remote sensing data, paving new technical pathways for applications such as remote sensing mapping and digital twins. Project page: https://ai4city-hkust.github.io/Sat2City/",
    img: "/images/research/s2c.png", 
    date: "Updated Oct 10 2025",
    articleId: 'research-multimodal',
    link: "https://mp.weixin.qq.com/s/Kl8IiA1A_vgr0P1F-yr30Q",
    topic: "Built-environment and Urban System Understanding",
    year: "2025"
  },
  {
    id: 2, 
    title: "Depth2Elevation: Single-View Remote Sensing Image Elevation Estimation via Visual Foundation Model Transfer",
    desc: "The Depth2Elevation model effectively transfers the depth estimation capability of DAM to the elevation estimation task for single-view remote sensing images by introducing a scale modulator and a resolution-adaptive decoder. The model achieves outstanding performance across multiple benchmark datasets, demonstrating its applicability and generalization ability at varying scales and scenes. The results provide more accurate and reliable elevation data support for a wide range of applications in geographic information science.",
    img: "/images/research/D2Ehr.png", 
    date: "Updated Sep 05 2025",
    articleId: 'Depth2Elevation',
    link: "https://mp.weixin.qq.com/s/JEKPHoqYUTONDszWnLk1uQ",
    topic: "Built-environment and Urban System Understanding",
    year: "2025"
  },
  {
    id: 1, 
    title: "gdverse: An Integrated Spatial Stratified Heterogeneity Modeling Toolkit",
    desc: "We developed an R package gdverse (Lv et al. 2025) dedicated to spatial stratified heterogeneity modeling. By designing a unified API interface and efficient algorithm implementations, it aims to facilitate the broader application of spatial stratified heterogeneity models.",
    img: "/images/research/gdverse.png", 
    date: "Updated Sep 05 2025",
    topic: "Spatio-temporal (4D) Data Fusion",
    year: "2025"
  }
];