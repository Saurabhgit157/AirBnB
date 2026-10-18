// Bootstrap 5 Custom Client-Side Form Validation
(() => {
    'use strict';

    // Fetch all forms with class "needs-validation"
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission if invalid
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();
