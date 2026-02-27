import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit, OnDestroy {

  suggestion: Suggestion | null = null;
  id!: number;
  private likesSub!: Subscription;  // ← pour se désabonner proprement

  constructor(
    private service: SuggestionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // Récupère la suggestion au chargement
    this.service.getSuggestionById(this.id).subscribe({
      next: (data) => {
        this.suggestion = data;
      },
      error: (err) => {
        console.error('Erreur récupération suggestion:', err);
      }
    });

    // ← S'abonner aux likes en temps réel
    this.likesSub = this.service.likes$.subscribe(likeUpdate => {
      if (likeUpdate && this.suggestion && likeUpdate.id === this.suggestion.id) {
        this.suggestion.nbLikes = likeUpdate.nbLikes;
      }
    });
  }

  delete(): void {
    if (confirm('Supprimer cette suggestion ?')) {
      this.service.deleteSuggestion(this.id).subscribe(() => {
        this.router.navigate(['/suggestions']);
      });
    }
  }

  back(): void {
    this.router.navigate(['/suggestions']);
  }

  ngOnDestroy(): void {
    // ← éviter les fuites mémoire
    if (this.likesSub) {
      this.likesSub.unsubscribe();
    }
  }
}