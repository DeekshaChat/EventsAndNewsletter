import React from 'react'
import { useParams, useRouteLoaderData } from 'react-router';
import EventForm from '../components/EventForm';

export default function EditEventPage() {
  const { id } = useParams();
  const data = useRouteLoaderData('event-detail');
  console.log('EditEventPage=====', data);
  
  return (
    <EventForm event={data} method={'PATCH'}/>
  )
}
