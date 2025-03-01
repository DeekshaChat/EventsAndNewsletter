// Challenge / Exercise
import { createBrowserRouter, RouterProvider } from "react-router";
import EditEventPage from "./pages/EditEventPage";
import EventDetailPage, { deleteEventAction, eventDetailLoader } from "./pages/EventDetailPage";
import EventsPage, { eventsLoader } from "./pages/EventsPage";
import HomePage from "./pages/HomePage";
import NewEventPage, { newEventAction } from "./pages/NewEventPage";
import RootLayout from "./RootLayout";
import EventsLayout from "./EventsLayout";
import ErrorPage from "./pages/ErrorPage";
import { changeEventAction } from "./components/EventForm";
import NewsletterPage, { newsletterAction } from './pages/NewsletterPage';
import AuthenticationPage, { authAction } from "./pages/AuthenticationPage";
import { checkAuthLoader, logoutAction, tokenLoader } from "./pages/Logout";

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,
    id: 'root',
    loader: tokenLoader,
    children: [
      {
          index: true,
          element: <HomePage/>
      },
      {
        path: 'events',
        element: <EventsLayout/>,
        children:[
          {
            index: true,
            element: <EventsPage/>,
            loader: eventsLoader,
          },
          {
            path: ':id',
            id:'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage/>,
                action: deleteEventAction
              },
              {
                path: 'edit', // if '/' in the path, it will be absolute path. This is relative path.
                element: <EditEventPage/>,
                action: changeEventAction,
                loader: checkAuthLoader
              },
            ]
          },
          {
            path: 'new',
            element: <NewEventPage/>,
            action: changeEventAction,
            loader: checkAuthLoader
          },

        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'auth',
        element: <AuthenticationPage/>,
        action: authAction
      },
      {
        path: 'logout',
        action: logoutAction
      }

    ]
  },
]);

function App() {
  return <RouterProvider router={router}/>
}

export default App;

