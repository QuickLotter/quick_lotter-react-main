// utils/getUserState.ts
export async function getUserState() {
  try {
    const response = await fetch("https://ipapi.co/json");
    const data = await response.json();
    return data.region_code; // Ex: "NY", "CA"
  } catch (error) {
    return null;
  }
}
