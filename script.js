document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('medicalForm');

    form.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Clear previous error messages
        document.getElementById('nameError').textContent = '';
        document.getElementById('ageError').textContent = '';
        document.getElementById('symptomsError').textContent = '';

        // Get the values from the form
        const name = document.getElementById('name').value.trim();
        const age = document.getElementById('age').value.trim();
        const symptoms = document.getElementById('symptoms').value.trim();

        let isValid = true;

        // Validate name
        if (!name) {
            document.getElementById('nameError').textContent = 'Name is required.';
            isValid = false;
        }

        // Validate age
        if (!age || age <= 0) {
            document.getElementById('ageError').textContent = 'Please enter a valid age.';
            isValid = false;
        }

        // Validate symptoms
        if (!symptoms) {
            document.getElementById('symptomsError').textContent = 'Symptoms are required.';
            isValid = false;
        }

        // If all validations pass, submit the form
        if (isValid) {
            // Proceed with form submission (e.g., send to server)
            alert('Form submitted successfully!');

            // Here, you can also perform AJAX to submit the data without reloading the page
            // Example: 
            // fetch('/submit', {
            //     method: 'POST',
            //     body: JSON.stringify({ name, age, symptoms }),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // });
        }
    });
});

// Doctor data with unique IDs and detailed information
const doctors = [
    { id: 1, name: "Dr. Smith", specialty: "Cardiologist", image: "doc1.jpg", details: "Experienced cardiologist specializing in heart-related conditions with 15 years of experience." },
    { id: 2, name: "Dr. Johnson", specialty: "Dermatologist", image: "doc3.jpg", details: "Renowned dermatologist, expert in treating skin diseases with over 10 years of experience." },
    { id: 3, name: "Dr. Patel", specialty: "Endocrinologist", image: "doc4.jpg", details: "Endocrinologist focusing on hormone-related issues and diabetes with 12 years in practice." },
    { id: 4, name: "Dr. Lee", specialty: "Pediatrician", image: "doc6.jpg", minAge: 0, maxAge: 17, details: "Pediatrician specializing in child health and wellness with 8 years of experience." },
    { id: 5, name: "Dr. Brown", specialty: "Psychiatrist", image: "doc7.jpg", details: "Psychiatrist specializing in mental health, anxiety, and depression with a 20-year career." },
    { id: 6, name: "Dr. Garcia", specialty: "Orthopedic Surgeon", image: "doc2.jpg", details: "Orthopedic surgeon focused on musculoskeletal issues with 18 years of surgical experience." },
    { id: 7, name: "Dr. Taylor", specialty: "Healthcare Expert", image: "doc5.jpg", details: "Expert in general healthcare, managing fever, malaria, jaundice, and other common ailments." }
];
function findDoctor() {
    const symptoms = document.getElementById("symptoms").value.toLowerCase();
    const age = parseInt(document.getElementById("age").value);
    const doctorSection = document.getElementById("doctor-details");

    let doctor;
    if (symptoms.includes("heart") || symptoms.includes("chest pain")) {
        doctor = doctors.find(doc => doc.specialty === "Cardiologist");
    } else if (symptoms.includes("skin") || symptoms.includes("rash")) {
        doctor = doctors.find(doc => doc.specialty === "Dermatologist");
    } else if (symptoms.includes("diabetes") || symptoms.includes("thyroid")) {
        doctor = doctors.find(doc => doc.specialty === "Endocrinologist");
    } else if ((symptoms.includes("fever") || symptoms.includes("child")) && age >= 0 && age <= 17) {
        doctor = doctors.find(doc => doc.specialty === "Pediatrician");
    } else if (symptoms.includes("mental") || symptoms.includes("anxiety")) {
        doctor = doctors.find(doc => doc.specialty === "Psychiatrist");
    } else if (symptoms.includes("fever") || symptoms.includes("malaria") || symptoms.includes("jaundice")) {
        doctor = doctors.find(doc => doc.specialty === "Healthcare Expert");
    } else {
        doctor = doctors[Math.floor(Math.random() * doctors.length)];
    }

    if (doctor) {
        doctorSection.innerHTML = `
            <div class="doctor-card" onclick="displayDoctorDetails(${doctor.id})">
                <img src="${doctor.image}" alt="${doctor.name}">
                <h3>${doctor.name}</h3>
                <p>Specialty: ${doctor.specialty}</p>
            </div>
        `;
    }
}
function displayDoctorDetails(id){}
    const doctor = doctors.find(doc => doc.id === id);
    if (doctor){}
        const doctorInfo = document.getElementById("doctor-info");
        doctorInfo.innerHTML = `
            <h2>${doctor.name}</h2>
            <p><strong>Specialty:</strong> ${doctor.specialty}</p>
            <img src="${doctor.image}" alt="${doctor.name}">
            <p>${doctor.details}</p>
        `;
        document.getElementById("doctorModal").style
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
    
        function showSlide(index) {
          slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
          });
        }
    
        function nextSlide() {
          currentSlide = (currentSlide + 1) % slides.length;
          showSlide(currentSlide);
        }
    
        function prevSlide() {
          currentSlide = (currentSlide - 1 + slides.length) % slides.length;
          showSlide(currentSlide);
        }
    
        // Auto-slide every 5 seconds
        setInterval(nextSlide, 2000);
        function toggleDropdown(event, element) {
            event.stopPropagation(); // Prevents the click from propagating to the document
            closeAllDropdowns(); // Close other open dropdowns first
            element.parentNode.classList.toggle('active');
        }
    
        function closeAllDropdowns() {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    
        // Close dropdowns when clicking outside
        document.addEventListener('click', function() {
            closeAllDropdowns();
        });