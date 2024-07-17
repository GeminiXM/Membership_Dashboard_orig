// services/membershipService.js

export const fetchMembership = async (custCode) => {
  try {
    // Replace `localhost:8080` with your actual backend URL if different
    const response = await fetch(
      `http://localhost:8080/memberships/${custCode}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch membership data: ${error.message}`);
  }
};
