// main.js
document.addEventListener("DOMContentLoaded", () => {
  // Login Form Handling
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:8000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (response.ok) {
          window.location.href = "dashboard.html";
        } else {
          alert(data.message || "Login failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during login.");
      }
    });
  }

  // Registration Form Handling
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:8000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();

        if (response.ok) {
          window.location.href = "login.html";
        } else {
          alert(data.message || "Registration failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during registration.");
      }
    });
  }

  // Booking Appointment Form
  const appointmentForm = document.getElementById("appointmentForm");
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const patientName = document.getElementById("patientName").value;
      const doctorName = document.getElementById("doctorName").value;
      const appointmentDate = document.getElementById("appointmentDate").value;

      try {
        const response = await fetch(
          "http://localhost:8000/appointments/book",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ patientName, doctorName, appointmentDate }),
          }
        );
        const data = await response.json();

        if (response.ok) {
          alert("Appointment booked successfully");
          fetchAppointments(); // Refresh appointments list
        } else {
          alert(data.message || "Booking failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while booking the appointment.");
      }
    });
  }

  // Fetch and Display Appointments
  async function fetchAppointments() {
    try {
      const response = await fetch("http://localhost:8000/appointments");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const appointments = await response.json();
      console.log("Appointments fetched:", appointments); // Log response data
  
      const appointmentsContainer = document.getElementById("appointmentsContainer");
      appointmentsContainer.innerHTML = "";
  
      appointments.forEach((appointment) => {
        // Log each appointment to check its structure
        console.log("Appointment:", appointment);
  
        // Check if patientId is defined and has a name
        const patientName = appointment.patientId ? appointment.patientId.name : "Unknown";
        const li = document.createElement("li");
        li.textContent = `${patientName} with Dr. ${appointment.doctorName} on  ${new Date(appointment.appointmentDate).toLocaleDateString()}`;
        appointmentsContainer.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("An error occurred while fetching appointments.");
    }
  }
  
  // Initial fetch of appointments on page load
  if (document.getElementById("appointmentsContainer")) {
    fetchAppointments();
  }
});
