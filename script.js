// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Store username in localStorage for demo purposes
    const username = document.getElementById("username").value;
    localStorage.setItem("username", username);

    // Show the interest setup form
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("interestSetup").style.display = "block";
});

// Handle interest form submission
document.getElementById("interestForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the selected interests
    const selectedInterests = Array.from(document.getElementById("interests").selectedOptions).map(option => option.value);
    
    // Save selected interests in localStorage
    localStorage.setItem("interests", JSON.stringify(selectedInterests));

    // Show the personalized dashboard
    showDashboard();
});

// Show the personalized dashboard and recommendations based on selected interests
function showDashboard() {
    document.getElementById("interestSetup").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    
    // Get the user's interests and username from localStorage
    const userInterests = JSON.parse(localStorage.getItem("interests"));
    const username = localStorage.getItem("username");

    // Display welcome message
    const welcomeMessage = document.createElement("h3");
    welcomeMessage.textContent = `Hello, ${username}! Here are your personalized course recommendations based on your interests.`;
    document.getElementById("dashboard").prepend(welcomeMessage);

    // Filter and display courses based on selected interests
    const recommendationsList = document.getElementById("recommendations-list");
    recommendationsList.innerHTML = ""; // Clear previous recommendations

    const filteredCourses = courseData.filter(course => course.categories.some(category => userInterests.includes(category)));

    filteredCourses.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h3>${course.name}</h3>
            <p>${course.description}</p>
        `;
        recommendationsList.appendChild(card);
    });
}

// Sample course data (you can expand this as needed)
const courseData = [
    { name: "Introduction to Data Science", description: "Learn the basics of data analysis.", categories: ["Data Science", "AI/ML"] },
    { name: "Advanced Web Development", description: "Build full-stack web applications.", categories: ["Web Development"] },
    { name: "Blockchain for Beginners", description: "Get introduced to the world of blockchain technology.", categories: ["Blockchain", "AI/ML"] },
    { name: "Cybersecurity 101", description: "Learn the essentials of cybersecurity.", categories: ["Cybersecurity"] },
    { name: "Mobile App Development", description: "Create mobile applications for Android and iOS.", categories: ["Mobile Development"] }
};
