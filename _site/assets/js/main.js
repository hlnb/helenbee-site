document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletter-form");
  const messageBox = document.getElementById("newsletter-message");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = form.email.value.trim();
    if (!email) {
      messageBox.textContent = "Please enter a valid email.";
      return;
    }

    messageBox.textContent = "Subscribing...";

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      messageBox.textContent = data.message;
      if (response.ok) {
        form.reset();
      }
    } catch (err) {
      console.error(err);
      messageBox.textContent = "Something went wrong. Please try again.";
    }
  });
});
