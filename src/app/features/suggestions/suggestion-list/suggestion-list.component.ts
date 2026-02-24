import { Component } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css']
})
export class SuggestionListComponent {
  suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Ajouter un dark mode',
      description: 'Permettre aux utilisateurs de basculer en mode sombre pour réduire la fatigue oculaire.',
      category: 'Interface',
      date: new Date('2024-01-10'),
      status: 'En attente',
      nbLikes: 14
    },
    {
      id: 2,
      title: 'Optimiser les performances',
      description: 'Réduire le temps de chargement des pages en optimisant les requêtes et les assets.',
      category: 'Technique',
      date: new Date('2024-01-15'),
      status: 'En cours',
      nbLikes: 9
    },
    {
      id: 3,
      title: 'Refactorer le code',
      description: 'Améliorer la lisibilité et la maintenabilité du code source existant.',
      category: 'Technique',
      date: new Date('2024-01-20'),
      status: 'Réalisé',
      nbLikes: 5
    }
  ];
}