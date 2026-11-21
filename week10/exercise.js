"use strict";
const routeType = document.getElementById("atype");
const functionType = document.getElementById("ftype");
function showMatches() {
  const rows = highwayWiki.grades.filter(row => row.types.includes(routeType.value) &&
    (!functionType.value || row.functions.includes(functionType.value)));
  const output = document.getElementById("match");
  const title = document.createElement("strong");
  title.textContent = rows.length ? rows.map(row => row.level).join("、") : "表中未列此組合";
  const note = document.createElement("p");
  note.textContent = rows.length ? "符合所選條件的候選，共 " + rows.length + " 級。個案仍須查工程文件。" : "請回看表 1.4.1，或更換一項條件。";
  output.replaceChildren(title, note);
}
routeType.addEventListener("change",showMatches);
functionType.addEventListener("change",showMatches);
showMatches();
const quiz = document.getElementById("quiz");
highwayWiki.quiz.forEach((question,i) => {
  const field=document.createElement("fieldset");
  const legend=document.createElement("legend");
  legend.textContent=(i+1)+". "+question.q;
  field.append(legend);
  const feedback=document.createElement("p");
  feedback.className="answer";
  feedback.setAttribute("aria-live","polite");
  question.choices.forEach((label,n) => {
    const option=document.createElement("label");
    const input=document.createElement("input");
    input.type="radio"; input.name="question-"+i;
    input.addEventListener("change",() => {
      feedback.textContent=(n===question.correct?"答對了。":"再看一次線索。")+question.why;
    });
    option.append(input,document.createTextNode(" "+label));
    field.append(option);
  });
  field.append(feedback); quiz.append(field);
});