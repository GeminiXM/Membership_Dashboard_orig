"use client";
import React, { useEffect, useState } from 'react';
import { fetchMembership } from '../services/membershipService';
import styles from "./sidebar.module.css";
import MenuLink from "./menuLink/menuLink";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";


const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Edit Account",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Club Usage",
        path: "/dashboard/usage",
        icon: <MdShoppingBag />,
      },
      {
        title: "Billing & Statements",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
            {
        title: "Class Schedule",
        path: "/dashboard/reservations",
        icon: <MdAttachMoney />,
      },
                  {
        title: "Upgrades / Downgrades",
        path: "/dashboard/upgrade",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];
const Sidebar = () => {
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching membership data...');
        const membershipData = await fetchMembership('083376'); // Fetch membership data
        console.log('Fetched membership data:', membershipData);

        if (membershipData && membershipData.member && membershipData.member.length > 0) {
          setMembership(membershipData.member);
        } else {
          console.log('No membership data found.');
          setMembership([]); // Set an empty array if no data is found
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
  if (error) return <div className={styles.container}>Error: {error.message}</div>;
  if (!membership || membership.length === 0) return <div className={styles.container}>No membership data found.</div>;


  return (
    <aside>
      <div className={styles.container}>
        {/* Display membership details */}
        {membership.map(member => (
          <div key={member.mbr_code} className={styles.member}>
            <p>Name: {member.fname.trim()} {member.lname.trim()}</p>
            <p>Role: {member.role.trim()}</p>
            <p>Email: {member.email}</p>
            {/* Add more member details as needed */}
            <p>Cust Code: {member.cust_code.trim()}</p> {/* Display cust_code */}
          </div>
        ))}

      </div>
    </aside>
  );
};

export default Sidebar;