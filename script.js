(() => {
    
    const quiz = document.getElementById('quiz');

    const questionEl = document.getElementById('question');

    const answers = document.querySelectorAll('.answer');

    const a_text = document.getElementById('a_text');
    const b_text = document.getElementById('b_text');
    const c_text = document.getElementById('c_text');
    const d_text = document.getElementById('d_text');

    const submitBtn = document.getElementById('submitBtn');

    let score = 0;
    let currentQuiz = 0;

    let correctAns;
    
    function getRandomPos(arr){
        let randNum = Math.random() * arr.length | 0;
        return arr[randNum];
    }

    function deselectRadios(){
        answers.forEach(answer => {
            answer.checked = false;                                           
        })
    }

    async function loadQuiz() {
        
        deselectRadios();

        let response = await fetch('http://jservice.io/api/random?count=1');
        let jsonArr = await response.json();
        let quizData = jsonArr[0];
        questionEl.textContent = quizData.question;

        let categoryId = quizData.category.id;
        let response2 = await fetch(`http://jservice.io/api/category?id=${categoryId}`);
        let jsonArr2 = await response2.json();

        let clues = [];
        for(let i = 0; i <= 3; i++) {            
            let clue = jsonArr2.clues[i];
            clues.push(clue.answer);
        }

        correctAns = quizData.answer;
        let randPos = getRandomPos(['a_text','b_text','c_text','d_text']);

        a_text.textContent = clues[0];
        b_text.textContent = clues[1];
        c_text.textContent = clues[2];
        d_text.textContent = clues[3];

        switch(randPos){
            case 'a_text': a_text.textContent = correctAns; break;
            case 'b_text': b_text.textContent = correctAns; break;
            case 'c_text': c_text.textContent = correctAns; break;
            case 'd_text': d_text.textContent = correctAns; break;
        }

    }


    function getSelected() {
                
        let answer = undefined;

        answers.forEach(answerEl => {
            if(answerEl.checked){
                answer = answerEl.nextElementSibling.textContent;
            }
        })
        return answer;
    }
  
    submitBtn.addEventListener("click", () => {
        
        const answer = getSelected();
        
        if(answer){        
            if(answer === correctAns){
                console.log("your answer: " + answer + " correct answer: " + correctAns);
                score++;    
            } else {
                console.log("your answer: " + answer + " correct answer: " + correctAns);
            }

            currentQuiz++;

            if(currentQuiz < 5) {   
                loadQuiz();
            } else {
                quiz.innerHTML = `<h2>${score} von 5 möglichen Punkten</h2><button onclick="location.reload()">Nochmal</button>`;
            }
        }
    })

    document.addEventListener('DOMContentLoaded', loadQuiz);

})();