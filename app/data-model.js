"use strict";
var Sentence = (function () {
    function Sentence() {
        this.text = "";
    }
    return Sentence;
}());
exports.Sentence = Sentence;
var Answer = (function () {
    function Answer() {
        this.sentence = new Sentence();
    }
    return Answer;
}());
exports.Answer = Answer;
var Question = (function () {
    function Question() {
        this.sentence = new Sentence();
        this.answers = [new Answer()];
    }
    return Question;
}());
exports.Question = Question;
var Section = (function () {
    function Section() {
        this.questions = [new Question()];
    }
    return Section;
}());
exports.Section = Section;
var Questionnaire = (function () {
    function Questionnaire() {
        this.sections = [new Section()];
    }
    return Questionnaire;
}());
exports.Questionnaire = Questionnaire;
//# sourceMappingURL=data-model.js.map