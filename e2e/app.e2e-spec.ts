import { QuestionnairesPage } from './app.po';

describe('questionnaires App', () => {
  let page: QuestionnairesPage;

  beforeEach(() => {
    page = new QuestionnairesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
