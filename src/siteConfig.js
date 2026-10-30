// Single place for contact details and links used across the site.
// TODO(AgroStart team): confirm the phone, email and WhatsApp number below.
export const SITE = {
  name: 'AgroStart Digital Agriculture Academy',
  url: 'https://www.agrostart.in',
  legalName: 'AgroStart Agribusiness (OPC) Pvt. Ltd.',
  email: 'agrostart@skilldesk.ai',
  phone: '+91 94385 26400',
  whatsappNumber: '919438526400', // digits only, with country code
  location: 'Bhubaneswar, Odisha, India',
  linkedin: 'https://www.linkedin.com/company/agrostart-agribusiness-pvt-ltd/',
  instagram: '', // add the real address to show the Instagram icon
  twitter: '', // add the real address to show the Twitter icon
  demoUrl: 'https://calendly.com/skilldeskdemo/skilldesk-demo?month=2026-07',
};

export const whatsappLink = (text = 'Hello AgroStart, I would like to know more about your courses.') =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
