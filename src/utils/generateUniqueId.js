export default function generateUniqueId() {
    const timestamp = Date.now().toString(36); // Convert timestamp to base 36 string
    const randomNum = Math.random().toString(36).substr(2, 5); // Generate a random number and extract a substring
    const uniqueId = timestamp + randomNum; // Combine the timestamp and random number to create a unique ID
    return uniqueId;
}