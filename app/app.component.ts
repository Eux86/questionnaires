import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">{{title}}</a>
                </div>
                <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li routerLinkActive="active"><a routerLink="/list" >Questionnaires List</a></li>
                    <li routerLinkActive="active"><a routerLink="/sentences" >Sentences</a></li>
                </ul>
                </div><!--/.nav-collapse -->
            </div>
        </nav>
        <div class="container">

            <router-outlet></router-outlet>

        </div>
       
        
    `,
    styleUrls: ['app.component.css'],
})

export class AppComponent {
    title = 'Questionnaires';
}