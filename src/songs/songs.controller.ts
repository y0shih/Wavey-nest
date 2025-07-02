import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Patch,
  Body,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  create(@Body() createSongDTO: CreateSongDTO) {
    return this.songsService.create(createSongDTO);
  }

  @Get()
  findAll() {
    try {
      return this.songsService.findAll();
    } catch (e) {
      console.log('error fetching songs', e);
      throw new HttpException(
        'Server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }

  @Get('search')
  search(@Query('q') query: string) {
    if (!query) {
      throw new HttpException(
        'Query parameter is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    // This would be implemented with a proper search method in the service
    return { message: `Searching for: ${query}`, results: [] };
  }

  @Get('popular')
  popular() {
    // This would be implemented with popularity logic in the service
    return { message: 'Popular songs feature - to be implemented' };
  }

  @Get('recent')
  recent() {
    // This would be implemented with recent logic in the service
    return { message: 'Recent songs feature - to be implemented' };
  }

  @Get('top')
  top() {
    // This would be implemented with top songs logic in the service
    return { message: 'Top songs feature - to be implemented' };
  }

  @Get('genre/:genre')
  findByGenre(@Param('genre') genre: string) {
    return this.songsService.findByGenre(genre);
  }

  @Get('artist/:artist')
  findByArtist(@Param('artist') artist: string) {
    return this.songsService.findByArtist(artist);
  }

  @Get('album/:album')
  findByAlbum(@Param('album') album: string) {
    return this.songsService.findByAlbum(album);
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    id: number,
  ) {
    return this.songsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDTO: CreateSongDTO,
  ) {
    return this.songsService.update(id, updateSongDTO);
  }

  @Patch(':id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDTO: Partial<CreateSongDTO>,
  ) {
    return this.songsService.update(id, updateSongDTO);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.songsService.remove(id);
    return { message: `Song with ID ${id} has been deleted` };
  }
}
