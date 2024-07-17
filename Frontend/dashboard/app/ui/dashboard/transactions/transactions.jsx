import styles from "./transactions.module.css"


const Transactions = () => {
  return (

    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                Bottle of Water
                </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>Pending</span>
              </td>
              <td>
              07/14/2024
              </td>
              <td>
              $32.00
              </td>
          </tr>
          
          <tr>
            <td>
              <div className={styles.user}>
                Personal Training Session
                </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>Done</span>
              </td>
              <td>
              07/05/2024
              </td>
              <td>
              $54.00
              </td>
          </tr>
                              
          <tr>
            <td>
              <div className={styles.user}>
                Dues
                </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>Cancelled</span>
              </td>
              <td>
              07/01/2024
              </td>
              <td>
              $132.00
              </td>
            </tr>
        </tbody>
    </table>

</div>

  );
};

export default Transactions;