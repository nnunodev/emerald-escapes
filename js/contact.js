/* Contact Page - Enquiry Form Validation */

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {

    // Form elements
    const formMessage = document.getElementById("formMessage");
    const enquirySuccess = document.getElementById("enquirySuccess");
    const enquiryHeading = document.getElementById("enquiryHeading");
    const confirmationHeading = document.getElementById("confirmationHeading");
    const newEnquiryBtn = document.getElementById("newEnquiryBtn");

    // Input fields
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const queryTypeInput = document.getElementById("queryType");
    const messageInput = document.getElementById("message");
    const fields = [nameInput, emailInput, phoneInput, queryTypeInput, messageInput];

    // Keep screen-reader error states in sync with the visible validation feedback.
    function updateValidationState() {
        fields.forEach(function (input) {
            input.setAttribute("aria-invalid", String(!input.validity.valid));
        });
    }


    /* Validate Form Fields */

    function validateFields() {

        // Name cannot be empty or contain only spaces
        nameInput.setCustomValidity(
            nameInput.value.trim()
                ? ""
                : "Please enter your name"
        );

        // Email must contain a domain extension
        const emailPattern = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

        emailInput.setCustomValidity(
            emailInput.value && !emailPattern.test(emailInput.value)
                ? "Please enter a valid email address"
                : ""
        );

        // Reject blank or whitespace-only phone numbers as well as invalid formats.
        const phone = phoneInput.value.trim();
        const digits = phone.replace(/\D/g, "");

        const validPhone =
            /^\+?[\d\s()-]+$/.test(phone) &&
            digits.length >= 7 &&
            digits.length <= 15;

        phoneInput.setCustomValidity(
            validPhone
                ? ""
                : "Please enter a valid phone number"
        );

        // Message must contain at least 20 characters
        messageInput.setCustomValidity(
            messageInput.value.trim().length >= 20
                ? ""
                : "Message must contain at least 20 characters"
        );

        if (enquiryForm.classList.contains("was-validated")) {
            updateValidationState();
        }
    }


    /* Validate Fields While Typing */

    [nameInput, emailInput, phoneInput, messageInput]
        .forEach(function (input) {

            input.addEventListener("input", validateFields);
        });

    queryTypeInput.addEventListener("change", validateFields);


    /* Form Submission */

    enquiryForm.addEventListener("submit", function (event) {

        // Prevent normal form submission
        event.preventDefault();

        // Run custom validation
        validateFields();

        // Show Bootstrap validation feedback
        enquiryForm.classList.add("was-validated");
        updateValidationState();

        // Stop if any field is invalid
        if (!enquiryForm.checkValidity()) {

            formMessage.className = "alert alert-danger mt-3";
            formMessage.textContent =
                "Please correct the highlighted fields.";

            enquiryForm.querySelector(":invalid").focus();
            return;
        }

        // Valid form - hide form and heading
        enquiryForm.classList.add("d-none");
        enquiryHeading.classList.add("d-none");

        // Display success confirmation
        enquirySuccess.classList.remove("d-none");

        // Reset the form
        enquiryForm.reset();
        enquiryForm.classList.remove("was-validated");

        // Clear custom validation errors
        fields.forEach(function (input) {
            input.setCustomValidity("");
            input.removeAttribute("aria-invalid");
        });

        // Clear previous error messages
        formMessage.textContent = "";
        formMessage.className = "d-none";

        // Keep keyboard navigation with the newly displayed confirmation.
        confirmationHeading.focus();
    });


    /* Send Another Enquiry */

    newEnquiryBtn.addEventListener("click", function () {

        // Hide the success confirmation
        enquirySuccess.classList.add("d-none");

        // Show the form again
        enquiryForm.classList.remove("d-none");
        enquiryHeading.classList.remove("d-none");

        // Focus on the name field
        nameInput.focus();
    });
}
