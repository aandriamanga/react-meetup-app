import classes from './MeetupItem.module.css';
import Card from './ui/Card';

function MeetupItem(props) {
  return (
    <ul>
      <li className={classes.item}>
        <Card>
          <div className={classes.image}>
            <img alt={props.title} src={props.image} />
          </div>
          <div className={classes.content}>
            <h3>{props.title}</h3>
            <address>{props.address}</address>
            <p>{props.description}</p>
          </div>
          <div className={classes.actions}>
            <button>To Favorites</button>
          </div>
        </Card>
      </li>
    </ul>
  );
}

export default MeetupItem;
