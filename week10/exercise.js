"use strict";
const routeType = document.getElementById("atype");
const functionType = document.getElementById("ftype");
function showMatches() {
  const road = routeType.value;
  const purpose = functionType.value;
  const excluded = road === "國道" && purpose && !highwayWiki.nationalFunctions.includes(purpose);
  const rows = excluded ? [] : highwayWiki.grades.filter(row => row.types.includes(road) &&
    (!purpose || row.functions.includes(purpose)));
  const output = document.getElementById("match");
  const title = document.createElement("strong");
  title.textContent = rows.length ? rows.map(row => row.level).join("、") : "表中未列此組合";
  const note = document.createElement("p");
  note.textContent = rows.length ? "符合所選條件的候選，共 " + rows.length + " 級。個案仍須查工程文件。" : "請回看表 1.4.1，或更換一項條件。";
  if (excluded) {
    title.textContent = "不符合國道的法定定義";
    note.textContent = "《公路法》第 2 條限定國道為高速公路或快速公路。三級路的功能欄另列主要公路，不能把這個功能配給國道。";
  }
  output.replaceChildren(title, note);
}
routeType.addEventListener("change",showMatches);
functionType.addEventListener("change",showMatches);
showMatches();
const quizSections = ["quiz","quizRoad"].map(id => document.getElementById(id));
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
  field.append(feedback); quizSections[i < 3 ? 0 : 1].append(field);
});