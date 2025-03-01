import React from 'react';
import { redirect, useLoaderData, useParams, useRouteLoaderData } from 'react-router';
import EventItem from '../components/EventItem';
import { getAuthToken } from '../util/auth';

export default function EventDetailPage(props) {
  // const { event } = props;
  const { id } = useParams();
  const data = useRouteLoaderData('event-detail');
  console.log('event=====', data);
  
  return (
    <EventItem event={data} id={id} />
    // <div>EventDetailPage - {id}</div>
  )
}

export async function eventDetailLoader({ request, params }) {
  console.log('request====', request);
  
  const id = params.id;
  const response = await fetch('http://localhost:8080/events/' + id);
  console.log('response====', response);
  
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch event details' }), {status: 500});
  } else {
    const resData = await response.json();
    console.log('response====33333', resData);
    return resData.event;
  }
}

export async function deleteEventAction({ params }) {
  const id = params.id;
  const token = getAuthToken();
  
  const response = await fetch('http://localhost:8080/events/' + id, {
    method: 'delete',
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  });
  console.log('response====4444=====', response);
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not delete event' }), {status: 500});
  } else {
    
    return redirect('/events');
  }
}
