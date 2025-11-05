export const siteName = 'Akshar Kids School';

export type NavigationItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const navigation: NavigationItem[] = [
  { href: '/', label: 'Home' },
  {
    href: '/about',
    label: 'About',
    children: [
      { href: '/about', label: 'About Us' },
      { href: '/policies', label: 'Policies' }
    ]
  },
  {
    href: '/academics',
    label: 'Academics',
    children: [
      { href: '/academics', label: 'Academics Overview' },
      { href: '/after-school-tuition', label: 'After-School Tuition' }
    ]
  },
  {
    href: '/admissions',
    label: 'Admissions',
    children: [
      { href: '/admissions', label: 'Admissions Process' },
      { href: '/inquiry', label: 'Inquiry Form' },
      { href: '/downloads', label: 'Downloads' }
    ]
  },
  {
    href: '/gallery',
    label: 'Community',
    children: [
      { href: '/gallery', label: 'Gallery' },
      { href: '/notices', label: 'Notices' },
      { href: '/faqs', label: 'FAQs' },
      { href: '/contact', label: 'Contact' }
    ]
  }
];

export const socialLinks = [
  { href: 'https://www.facebook.com', label: 'Facebook' },
  { href: 'https://www.instagram.com', label: 'Instagram' }
];
