import styles from './MeetupItem.module.css';

function MeetupItem(props) {
  return (
    <ul>
      <li className={styles.item}>
        <div className={styles.image}>
          <img alt={props.title} src={props.image} />
        </div>
        <div className={styles.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={styles.actions}>
          <button>To Favorites</button>
        </div>
      </li>
    </ul>
  );
}

export default MeetupItem;
