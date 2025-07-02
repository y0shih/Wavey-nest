import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Song } from './entities/song.entity';
import { CreateSongDTO } from './dto/create-song-dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}

  async create(createSongDTO: CreateSongDTO): Promise<Song> {
    const song = this.songsRepository.create(createSongDTO);
    return await this.songsRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return await this.songsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songsRepository.findOne({ where: { id } });
    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    return song;
  }

  async update(id: number, updateSongDTO: Partial<CreateSongDTO>): Promise<Song> {
    const song = await this.findOne(id); // This will throw if not found
    Object.assign(song, updateSongDTO);
    return await this.songsRepository.save(song);
  }

  async remove(id: number): Promise<void> {
    const result = await this.songsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
  }

  async findByGenre(genre: string): Promise<Song[]> {
    return await this.songsRepository.find({
      where: { genre: ILike(`%${genre}%`) },
      order: { createdAt: 'DESC' },
    });
  }

  async findByArtist(artist: string): Promise<Song[]> {
    return await this.songsRepository
      .createQueryBuilder('song')
      .where(':artist = ANY(song.artist)', { artist })
      .orWhere('array_to_string(song.artist, \',\') ILIKE :artistPattern', {
        artistPattern: `%${artist}%`,
      })
      .orderBy('song.createdAt', 'DESC')
      .getMany();
  }

  async findByAlbum(album: string): Promise<Song[]> {
    return await this.songsRepository.find({
      where: { album: ILike(`%${album}%`) },
      order: { createdAt: 'DESC' },
    });
  }
}
