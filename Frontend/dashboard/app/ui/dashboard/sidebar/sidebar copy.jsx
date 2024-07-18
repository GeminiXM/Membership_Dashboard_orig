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
  const [error, setError] = useState(null);
  const [nonPrimaryMembersList, setNonPrimaryMembersList] = useState([]); // Rename to avoid redeclaration

  useEffect(() => {
    const getMembership = async () => {
      try {
        const data = await fetchMembership('083376'); // Replace with your dynamic ID retrieval logic
        setMembership(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getMembership();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!membership) return <div>Loading...</div>;

  const primaryMember = membership.find(member => member.role.trim() === 'Primary');
  const nonPrimaryMembers = membership.filter(member => member.role.trim() !== 'Primary');

  if (!primaryMember) {
    return <div>Error: Primary member not found</div>;
  }

  // Trim extra spaces from database columns
    const trimmedCust_Code = primaryMember.cust_code.trim();
  const trimmedPrimaryFirstName = primaryMember.fname.trim();
  const trimmedPrimaryLastName = primaryMember.lname.trim();
  const trimmedRole = primaryMember.role.trim();
  const trimmedMembershipType = primaryMember.membership_type.trim();

  return (
    <aside>
      <div className={styles.container}>
        <div className={styles.userDetail}>
          <span className={styles.Primaryusername}>{trimmedPrimaryFirstName} {trimmedPrimaryLastName} - {trimmedCust_Code}</span>
          <span className={styles.userTitle}>{trimmedRole} Member</span>
          <span className={styles.userTitle}>{trimmedMembershipType} Membership</span>
        </div>
        <div className={styles.space}></div> {/* Add a div for spacing */}
        
        <ul className={styles.ulpad}>
          {nonPrimaryMembers.map(member => (
            <li key={member.mbr_code} className = {styles.lipad}>
              <span className={styles.userTitle}>{member.fname} {member.lname} - {member.role} - {member.bdate}</span> 
  
              {/* Add more member details as needed */}
            </li>
          ))}
        </ul>
        <div className={styles.spacedbl}></div> {/* Add a div for spacing */}
        </div>

      {/* Sidebar content */}
      <div className={styles.sidebarContent}>
        <ul>
           {menuItems.map(cat => (
            <li key={cat.title}>
              <span className={styles.cat}>{cat.title}</span>
              <ul>
                {cat.list.map(item => (
                  <li key={item.title}>
                    <MenuLink item={item} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;