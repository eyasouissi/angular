import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {

  suggestionForm!: FormGroup;
  id!: number;
  isEditMode = false;
  currentNbLikes = 0;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: SuggestionService
  ) {}

  ngOnInit(): void {

    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      category: ['', Validators.required],
      date: [{ value: new Date(), disabled: true }],
      status: [{ value: 'En attente', disabled: true }]
    });

    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = Number(paramId);

    if (this.id) {
      this.isEditMode = true;

      this.service.getSuggestionById(this.id).subscribe(data => {

        this.currentNbLikes = data.nbLikes || 0;

        this.suggestionForm.patchValue({
          title: data.title,
          description: data.description,
          category: data.category,
          date: data.date,
          status: data.status
        });
      });
    }
  }

  onSubmit(): void {

    if (this.suggestionForm.invalid) return;

    const formValue = {
      ...this.suggestionForm.getRawValue(),
      nbLikes: this.currentNbLikes
    };

    if (this.isEditMode) {
      this.service.updateSuggestion({ ...formValue, id: this.id })
        .subscribe(() => this.router.navigate(['/suggestions']));
    } else {
      this.service.addSuggestion({ ...formValue, nbLikes: 0 })
        .subscribe(() => this.router.navigate(['/suggestions']));
    }
  }
}