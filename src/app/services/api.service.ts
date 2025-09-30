import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private token = (window as any).__env?.RAWG_TOKEN;

  async searchGame(gameID: number): Promise<GameInfo> {
    const url = `https://api.rawg.io/api/games/${gameID}?key=${this.token}`

    const response = await fetch(url);
    const data = await response.json();

    return data ?? {};
  }
}

export interface GameInfo {
  id: number,
  name: string,
  metacritic: number,
  released: string,
  background_image: string,
  background_image_additional: string,
  rating: number, // decimal
  rating_top: number,
  playtime: number, // avg number of hours to end the game
  reddit_url: string,
  metacritic_url: string,
  developers: Developer[],
  genres: Genre[],
  publishers: Publisher[],
  parent_achievements_count: number,
}

export interface Developer {
  id: number,
  name: string,
}

export interface Genre {
  id: number,
  name: string,
}

export interface Publisher {
  id: number,
  name: string,
}
