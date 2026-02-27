import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Suggestion } from '../../models/suggestion';

@Injectable({ providedIn: 'root' })
export class SuggestionService {

  suggestionUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) {}
    // ← observable pour suivre les changements de likes
  private likesSubject = new BehaviorSubject<{id: number, nbLikes: number} | null>(null);
  likes$ = this.likesSubject.asObservable();


  // GET liste → le backend retourne directement un tableau
  getSuggestionsList(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.suggestionUrl);
  }

  // GET par id → le backend retourne { success: true, suggestion: {...} }
  getSuggestionById(id: number): Observable<Suggestion> {
    return this.http.get<any>(`${this.suggestionUrl}/${id}`).pipe(
      map(res => res.suggestion ?? res)  // ← extrait suggestion si enveloppé
    );
  }

  // POST
  addSuggestion(s: Suggestion): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.suggestionUrl, s);
  }

  // PUT → aussi enveloppé probablement
  updateSuggestion(s: Suggestion): Observable<Suggestion> {
    return this.http.put<any>(`${this.suggestionUrl}/${s.id}`, s).pipe(
      map(res => res.suggestion ?? res)
    );
  }

  // DELETE
  deleteSuggestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.suggestionUrl}/${id}`);
  }



  updateLikes(id: number, nbLikes: number): Observable<Suggestion> {
    return this.http.patch<Suggestion>(`${this.suggestionUrl}/${id}`, { nbLikes }).pipe(
      tap(() => this.likesSubject.next({ id, nbLikes })) // ← notifie tous les abonnés
    );
  }
  
}