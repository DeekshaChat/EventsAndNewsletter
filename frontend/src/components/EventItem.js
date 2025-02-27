import { Link, useSubmit } from 'react-router';
import classes from './EventItem.module.css';

function EventItem({ event }) {
  console.log('event', event);
  
  const submit = useSubmit();
  function startDeleteHandler() {
   
    const proceed = window.confirm('Are you sure?');
    console.log('proceed====', proceed);
    
    if (proceed) {
      submit(null, {method: 'delete'});
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to={'edit'}>Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
