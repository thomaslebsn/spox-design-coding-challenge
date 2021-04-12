import React, { lazy } from "react";

// const HomePage = lazy(() => import("../pages/Homepage"));

const Signuppage = lazy(() => import("../containers/SignUpPage"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage"));
const VerifyEmailPage = lazy(() => import("../pages/VerifyEmailPage"));

// const ChannelsPage = lazy(() => import("../pages/ChannelsPage"));
const SocialMediaPage = lazy(() => import("../pages/SocialMediaPage"));
const CalendarPage = lazy(() => import("../pages/CalendarPage"));

const HomePage = lazy(() => import("../containers/Homepage"));
const Projects = lazy(() => import("../containers/ProjectsPage"));
const LoginPage = lazy(() => import("../containers/LoginPage"));
const PersonasPage = lazy(() => import("../containers/PersonasPage"));
const CampaignsPage = lazy(() => import("../containers/CampaignsPage"));
const ContentPage = lazy(() => import("../containers/ContentPage"));
const WizardPage = lazy(() => import("../containers/WizardPage"));
const AnalyticsPage = lazy(() => import("../containers/AnalyticsPage"));
const BillingPlanPage = lazy(() => import("../containers/BillingPlanPage"));
const ChannelsPage = lazy(() => import("../containers/ChannelsPage"));
const ProfilePage = lazy(() => import("../containers/ProfilePage"));
const DigitalAssetsPage = lazy(() => import("../containers/DigitalAssetsPage"));

const authRoutes = [
  {
    path: "/login",
    exact: true,
    main: () => <LoginPage />,
  },
  {
    path: "/signup",
    exact: true,
    main: () => <Signuppage />,
  },
  {
    path: "/forgot-password",
    exact: true,
    main: () => <ForgotPasswordPage />,
  },
  {
    path: "/verify",
    exact: true,
    main: () => <VerifyEmailPage />,
  },
];

const mainRoutes = [
  {
    path: "/",
    exact: true,
    main: () => <HomePage />,
  },
  {
    path: [
      "/wizard",
      "/wizard/createproject",
      "/wizard/project/:id",
      "/wizard/project/:id/content",
      "/wizard/:id/content",
      "/wizard/content",
    ],
    exact: true,
    main: ({ match, location }) => (
      <WizardPage match={match} location={location} />
    ),
  },
  {
    path: "/projects",
    exact: false,
    main: ({ match, location }) => (
      <Projects match={match} location={location} />
    ),
  },
  {
    path: [
      "/personas",
      "/personas/create",
      "/personas/edit/:id",
      "/personas/create/:bypersonatemplate/:id",
    ],
    exact: true,
    main: ({ match, location }) => (
      <PersonasPage match={match} location={location} />
    ),
  },

  {
    path: "/campaigns",
    exact: false,
    main: ({ match, location }) => (
      <CampaignsPage match={match} location={location} />
    ),
  },
  {
    path: "/channels",
    exact: false,
    main: ({ match, location }) => (
      <ChannelsPage match={match} location={location} />
    ),
  },
  {
    path: "/social-media",
    exact: false,
    main: ({ match, location }) => (
      <SocialMediaPage match={match} location={location} />
    ),
  },
  {
    path: "/calendar",
    exact: false,
    main: ({ match, location }) => (
      <CalendarPage match={match} location={location} />
    ),
  },
  {
    path: ["/content", "/content/create", "/content/edit/:id"],
    exact: true,
    main: ({ match, location }) => (
      <ContentPage match={match} location={location} />
    ),
  },
  {
    path: "/analytics",
    exact: false,
    main: ({ match, location }) => (
      <AnalyticsPage match={match} location={location} />
    ),
  },
  {
    path: "/digital-assets",
    exact: false,
    main: ({ match, location }) => (
      <DigitalAssetsPage match={match} location={location} />
    ),
  },
];

const settingRoutes = [
  {
    path: "/billing-plan",
    exact: false,
    main: ({ match, location }) => (
      <BillingPlanPage match={match} location={location} />
    ),
  },
  {
    path: "/profile",
    exact: false,
    main: ({ match, location }) => (
      <ProfilePage match={match} location={location} />
    ),
  },
];

export { authRoutes, mainRoutes, settingRoutes };
