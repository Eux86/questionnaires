import { Component } from '@angular/core';
import { MenuItem } from 'primeng/primeng'

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
})

export class AppComponent {
    title = 'Questionnaires';
    private menuItems: MenuItem[];
    private activeItem: MenuItem;

    ngOnInit() {
        this.menuItems = [
            {label: 'List', routerLink:['list']},
            {label: 'Sentences',routerLink:['sentences']},
        ];
        // this.activeItem = this.menuItems[0];
    }
}