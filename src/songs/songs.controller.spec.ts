import { Test, TestingModule } from '@nestjs/testing';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

describe('SongsController', () => {
  let controller: SongsController;

  const mockSongsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findByGenre: jest.fn(),
    findByArtist: jest.fn(),
    findByAlbum: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongsController],
      providers: [
        {
          provide: SongsService,
          useValue: mockSongsService,
        },
      ],
    }).compile();

    controller = module.get<SongsController>(SongsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.findAll', async () => {
    const mockSongs = [{ id: 1, title: 'Test Song' }];
    mockSongsService.findAll.mockResolvedValue(mockSongs);

    const result = await controller.findAll();

    expect(mockSongsService.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockSongs);
  });
});
