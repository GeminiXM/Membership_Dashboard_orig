"use client";

import styles from './chart.module.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useEffect, useState } from 'react';
import { fetchUsage } from '../services/usageService';

const data = [
  {
    name: "Sun",
    visit: 4000,
    click: 2400,
  },
  {
    name: "Mon",
    visit: 3000,
    click: 1398,
  },
  {
    name: "Tue",
    visit: 2000,
    click: 3800,
  },
  {
    name: "Wed",
    visit: 2780,
    click: 3908,
  },
  {
    name: "Thu",
    visit: 1890,
    click: 4800,
  },
  {
    name: "Fri",
    visit: 2390,
    click: 3800,
  },
  {
    name: "Sat",
    visit: 3490,
    click: 4300,
  },
];

const Chart = () => {
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching usage data...');
        const usageData = await fetchUsage('083376'); // Fetch usage data
        console.log('Fetched usage data:', usageData);

        if (usageData && usageData.usage && usageData.usage.length > 0) {
          setUsage(usageData.usage);
        } else {
          console.log('No usage data found.');
          setUsage([]); // Set an empty array if no data is found
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>Error: {error}</div>;
  if (!usage || usage.length === 0) return <div className={styles.container}>No usage data found.</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Usage - Weekly Recap -- Keep It Up!</h2>
      <div className={styles.chartContainer}>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
              <Legend />
              <Line type="monotone" dataKey="visit" stroke="#8884d8" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="click" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
         <div className={styles.textWrapper}>
          <div className={styles.headerRow}>
            <p>Name</p>
            <p>Club</p>
            <p>Usage</p>
          </div>
          {usage.map((entry, index) => (
            <div key={index} className={styles.row}>
              <p>{entry.fname}</p>
              <p>{entry.club_name}</p>
              <p>{entry.usage}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chart;
