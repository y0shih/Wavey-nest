import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './entities/song.entity';
import { CreateSongDTO } from './dto/create-song-dto';

describe('SongsService', () => {
  let service: SongsService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongsService,
        {
          provide: getRepositoryToken(Song),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SongsService>(SongsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a song', async () => {
      const createSongDTO: CreateSongDTO = {
        title: 'Test Song',
        artist: ['Test Artist'],
        album: 'Test Album',
        genre: 'Rock',
        releaseDate: new Date('2023-01-01'),
        duration: '03:30',
      };

      const savedSong = { id: 1, ...createSongDTO };
      mockRepository.create.mockReturnValue(savedSong);
      mockRepository.save.mockResolvedValue(savedSong);

      const result = await service.create(createSongDTO);

      expect(result).toEqual(savedSong);
      expect(mockRepository.create).toHaveBeenCalledWith(createSongDTO);
      expect(mockRepository.save).toHaveBeenCalledWith(savedSong);
    });
  });

  describe('findAll', () => {
    it('should return all songs', async () => {
      const songs = [{ id: 1, title: 'Test Song' }];
      mockRepository.find.mockResolvedValue(songs);

      const result = await service.findAll();

      expect(result).toEqual(songs);
      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a song by id', async () => {
      const song = { id: 1, title: 'Test Song' };
      mockRepository.findOne.mockResolvedValue(song);

      const result = await service.findOne(1);

      expect(result).toEqual(song);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException for non-existent id', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a song', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);

      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when song not found', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
