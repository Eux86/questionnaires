export class Sentence {
	Id: number;
	Text: string = "";
}
export class Answer {
	Id: number;
	Sentence: Sentence = new Sentence();
    IsCorrect: boolean;
	Selected: boolean;
}
export class Question {
	Id: number;
	Sentence: Sentence = new Sentence();
    Answers: Answer[] = [new Answer()];
}
export class Section {
	Id: number;
	Description: string;
    Questions: Question[] = [new Question()];
	Deleted: Boolean;
}
export class Questionnaire {
	Id: number ;
	Date: Date;
	Description: string;
    Sections: Section[] = [new Section()];
}

