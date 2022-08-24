import { lazy } from 'react';
import { IRoutes } from './@types/type';
import Layouts from '../layouts/Layouts';
import routesPath from './path.routes';
import AdminLayouts from '../layouts/admin-layouts';

const privateRoutes: IRoutes[] = [
  {
    title: 'admin-bookmakers',
    // path: routesPath.ADMIN_BOOKMARKER,
    isPublic: false,
    layout: AdminLayouts,
    navLowerLayer: false,
    component: lazy(() => import('../pages/admin/bookmarker/bookmarker')),
  },
  {
    title: 'user-profile',
    path: routesPath.USER_PROFILE,
    isPublic: false,
    layout: Layouts,
    navLowerLayer: true,
    component: lazy(() => import('../pages/user-profile/user-profile')),
  },
];

export default privateRoutes;
