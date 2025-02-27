import React from 'react'
import EventForm from '../components/EventForm'
import { redirect } from 'react-router';

export default function NewEventPage() {
  return (
    <EventForm method={'POST'} />
  )
}

export async function newEventAction({ request, params }) {
  const data = await request.formData();
  const event = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };
  console.log(event);

  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Response({ message: 'Could not create event.' }, { status: 500 });
  }

  else {
    return redirect('/events');
  }
    
}
