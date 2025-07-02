import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';

describe('SongsService', () => {
  let service: SongsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongsService],
    }).compile();

    service = module.get<SongsService>(SongsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a song', () => {
      const createSongDTO: CreateSongDTO = {
        title: 'Test Song',
        artist: ['Test Artist'],
        album: 'Test Album',
        genre: 'Rock',
        releaseDate: new Date('2023-01-01'),
        duration: '03:30',
      };

      const result = service.create(createSongDTO);

      expect(result).toHaveProperty('id', 1);
      expect(result.title).toBe('Test Song');
      expect(result.artist).toEqual(['Test Artist']);
    });
  });

  describe('findAll', () => {
    it('should return all songs', () => {
      const result = service.findAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return a song by id', () => {
      const createSongDTO: CreateSongDTO = {
        title: 'Test Song',
        artist: ['Test Artist'],
        album: 'Test Album',
        releaseDate: new Date('2023-01-01'),
        duration: '03:30',
      };

      const createdSong = service.create(createSongDTO);
      const foundSong = service.findOne(createdSong.id);

      expect(foundSong).toEqual(createdSong);
    });

    it('should throw NotFoundException for non-existent id', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a song', () => {
      const createSongDTO: CreateSongDTO = {
        title: 'Test Song',
        artist: ['Test Artist'],
        album: 'Test Album',
        releaseDate: new Date('2023-01-01'),
        duration: '03:30',
      };

      const createdSong = service.create(createSongDTO);
      service.remove(createdSong.id);

      expect(() => service.findOne(createdSong.id)).toThrow(NotFoundException);
    });
  });
});
