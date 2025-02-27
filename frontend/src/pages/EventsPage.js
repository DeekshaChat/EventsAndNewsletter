// import React from 'react';
// import EventDetailPage from './EventDetailPage';
// import { Link } from 'react-router';

// const DUMMY_EVENTS = [
//   {
//     id: 'e1',
//     title: 'Programming for Everyone',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png',
//     date: '2022-02-12',
//     location: 'My Street 22, 12345 San Francisco'
//   },
//   {
//     id: 'e2',
//     title: 'Networking for Coders',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png',
//     date: '2022-03-12',
//     location: 'My Street 22, 12345 San Francisco'
//   },
//   {
//     id: 'e3',
//     title: 'Networking for Coders',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png',
//     date: '2022-04-12',
//     location: 'My Street 22, 12345 San Francisco'
//   },
// ];

// export default function EventsPage() {
//   return (
//     <div>
//       <h1>Events Page</h1>
//       <ul>
//         {
//           DUMMY_EVENTS.map((event) => (
//             <li key={event.id}>
//             {/* Correct way to use Link */}
//             <Link to={`/events/${event.id}`}>{event.title}</Link>
//           </li>
//           ))
//         }
//       </ul>
//     </div>
//   )
// }


import EventsList from '../components/EventsList';
import { useLoaderData } from 'react-router';

function EventsPage() {
  const events = useLoaderData();
  return (
    <>
      {<EventsList events={events} />}
    </>
  );
}

export default EventsPage;

export async function eventsLoader() {
  const response = await fetch('http://localhost:8080/events/');
  console.log('response', response);
  
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {status: 500});
  } else {
    const resData = await response.json();
    return resData.events;
  }
}