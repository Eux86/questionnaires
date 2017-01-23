"use strict";
var Sentence = (function () {
    function Sentence() {
        this.Text = "";
    }
    return Sentence;
}());
exports.Sentence = Sentence;
var Answer = (function () {
    function Answer() {
        this.Sentence = new Sentence();
    }
    return Answer;
}());
exports.Answer = Answer;
var Question = (function () {
    function Question() {
        this.Sentence = new Sentence();
        this.Answers = [new Answer()];
    }
    return Question;
}());
exports.Question = Question;
var Section = (function () {
    function Section() {
        this.Questions = [new Question()];
    }
    return Section;
}());
exports.Section = Section;
var Questionnaire = (function () {
    function Questionnaire() {
        this.Sections = [new Section()];
    }
    return Questionnaire;
}());
exports.Questionnaire = Questionnaire;
//# sourceMappingURL=data-model.js.map