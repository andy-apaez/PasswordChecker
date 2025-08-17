const passwordInput = document.getElementById("password");
const strengthFill = document.getElementById("strength-fill");
const strengthText = document.getElementById("strength-text");
const feedback = document.getElementById("feedback");
const togglePassword = document.getElementById("togglePassword");

// Default suggestions (always visible)
const defaultSuggestions = [
    "Use at least 12 characters.",
    "Mix uppercase and lowercase letters.",
    "Add numbers.",
    "Add special characters (@, $, !, %, etc)"
];

// Initialize feedback with default suggestions
feedback.innerHTML = defaultSuggestions.map(s => "• " + s).join("<br>");

passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    let score = 0;
    let suggestions = [];

    // Length
    if (password.length >= 12) score += 2;
    else if (password.length >= 8) score += 1;
    else suggestions.push("Use at least 12 characters.");

    // Uppercase + lowercase
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    else suggestions.push("Mix uppercase and lowercase letters.");

    // Numbers
    if (/[0-9]/.test(password)) score += 1;
    else suggestions.push("Add numbers.");

    // Special characters
    if (/[@$!%*?&#]/.test(password)) score += 1;
    else suggestions.push("Add special characters (@, $, !, %, etc).");

    // Determine strength and update classes
    strengthFill.classList.remove("weak", "medium", "strong");

    let strength = "";
    let width = (score / 5) * 100;

    if (score >= 5) {
        strength = "Strong 💪";
        strengthFill.classList.add("strong");
    } else if (score >= 3) {
        strength = "Medium 😐";
        strengthFill.classList.add("medium");
    } else {
        strength = "Weak ❌";
        strengthFill.classList.add("weak");
    }

    // Update strength bar and text
    strengthFill.style.width = width + "%";
    strengthText.textContent = `Strength: ${strength}`;

    // Update feedback: show current suggestions or default if strong
    feedback.innerHTML = suggestions.length 
        ? suggestions.map(s => "• " + s).join("<br>") 
        : defaultSuggestions.map(s => "• " + s).join("<br>");
});

// Toggle password visibility
togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    togglePassword.textContent = type === "password" ? "Show Password" : "Hide Password";
});
