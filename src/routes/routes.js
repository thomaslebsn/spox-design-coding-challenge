import React, { lazy } from "react";

const HomePage = lazy(() => import("../pages/Homepage"));

const Signuppage = lazy(() => import("../pages/Signuppage"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage"));
const VerifyEmailPage = lazy(() => import("../pages/VerifyEmailPage"));
const WizardProjectPage = lazy(() => import("../pages/WizardProjectPage"));
const WizardPage = lazy(() => import("../pages/WizardPage"));

const CreateContentPage = lazy(() => import("../pages/CreateContentPage"));
const CampaignsPage = lazy(() => import("../pages/CampaignsPage"));
const WizardPopup = lazy(() => import("../pages/WizardPopup"));
const ChannelsPage = lazy(() => import("../pages/ChannelsPage"));
const SocialMediaPage = lazy(() => import("../pages/SocialMediaPage"));
const CalendarPage = lazy(() => import("../pages/CalendarPage"));
const ContentPage = lazy(() => import("../pages/ContentPage"));

const Projects = lazy(() => import("../containers/Projects"));
const LoginPage = lazy(() => import("../containers/LoginPage"));
const PersonasPage = lazy(() => import("../containers/PersonasPage"));

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
    path: "/wizardproject",
    exact: true,
    main: () => <WizardProjectPage />,
  },
  {
    path: "/wizard",
    exact: true,
    main: () => <WizardPage />,
  },
  {
    path: "/projects",
    exact: false,
    main: ({ match, location }) => (
      <Projects match={match} location={location} />
    ),
  },
  {
    path: ["/personas", "/personas/create", "/personas/edit/:id"],
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
    path: "/content",
    exact: false,
    main: ({ match, location }) => (
      <ContentPage match={match} location={location} />
    ),
  },
];

export { authRoutes, mainRoutes };
