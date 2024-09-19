
document.getElementById('create-quiz-btn').addEventListener('click', function() {
    document.querySelector('.container h1').style.display = 'none'; 
    document.getElementById('create-quiz-btn').style.display = 'none'; 
    document.querySelector('.welcome-container h1' ).style.display = 'none'; 
    document.getElementById('quiz-form').classList.remove('hidden');
    document.getElementById('form-buttons').classList.remove('hidden');

    
});


const addQuestionButton = document.getElementById('add-question-btn');
let questionCount = 1;

addQuestionButton.addEventListener('click', function() {
    questionCount++;

    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question');

    questionContainer.innerHTML = `
        <label>Question ${questionCount}:</label>
        <input type="text" class="question-text" placeholder="Enter your question">
        <div class="options">
            <label>Options:</label>
            <input type="text" class="option" placeholder="Option 1">
            <input type="text" class="option" placeholder="Option 2">
            <input type="text" class="option" placeholder="Option 3">
            <input type="text" class="option" placeholder="Option 4">
        </div>
    `;

    document.getElementById('questions-container').appendChild(questionContainer);
});


document.getElementById('submit-quiz-btn').addEventListener('click', function() {
    const quizTitle = document.getElementById('quiz-title').value;
    const questions = document.querySelectorAll('.question');
    let quizData = {
        title: quizTitle,
        questions: []
    };

    
    questions.forEach((questionElement, index) => {
        const questionText = questionElement.querySelector('.question-text').value;
        const options = questionElement.querySelectorAll('.option');
        let optionsArray = [];

        options.forEach(option => {
            optionsArray.push(option.value);
        });

        quizData.questions.push({
            question: questionText,
            options: optionsArray
        });
    });

    
    console.log(quizData);
    alert('Quiz created successfully! Check the console for data.');
});

