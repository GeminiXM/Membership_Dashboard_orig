"use client"; // Add this at the top of the file
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
import React, { useEffect, useState } from 'react';
import { fetchMembership } from '../ui/dashboard/services/membershipService';

const Dashboard = () => {
  const [membership, setMembership] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMembership = async () => {
      try {
        const data = await fetchMembership('083376');
        setMembership(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getMembership();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!membership) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card />
          <Card />
        
        </div>
        <Chart />
        <Transactions />
        <div>
          <h1>Dashboard</h1>
          <pre>{JSON.stringify(membership, null, 2)}</pre>
        </div>
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;