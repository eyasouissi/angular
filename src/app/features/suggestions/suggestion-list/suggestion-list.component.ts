import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css']
})
export class SuggestionListComponent implements OnInit {

  suggestions: Suggestion[] = [];

  constructor(private service: SuggestionService) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  private loadSuggestions(): void {
    this.service.getSuggestionsList().subscribe(data => this.suggestions = data);
  }

  deleteSuggestion(id: number): void {
    if (confirm('Supprimer cette suggestion ?')) {
      this.service.deleteSuggestion(id).subscribe(() => {
        this.suggestions = this.suggestions.filter(s => s.id !== id);
      });
    }
  }

like(s: Suggestion): void {
  const newLikes = (s.nbLikes || 0) + 1;
  this.service.updateLikes(s.id, newLikes).subscribe(updated => {
    s.nbLikes = updated.nbLikes; // met à jour la liste
    // le détails sera mis à jour automatiquement grâce à likes$
  });

}
}