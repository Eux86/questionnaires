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
    IsCorrect: boolean = false;
	Selected: boolean;
}
export class Question  extends GeneralTable {
	Id: number;
	Sentence: Sentence;
    Answers: Answer[];
	FileId: number;

	// front end only
	IsCorrect: boolean = false;
}
export class Section  extends GeneralTable {
	Id: number;
	Description: string;
    Questions: Question[];

	// front end only
	Score: number;
}
export class Questionnaire extends GeneralTable {
	Id: number ;
	Date: Date;
	Description: string;
    Sections: Section[] = [new Section()];

	// front end only
	Score: number;
}
export class FileModel extends GeneralTable {
	Id: number;
	Name: string;
	Path: string;
}
export class Language extends GeneralTable {
	Id: number;
	Name: string;
	Active: boolean;
}
export class Translation{
	public Id:string;
	public Key:string;
	public Value:string;
	public LatestUpdate:Date;

	constructor(key:string, value:string){
		this.Key = key;
		this.Value = value;
	}
}

