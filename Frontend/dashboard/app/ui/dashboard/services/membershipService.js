// services/membershipService.js

export const fetchMembership = async (custCode) => {
  try {
    // Replace `localhost:8080` with your actual backend URL if different
    const response = await fetch(
      `http://vSQL2019Test:8080/memberships/${custCode}`
    );

    const data = await response.json();
    console.log("Fetched membership data:", data); // Log the fetched data

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return data;
  } catch (error) {
    throw new Error(`Failed to fetch membership data: ${error.message}`);
  }
};
