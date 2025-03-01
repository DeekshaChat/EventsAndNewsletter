import { Form, redirect, useNavigate, useNavigation } from 'react-router-dom';

import classes from './EventForm.module.css';
import { getAuthToken } from '../util/auth';

function EventForm({ method, event }) {
  console.log('method', method);
  
  const navigate = useNavigate();
  const isSubmitting = useNavigation().state === 'submitting';
  function cancelHandler() {
    navigate('..');
  }

  function saveHandler(){
    console.log('saveHandler');
  }

  return (
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required  defaultValue={event ? event.title : ''}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date: ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button onClick={saveHandler} disabled={isSubmitting}>{isSubmitting ? 'Submiting' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function changeEventAction({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const event = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };
  console.log(event);

  let url = 'http://localhost:8080/events';
  if (method === 'PATCH') {
    url += '/' + params.id;
  }
  console.log('url====', url);
  
 const token = getAuthToken();

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
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

