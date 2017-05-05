"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeneralTable {
}
exports.GeneralTable = GeneralTable;
class Sentence extends GeneralTable {
    constructor() {
        super(...arguments);
        this.Text = "";
    }
}
exports.Sentence = Sentence;
class Answer extends GeneralTable {
    constructor() {
        super(...arguments);
        this.IsCorrect = false;
    }
}
exports.Answer = Answer;
class Question extends GeneralTable {
    constructor() {
        super(...arguments);
        // front end only
        this.IsCorrect = false;
    }
}
exports.Question = Question;
class Section extends GeneralTable {
}
exports.Section = Section;
class Questionnaire extends GeneralTable {
    constructor() {
        super(...arguments);
        this.Sections = [new Section()];
    }
}
exports.Questionnaire = Questionnaire;
class FileModel extends GeneralTable {
}
exports.FileModel = FileModel;
//# sourceMappingURL=data-model.js.map