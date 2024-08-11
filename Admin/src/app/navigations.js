export const navigations = [
  {
    name: 'Dashboard',

    icon: 'home',

    children: [{ name: 'Home', iconText: 'home', path: '/dashboard/default' }]
  },

  {
    name: 'General',
    icon: 'settings',
    children: [
      { name: 'Personal Setting', iconText: 'P', path: '/backend/profile/details' },
      { name: 'Role', iconText: 'R', path: '/backend/role' }
    ]
  },
  {
    name: 'User and Control',
    icon: 'group',
    children: [
      { name: 'User', iconText: 'U', path: '/backend/user' },
      { name: 'Profile', iconText: 'P', path: '/backend/profile' }
    ]
  },

  {
    name: 'Our Faqs',
    icon: 'announcement',

    children: [
      { name: 'Item', path: '/backend/faq', iconText: 'F' },
      { name: 'Create Item', path: '/backend/manage-faq', iconText: 'F' },
      { name: 'Categories', path: '/backend/category-faq', iconText: 'F' },
      { name: 'Create Categories ', path: '/backend/manage-faq-category', iconText: 'F' }
    ]
  },
  {
    name: 'Articles',
    icon: 'forum',

    children: [
      { name: 'Blogs', path: '/backend/blog', iconText: 'B' },
      { name: 'Create Blogs', path: '/backend/manage-blog', iconText: 'B' },
      { name: 'Categories', path: '/backend/category-blog', iconText: 'B' },
      { name: 'Create Categories', path: '/backend/manage-blog-category', iconText: 'B' }
    ]
  },
  {
    name: 'Our Partners',
    icon: 'assignment_ind',

    children: [
      { name: 'Partners', path: '/backend/partner', iconText: 'P' },
      { name: 'Create Partner', path: '/backend/manage-partner', iconText: 'P' }
    ]
  },
  {
    name: 'Reviews',
    icon: 'contact_mail',

    children: [
      { name: ' Customer Reviews', path: '/backend/testimonials', iconText: 'T' },
      { name: 'Reseller Experiences ', path: '/backend/reseller', iconText: 'T' },
      { name: 'Partners Experience', path: '/backend/partners', iconText: 'T' },
      { name: 'Create Reviews', path: '/backend/testimonials-create', iconText: 'T' }
    ]
  },
  {
    name: 'The News',
    icon: 'contacts',

    children: [
      { name: 'Press', path: '/backend/press', iconText: 'P' },
      { name: 'Create Press', path: '/backend/manage-press', iconText: 'P' }
    ]
  },
  {
    name: 'Life @ Digi2L',
    icon: 'people',

    children: [
      { name: 'Life', path: '/backend/life', iconText: 'L' },
      { name: 'Create Life', path: '/backend/manage-life', iconText: 'L' }
    ]
  },
  {
    name: 'Ongoing Offers',
    icon: 'note_add',

    children: [
      { name: 'Offers', path: '/backend/offers', iconText: 'O' },
      { name: 'Create Offers', path: '/backend/manage-offers', iconText: 'O' }
    ]
  },
  {
    name: 'Success Stories',
    icon: 'photo',

    children: [
      { name: 'Stories', path: '/backend/stories', iconText: 'S' },
      { name: 'Create Stories', path: '/backend/manage-stories', iconText: 'S' }
    ]
  },

  {
    name: 'Current Openings',
    icon: 'contact_mail',

    children: [
      { name: 'Current Openings', path: '/backend/current-openings', iconText: 'C' },
      { name: 'Create Current Openings', path: '/backend/manage-current-openings', iconText: 'C' }
    ]
  },
  {
    name: 'Cities Serving',
    icon: 'screen_share',

    children: [
      { name: 'Serving', path: '/backend/serving', iconText: 'S' },
      { name: 'Create Serving', path: '/backend/manage-serving', iconText: 'S' }
    ]
  },
  {
    name: 'Optimazition Page',
    icon: 'forum',

    children: [
      { name: 'Page', path: '/backend/routes-page', iconText: 'P' },
      { name: 'Create Page', path: '/backend/manage-routes-page', iconText: 'P' }
    ]
  },
  {
    name: ' What Do Your Message',
    icon: 'screen_share',

    children: [{ name: 'Customers See ', path: '/backend/contact-enquires', iconText: 'H' }]
  },
  {
    name: ' Top Navigation',
    icon: 'people',

    children: [
      { name: 'Menu', path: '/backend/menu', iconText: 'C' },
      { name: 'Create Dropdown', path: '/backend/manage-submenu', iconText: 'C' },
      { name: 'Create Menu', path: '/backend/manage-menu', iconText: 'C' }

      // { name: 'Create Menu', path: '/menu-create', iconText: 'C' }
    ]
  },

  {
    name: 'Top Icon Bar',
    icon: 'people',

    children: [
      { name: 'Icon', path: '/backend/icon', iconText: 'C' },
      { name: 'Create Icon', path: '/backend/manage-icon', iconText: 'C' }
    ]
  },
  {
    name: 'Bottom Navigation',
    icon: 'note_add',

    children: [
      { name: 'Footer', path: '/backend/footer', iconText: 'C' },

      { name: 'Create Heading', path: '/backend/manage-footer-menu', iconText: 'C' },
      { name: 'Create Menu', path: '/backend/manage-footer-sub-menu', iconText: 'C' }
    ]
  },
  {
    name: 'Bottom Follow Us ',
    icon: 'note_add',

    children: [
      { name: 'Follow', path: '/backend/follow', iconText: 'C' },
      { name: 'Create Follow', path: '/backend/manage-follow', iconText: 'C' }
    ]
  },
  {
    name: 'Bottom Details ',
    icon: 'note_add',

    children: [
      { name: ' Details', path: '/backend/footer-detail', iconText: 'C' },
      { name: 'Create Details', path: '/backend/manage-detail', iconText: 'C' }
    ]
  },
  {
    name: ' Logo',
    icon: 'people',

    children: [
      { name: 'Top Logo', path: '/backend/logo', iconText: 'C' },
      { name: 'Footer Logo', path: '/backend/footer-logo', iconText: 'C' }
    ]
  },

  {
    name: 'Quick Links',
    icon: 'contacts',

    children: [
      { name: 'Link', path: '/backend/link', iconText: 'C' },
      { name: 'Create Link', path: '/backend/manage-link', iconText: 'C' }
    ]
  },
  {
    name: 'Counter',
    icon: 'contacts',

    children: [{ name: 'Counter', path: '/backend/counter', iconText: 'C' }]
  },
  {
    name: ' Auth User',
    icon: 'security',
    children: [
      { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
      { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
      {
        name: 'Forgot Password',
        iconText: 'FP',
        path: '/session/forgot-password'
      }
    ]
  },

  {
    name: 'Digi2l.com',
    icon: 'launch',
    type: 'extLink',
    path: 'https://digi2l.in/',
    color: 'white'
  }
];
