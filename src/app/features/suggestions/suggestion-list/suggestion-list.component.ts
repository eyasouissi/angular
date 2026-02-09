import { Component } from '@angular/core';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css']  // <- this is correct now
})
export class SuggestionListComponent {
  suggestions = [
    { id: 1, title: 'Ajouter un dark mode' },
    { id: 2, title: 'Optimiser les performances' },
    { id: 3, title: 'Refactorer le code' }
  ];
}
