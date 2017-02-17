"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Deletable = (function () {
    function Deletable() {
    }
    return Deletable;
}());
exports.Deletable = Deletable;
var Sentence = (function (_super) {
    __extends(Sentence, _super);
    function Sentence() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Text = "";
        return _this;
    }
    return Sentence;
}(Deletable));
exports.Sentence = Sentence;
var Answer = (function (_super) {
    __extends(Answer, _super);
    function Answer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Sentence = new Sentence();
        return _this;
    }
    return Answer;
}(Deletable));
exports.Answer = Answer;
var Question = (function (_super) {
    __extends(Question, _super);
    function Question() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Sentence = new Sentence();
        _this.Answers = [new Answer()];
        return _this;
    }
    return Question;
}(Deletable));
exports.Question = Question;
var Section = (function (_super) {
    __extends(Section, _super);
    function Section() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Questions = [new Question()];
        return _this;
    }
    return Section;
}(Deletable));
exports.Section = Section;
var Questionnaire = (function (_super) {
    __extends(Questionnaire, _super);
    function Questionnaire() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Sections = [new Section()];
        return _this;
    }
    return Questionnaire;
}(Deletable));
exports.Questionnaire = Questionnaire;
//# sourceMappingURL=data-model.js.map