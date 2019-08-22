const correctAnswers = ['A', 'B', 'B', 'A', 'A', 'B', 'B', 'A', 'B', 'A'];
const form = document.querySelector('.quiz-form');
const result = document.querySelector('.result');
const timerComponent = document.querySelector('.timer');
var evt = new CustomEvent('submit', { bubbles: true, cancelable: true });
//
console.log(form);

// convert collection to array
console.log(Array.from(form.children));
//test

const formChildren = Array.from(form.children);
let index = 0;
let time = 10;
//  //animating timer
const timer = setInterval(_ => {
  index++;
  time--;
  timerComponent.querySelector('.time-span').textContent = `${time}s`;

  if (time === 0) {
    time = 10;
  }
  if (index % 10 === 0) {
    formChildren[index / 10 - 1].classList.add('d-none');
    if (index / 10 - 1 === formChildren.length - 2) {
      timerComponent.classList.add('d-none');
      !form.dispatchEvent(evt);
      clearInterval(timer);
    }
  }
}, 1000);

//end-test

form.addEventListener('submit', e => {
  e.preventDefault();
  let score = 0;

  const userAnswers = [
    form.q1.value,
    form.q2.value,
    form.q3.value,
    form.q4.value,
    form.q5.value,
    form.q6.value,
    form.q7.value,
    form.q8.value,
    form.q9.value,
    form.q10.value
  ];

  //Check answers
  userAnswers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      score += (1 * 100) / correctAnswers.length;
    }

    //calculated score and scroll to top

    result.classList.remove('d-none');
    form.parentElement.parentElement.classList.add('d-none');
    timerComponent.classList.add('d-none');
    scrollTo(0, 0);

    //animating the score
    let i = 0;
    const timer = setInterval(() => {
      result.querySelector('span').textContent = `${i}%`;
      if (i === score) {
        clearInterval(timer);
      } else {
        i++;
      }
    }, 20);
  });
});
