import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

const Card = () => {
  return (
          
      <div className={styles.container}>
        <MdSupervisedUserCircle size={24} />

      <div className={styles.texts}>
                  <span className={styles.title}>Card.jsx</span>
          <span className={styles.title}>Upgrade Your Membership!</span>
          <span className={styles.number}>10.00</span>
          <span className={styles.detail}> act now </span>
      </div>
      </div>
     
  
  );
};

export default Card;