/** @format */

import Frame from '@pages/partials/Frame'
import NotFound from '@pages/partials/NotFound'

export default [
  {
    path: '/',
    meta: {
      title: window.$appTitle
    },
    component: resolve => require(['@pages/Main'], resolve)
  },
  {
    path: '/about-sigmate',
    name: 'about-sigmate',
    component: () => import('@pages/About.vue')
  },
  {
    path: '/index',
    redirect: '/'
  },
  {
    path: '*',
    meta: {
      title: 'Page Not Found'
    },
    component: NotFound
  }
]
