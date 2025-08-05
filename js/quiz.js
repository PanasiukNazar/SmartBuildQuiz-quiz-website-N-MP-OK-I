    const QUESTIONS = [
        {
            label: 'Насколько хорошо вы знакомы с современными технологиями строительства?',
            answers: [
                'Я только начинаю разбираться',
                'Имею базовое представление',
                'Углублённо изучаю тему',
                'Занимаюсь профессионально',
            ],
        },
        {
            label: 'На каком этапе вы находитесь в изучении устойчивого строительства и энергосбережения?',
            answers: [
                'Начинаю с основ и понятий',
                'Изучаю инновации в строительстве и новые материалы',
                'Участвую в проектировании с применением современных технологий',
                'Исследую передовые методы и внедряю практики устойчивого строительства',
            ],
        },
        {
            label: 'Какой подход вам ближе при изучении технологий строительства?',
            answers: [
                'Пошаговое изучение с акцентом на безопасность и устойчивость',
                'Анализ смелых технических решений и энергосберегающих решений',
                'Сбалансированный подход с акцентом на новые материалы и эффективность',
                'Изучение методов сохранения ресурсов и минимизации воздействия на среду',
            ],
        },
        {
            label: 'Каковы ваши цели в области современного строительства?',
            answers: [
                'Понять принципы устойчивого строительства',
                'Узнать о новых материалах и технологиях строительства',
                'Освоить методы энергосбережения в строительстве',
                'Применить инновации в собственных проектах',
            ],
        },
    ];

const $container = document.getElementById('container');

const startStep = {
    render: () => {
        $container.innerHTML = `
      <div class="container quiz-wrapper">
    <div class="row quiz-content">
        <div class="col-lg-6 col-md-6 col-lg-6">
            <img class="quiz-img" src="img/quiz.jpg">
        </div>
        <div class="col-lg-6 col-md-6 col-lg-6">
            <h2 class="title">Проверьте свои знания в области современных строительных технологий</h2>
            <h3 class="sub-title">Узнайте, насколько вы разбираетесь в инновациях в строительстве</h3>
            <p class="text">
                Готовы проверить свои знания в сфере технологий строительства, новых материалов и устойчивого развития?
                Пройдите наш образовательный тест и углубитесь в тему энергосбережения и инноваций в строительстве.
            </p>
            <button class="btn btn-primary w-100 py-3 first-button" data-action="startQuiz">Начать</button>
        </div>
    </div>
</div>

      `;
    },
    onClick: (el) => {
        if (el.getAttribute('data-action') === 'startQuiz') {
            quiz.nextStep(questionsStep);
        }
    },
};

const questionsStep = {
    questionIndex: 0,
    answers: {},
    render: () => {
        const question = QUESTIONS[questionsStep.questionIndex];

        $container.innerHTML = `
        <div class="container quiz-wrapper">

            <div class="row quiz-content text-center">

              

                <h3>${question.label}</h3>

                <div class="row answers">
                    ${question.answers
                        .map(
                            (answer, index) =>
                                `
                                <button class="answer col-md-12 col-lg-5 border rounded" data-action="selectAnswer" data-answer-index="${index}">
                                    ${answer}
                                </button>
                            `,
                        )
                        .join('')}
                </div>

            </div>
        </div>
      `;
    },
    getProgress: () =>
        Math.floor((questionsStep.questionIndex / QUESTIONS.length) * 100),
    onClick: (el) => {
        switch (el.getAttribute('data-action')) {
            case 'goToNextQuestion':
                return questionsStep.goToNextQuestion();
            case 'goToPreviousQuestion':
                return questionsStep.goToPreviousQuestion();
            case 'selectAnswer':
                return questionsStep.selectAnswer(
                    parseInt(el.getAttribute('data-answer-index'), 10),
                );
        }
    },
    goToPreviousQuestion: () => {
        questionsStep.questionIndex -= 1;
        questionsStep.render();
    },
    selectAnswer: (answerIndex) => {
        const question = QUESTIONS[questionsStep.questionIndex];
        const selectedAnswer = question.answers[answerIndex];

        questionsStep.answers = {
            ...questionsStep.answers,
            [question.label]: selectedAnswer,
        };

        if (questionsStep.isFinalQuestion()) {
            questionsStep.completeStep();
        } else {
            questionsStep.goToNextQuestion();
        }
    },
    isFinalQuestion: () => questionsStep.questionIndex === QUESTIONS.length - 1,
    goToNextQuestion: () => {
        questionsStep.questionIndex += 1;
        questionsStep.render();
    },
    completeStep: () => {
        quiz.setAnswers(questionsStep.answers);
        quiz.nextStep(finalStep);
    },
};

const finalStep = {
    render: () => {
        $container.innerHTML = `
       <div class="container quiz-wrapper">
    <div class="row quiz-content form-content">
        <div class="col-lg-6 col-md-6 col-sm-12 form-block">
            <h2 class="title">Форма обратной связи</h2>
            <h3 class="mb-4">Пожалуйста, заполните форму для обратной связи по теме «Современные строительные технологии и инновации»</h3>
            <form>
                <input class="form-control" name="name" type="name" placeholder="Имя">
                <input class="form-control" name="Surname" type="name" placeholder="Фамилия">
                <input class="form-control" name="email" id="email2" type="email" placeholder="Электронная почта">
                <div id="validation" style="color: red"></div>
                <input class="form-control" name="phone" type="number" id="phone" placeholder="Телефон">
                <div id="checkbox">
                    <input type="checkbox">
                    <label>Я согласен с <a class="form-link" href="terms-of-use.html">условиями использования и политикой конфиденциальности</a></label>
                </div>
                <div id="checkbox">
                    <input type="checkbox" checked disabled>
                    <label>Я согласен на получение информационной рассылки</label>
                </div>

                ${Object.keys(quiz.answers)
                    .map(
                        (question) =>
                            `<input name="${question}" value="${quiz.answers[question]}" hidden>`,
                    )
                    .join('')}

                <button data-action="submitAnswers" class="btn btn-primary w-100 py-2 first-button">Отправить</button>
            </form>
        </div>
    </div>
</div>

      `;
    },
    onClick: (el) => {
        if (el.getAttribute('data-action') === 'submitAnswers') {
            // Get the input value
            const emailInput = document.getElementById('email2').value;

            // Regular expression for basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Test the input against the regular expression
            if (emailRegex.test(emailInput)) {
                document.getElementById('validation').textContent = '';
                window.location.href = 'thanks.html';
                localStorage.setItem('quizDone', true);
                document.getElementById('quiz-page').classList.add('hide');
            } else {
                document.getElementById('validation').textContent =
                    'Invalid e-mail address. Please enter a valid e-mail address.';
            }
        }
    },
};

const quiz = {
    activeStep: startStep,
    answers: {},
    clear: () => ($container.innerHTML = ''),
    init: () => {
        $container.addEventListener('click', (event) =>
            quiz.activeStep.onClick(event.target),
        );
        $container.addEventListener('submit', (event) =>
            event.preventDefault(),
        );
    },
    render: () => {
        quiz.clear();
        quiz.activeStep.render();
    },
    nextStep: (step) => {
        quiz.activeStep = step;
        quiz.render();
    },
    setAnswers: (answers) => (quiz.answers = answers),
};

if (!localStorage.getItem('quizDone')) {
    document.getElementById('main-page').classList.add('hide');
    quiz.init();
    quiz.render();
}
