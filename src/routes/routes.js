import React, { lazy } from 'react';

const NewsPage = lazy(() => import('../containers/NewsPage'));
const WelcomePage = lazy(() => import('../containers/WelcomePage'));

const mainRoutes = [
  {
    path: '/',
    exact: true,
    main: () => <WelcomePage />,
  },
  {
    path: '/news',
    exact: false,
    main: ({ match, location }) => <NewsPage match={match} location={location} />,
  },
];

export { mainRoutes };
