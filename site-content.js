export const defaultSiteContent = {
  business: {
    phoneDisplay: "(731) 694-6818",
    phoneHref: "tel:7316946818",
    email: "dinkinslandmgmt@gmail.com",
    emailHref: "mailto:dinkinslandmgmt@gmail.com",
    facebookUrl: "https://www.facebook.com/share/1EMjycvWiQ/?mibextid=wwXIfr",
  },
  hero: {
    eyebrow: "Licensed & Insured",
    titleHtml: 'Expert Land Work, <br /><span class="text-brandOrange">Done Right</span>',
    description:
      "From gravel driveways and excavation to small land clearing, grading, and drainage solutions, we prepare residential and commercial properties with precision, care, and reliable results.",
  },
  services: {
    heading: "What We Do",
    items: [
      {
        icon: "fa-tree",
        title: "Land Clearing",
        description:
          "Brush removal, tree clearing, and stump grinding to take back your overgrown property.",
      },
      {
        icon: "fa-water",
        title: "Drainage Solutions",
        description:
          "Protect your property with effective drainage solutions designed to prevent standing water, erosion, and foundation issues. We install systems that keep your landscape safe, dry, and functional year-round.",
      },
      {
        icon: "fa-mountain-sun",
        title: "Excavation",
        description:
          "Site prep, grading, trenching, and dirt work handled with precision equipment.",
      },
      {
        icon: "fa-road",
        title: "Driveways",
        description:
          "Gravel driveway installs, driveway reconditioning, and resurfacing.",
      },
      {
        icon: "fa-hammer",
        title: "Demolition",
        description:
          "Wreck out, haul-off, and removal services to clear the way for your next project.",
      },
      {
        icon: "fa-pen-ruler",
        title: "Landscape Design",
        description:
          "Custom outdoor designs that combine beauty, function, and value. We create personalized landscapes with plants, patios, lighting, and layout planning tailored to your property.",
      },
    ],
  },
  portfolio: {
    eyebrow: "Featured Project",
    title: "Gravel Driveway Work",
    description:
      "Take a look at a completed gravel driveway project by Dinkins Land Management. From shaping and grading to a clean gravel finish, we build driveways that are ready for everyday use.",
    ctaText: "Request Driveway Quote",
    photos: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/dinkins-7adf1.firebasestorage.app/o/IMG_0115.jpeg?alt=media&token=654e2034-e615-4e2a-bdaa-321f82307c38",
        alt: "Completed gravel driveway work by Dinkins Land Management",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/dinkins-7adf1.firebasestorage.app/o/IMG_0114.jpeg?alt=media&token=28226773-77ef-4028-bfbd-a59556f5532d",
        alt: "Gravel driveway grading and resurfacing work by Dinkins Land Management",
      },
    ],
  },
  contact: {
    heading: "Request a Quote",
    description: "Or give us a call directly at",
  },
  footer: {
    tagline: "Licensed & Insured",
  },
  customSections: [],
};

export function mergeSiteContent(savedContent = {}) {
  return {
    ...defaultSiteContent,
    ...savedContent,
    business: { ...defaultSiteContent.business, ...(savedContent.business || {}) },
    hero: { ...defaultSiteContent.hero, ...(savedContent.hero || {}) },
    services: {
      ...defaultSiteContent.services,
      ...(savedContent.services || {}),
      items: savedContent.services?.items?.length
        ? savedContent.services.items
        : defaultSiteContent.services.items,
    },
    portfolio: {
      ...defaultSiteContent.portfolio,
      ...(savedContent.portfolio || {}),
      photos: savedContent.portfolio?.photos?.length
        ? savedContent.portfolio.photos
        : defaultSiteContent.portfolio.photos,
    },
    contact: { ...defaultSiteContent.contact, ...(savedContent.contact || {}) },
    footer: { ...defaultSiteContent.footer, ...(savedContent.footer || {}) },
    customSections: savedContent.customSections || defaultSiteContent.customSections,
  };
}
