import { Injectable, NotFoundException } from '@nestjs/common';
import { Song } from './interfaces/song.interface';
import { CreateSongDTO } from './dto/create-song-dto';

@Injectable()
export class SongsService {
  private readonly songs: Song[] = [];
  private idCounter = 1;

  create(createSongDTO: CreateSongDTO): Song {
    const song: Song = {
      id: this.idCounter++,
      ...createSongDTO,
    };
    this.songs.push(song);
    return song;
  }

  findAll(): Song[] {
    return this.songs;
  }

  findOne(id: number): Song {
    const song = this.songs.find((song) => song.id === id);
    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    return song;
  }

  update(id: number, updateSongDTO: Partial<CreateSongDTO>): Song {
    const songIndex = this.songs.findIndex((song) => song.id === id);
    if (songIndex === -1) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }

    const updatedSong = { ...this.songs[songIndex], ...updateSongDTO };
    this.songs[songIndex] = updatedSong;
    return updatedSong;
  }

  remove(id: number): void {
    const songIndex = this.songs.findIndex((song) => song.id === id);
    if (songIndex === -1) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    this.songs.splice(songIndex, 1);
  }

  findByGenre(genre: string): Song[] {
    return this.songs.filter(
      (song) => song.genre?.toLowerCase() === genre.toLowerCase(),
    );
  }

  findByArtist(artist: string): Song[] {
    return this.songs.filter((song) =>
      song.artist.some((a) => a.toLowerCase().includes(artist.toLowerCase())),
    );
  }

  findByAlbum(album: string): Song[] {
    return this.songs.filter((song) =>
      song.album.toLowerCase().includes(album.toLowerCase()),
    );
  }
}
