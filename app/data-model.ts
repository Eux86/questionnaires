export class GeneralTable {
	Deleted: Boolean;
	CreateDate: Date;
}

export class Sentence  extends GeneralTable {
	Id: number;
	Text: string = "";
}
export class Answer  extends GeneralTable {
	Id: number;
	Sentence: Sentence;
    IsCorrect: boolean;
	Selected: boolean;
}
export class Question  extends GeneralTable {
	Id: number;
	Sentence: Sentence;
    Answers: Answer[];
}
export class Section  extends GeneralTable {
	Id: number;
	Description: string;
    Questions: Question[];
}
export class Questionnaire extends GeneralTable {
	Id: number ;
	Date: Date;
	Description: string;
    Sections: Section[] = [new Section()];
}


