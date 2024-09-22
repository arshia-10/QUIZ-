var currentQuestionIndex = 0;
var questionCount = 1;

var quizBtn = document.getElementById('create-quiz-btn');
var questionsContainer = document.getElementById('questions-container');
var nextButton = document.getElementById('next-question-btn');
var prevButton = document.getElementById('prev-question-btn');
var submitButton = document.getElementById('submit-quiz-btn');
var quizSummary = document.getElementById('quiz-summary');
var summaryContent = document.getElementById('summary-content');
var validationError = document.getElementById('validation-error');

function showQuestion(index) {
	var questions = document.getElementsByClassName('question');

	for (var i = 0; i < questions.length; i++) {
		if (i == index) {
			questions[i].style.display = 'block';
		} else {
			questions[i].style.display = 'none';
		}
	}

	// Hide "Previous" button on the first question
	if (index == 0) {
		prevButton.style.display = 'none';
	} else {
		prevButton.style.display = 'inline';
	}

	// Show "Submit" button on the last question 
	if (index == questionCount - 1) {
		nextButton.style.display = 'inline';
		submitButton.style.display = 'inline';
	} else {
		nextButton.style.display = 'inline';
		submitButton.style.display = 'inline';
	}
}

function createNewQuestion() {
	questionCount++;

	var newQuestionDiv = document.createElement('div');
	newQuestionDiv.className = 'question';
	newQuestionDiv.style.display = 'none';
	newQuestionDiv.setAttribute('data-question-index', questionCount - 1);

	var questionLabel = document.createElement('label');
	questionLabel.textContent = 'Question ' + questionCount + ':';

	var questionInput = document.createElement('input');
	questionInput.type = 'text';
	questionInput.className = 'question-text';
	questionInput.placeholder = 'Enter your question';

	var optionsDiv = document.createElement('div');
	optionsDiv.className = 'options';

	var optionsLabel = document.createElement('label');
	optionsLabel.textContent = 'Options:';
	optionsDiv.appendChild(optionsLabel);

	for (var i = 1; i <= 4; i++) {
		var optionInput = document.createElement('input');
		optionInput.type = 'text';
		optionInput.className = 'option';
		optionInput.placeholder = 'Option ' + i;
		optionsDiv.appendChild(optionInput);
	}

	newQuestionDiv.appendChild(questionLabel);
	newQuestionDiv.appendChild(questionInput);
	newQuestionDiv.appendChild(optionsDiv);

	questionsContainer.appendChild(newQuestionDiv);
}

function validateForm(clkbtn) {
	var isValid = true;
	validationError.style.display = 'none'; // Hide error initially

	// Check each question
	var questions = document.getElementsByClassName('question');
	for (var i = 0; i < questions.length; i++) {
		var questionText = questions[i].querySelector('.question-text').value;
		var options = questions[i].getElementsByClassName('option');

		if (!questionText.trim()) {
			isValid = false;
			break;
		}

		// Check if all options are filled
		for (var j = 0; j < options.length; j++) {
			if (!options[j].value.trim()) {
				isValid = false;
				break;
			}
		}

		if (!isValid) break;
	}

	if (!isValid) { 
		if(clkbtn == 'nextstep') {
			validationError.innerHTML  = 'Please fill out all the fields before go to next question.';
		}
		validationError.style.display = 'block'; // Show error message
	}

	return isValid;
}

function validateCurrentQuestion() {
        var isValid = true;
        validationError.style.display = 'none'; // Hide error initially

        // Get the current question
        var currentQuestion = document.getElementsByClassName('question')[currentQuestionIndex];
        var questionText = currentQuestion.querySelector('.question-text').value.trim();

        // Validate question text
        if (!questionText) {
            isValid = false;
            validationError.textContent = 'Please fill out the question before going to the next question.';
        }

        if (!isValid) {
            validationError.style.display = 'block'; // Show error message
        }

        return isValid;
    }

nextButton.onclick = function() { 
	if (validateCurrentQuestion()) {
		if (currentQuestionIndex == questionCount - 1) {
			createNewQuestion();
		}
		currentQuestionIndex++;
		showQuestion(currentQuestionIndex);
	}
};

prevButton.onclick = function() {
	validationError.style.display = 'none';
	if (currentQuestionIndex > 0) {
		currentQuestionIndex--;
		showQuestion(currentQuestionIndex);
	}
};

submitButton.onclick = function() {
	
	var allValid = true;
	validationError.style.display = 'none'; // Hide error initially
	
	var quizTitle = document.getElementById('quiz-title-input');
	if(quizTitle.value == '') {
		validationError.innerHTML  = 'Please fill out the Quiz Title.';
		validationError.style.display = 'block';
		return false;
	}

	var questions = document.getElementsByClassName('question');
	for (var i = 0; i < questions.length; i++) {
		var questionText = questions[i].querySelector('.question-text').value.trim();
		if (!questionText) {
			allValid = false;
			break;
		}
	}

	if (!allValid) {
		validationError.textContent = 'Please fill out all questions before submitting.';
		validationError.style.display = 'block'; // Show error message
		return;
	}
	
			
	quizSummary.style.display = 'block';
	summaryContent.innerHTML = ''; // Clear previous content
    document.getElementById('quiz-title').innerHTML =  quizTitle.value;
	// Gather all questions and options
	var questions = document.getElementsByClassName('question');
	for (var i = 0; i < questions.length; i++) {
		var questionText = questions[i].querySelector('.question-text').value;

		var questionSummary = document.createElement('div');
		questionSummary.className = 'question-summary';
		var questionLabel = document.createElement('h3');
		questionLabel.textContent = 'Question ' + (i + 1) + ': ' + questionText;

		questionSummary.appendChild(questionLabel);

		var options = questions[i].getElementsByClassName('option');
		var optionList = document.createElement('ul');
		optionList.className = 'summary-ul';
		for (var j = 0; j < options.length; j++) {
			if(options[j].value != '') {
				var optionItem = document.createElement('li');
				optionItem.textContent = 'Option ' + (j + 1) + ': ' + options[j].value;
				optionList.appendChild(optionItem);
			}	
		}

		questionSummary.appendChild(optionList);
		summaryContent.appendChild(questionSummary);
	}

	// Hide the quiz form after submission
	document.getElementById('quiz-form').style.display = 'none';
		
};

function createQuiz() {
	document.getElementById('quiz-form').style.display = 'block';
	quizBtn.style.display = 'none';
	showQuestion(currentQuestionIndex);
}	
