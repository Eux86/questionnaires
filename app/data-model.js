"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Deletable = (function () {
    function Deletable() {
    }
    return Deletable;
}());
exports.Deletable = Deletable;
var Sentence = (function (_super) {
    __extends(Sentence, _super);
    function Sentence() {
        var _this = _super.apply(this, arguments) || this;
        _this.Text = "";
        return _this;
    }
    return Sentence;
}(Deletable));
exports.Sentence = Sentence;
var Answer = (function (_super) {
    __extends(Answer, _super);
    function Answer() {
        return _super.apply(this, arguments) || this;
    }
    return Answer;
}(Deletable));
exports.Answer = Answer;
var Question = (function (_super) {
    __extends(Question, _super);
    function Question() {
        return _super.apply(this, arguments) || this;
    }
    return Question;
}(Deletable));
exports.Question = Question;
var Section = (function (_super) {
    __extends(Section, _super);
    function Section() {
        return _super.apply(this, arguments) || this;
    }
    return Section;
}(Deletable));
exports.Section = Section;
var Questionnaire = (function (_super) {
    __extends(Questionnaire, _super);
    function Questionnaire() {
        var _this = _super.apply(this, arguments) || this;
        _this.Sections = [new Section()];
        return _this;
    }
    return Questionnaire;
}(Deletable));
exports.Questionnaire = Questionnaire;
//# sourceMappingURL=data-model.js.map