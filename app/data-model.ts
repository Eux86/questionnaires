export class Deletable {
	Deleted: Boolean;
}

export class Sentence  extends Deletable {
	Id: number;
	Text: string = "";
}
export class Answer  extends Deletable {
	Id: number;
	Sentence: Sentence = new Sentence();
    IsCorrect: boolean;
	Selected: boolean;
}
export class Question  extends Deletable {
	Id: number;
	Sentence: Sentence = new Sentence();
    Answers: Answer[] = [new Answer()];
}
export class Section  extends Deletable {
	Id: number;
	Description: string;
    Questions: Question[] = [new Question()];
}
export class Questionnaire extends Deletable {
	Id: number ;
	Date: Date;
	Description: string;
    Sections: Section[] = [new Section()];
}


