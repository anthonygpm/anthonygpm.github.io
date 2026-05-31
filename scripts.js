const form = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");

if (form) {
	const nameField = form.querySelector("#nome");
	const emailField = form.querySelector("#email");
	const messageField = form.querySelector("#mensagem");
	const fields = [nameField, emailField, messageField].filter(Boolean);

	const clearFieldState = (field) => {
		field.style.borderColor = "";
		field.style.boxShadow = "";
	};

	const setFieldError = (field) => {
		field.style.borderColor = "#e25555";
		field.style.boxShadow = "0 0 0 2px rgba(226, 85, 85, 0.35)";
	};

	const showFeedback = (type, message) => {
		if (!feedback) {
			return;
		}

		feedback.hidden = false;
		feedback.textContent = message;
		feedback.setAttribute("role", type === "error" ? "alert" : "status");

		if (type === "error") {
			feedback.style.backgroundColor = "#3a1d1d";
			feedback.style.borderColor = "#e25555";
			feedback.style.color = "#fbeaea";
		} else {
			feedback.style.backgroundColor = "#0f2b1f";
			feedback.style.borderColor = "#02d07e";
			feedback.style.color = "#d5ffee";
		}
	};

	const hideFeedback = () => {
		if (!feedback) {
			return;
		}

		feedback.hidden = true;
		feedback.textContent = "";
	};

	let isAutoReset = false;

	form.addEventListener("submit", (event) => {
		event.preventDefault();

		const nameValid = nameField.value.trim().length >= 3;
		const emailValid = emailField.validity.valid;
		const messageValid = messageField.value.trim().length >= 10;
		const formValid = nameValid && emailValid && messageValid;

		fields.forEach(clearFieldState);

		if (!nameValid) {
			setFieldError(nameField);
		}
		if (!emailValid) {
			setFieldError(emailField);
		}
		if (!messageValid) {
			setFieldError(messageField);
		}

		if (!formValid) {
			showFeedback("error", "Revise os campos obrigatorios para continuar.");
			form.reportValidity();
			return;
		}

		showFeedback("success", "Mensagem enviada com sucesso! Obrigado pelo contato.");
		isAutoReset = true;
		form.reset();
		fields.forEach(clearFieldState);
	});

	form.addEventListener("reset", () => {
		if (isAutoReset) {
			isAutoReset = false;
			return;
		}

		hideFeedback();
		fields.forEach(clearFieldState);
	});

	fields.forEach((field) => {
		field.addEventListener("input", () => {
			if (field.validity.valid) {
				clearFieldState(field);
			}
			if (feedback && !feedback.hidden) {
				hideFeedback();
			}
		});
	});
}