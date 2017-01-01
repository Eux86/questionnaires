export class Sentence {
	id: number;
	text: string = "";
}
export class Answer {
	id: number;
	sentence: Sentence = new Sentence();
    isCorrect: boolean;
	selected: boolean;
}
export class Question {
	id: number;
	sentence: Sentence = new Sentence();
    answers: Answer[] = [new Answer()];
}
export class Section {
	id: number;
	description: string;
    questions: Question[] = [new Question()];
}
export class Questionnaire {
	id: number ;
	description: string;
    sections: Section[] = [new Section()];
}


