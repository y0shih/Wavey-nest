import { Controller, Get, Put, Delete, Post, Patch, Body, HttpException, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreatSongDTO } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
    constructor(private SongsService: SongsService) {} // Injecting SongsService, if needed

    @Post()
    create(@Body() CreatSongDTO: CreatSongDTO) {
        return this.SongsService.create(CreatSongDTO); 
    }

    @Get()
    findAll() {
        try {
        return this.SongsService.findAll();
        } catch (e) {
            console.log('error fetching songs', e);
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR, {cause: e},); 
        }
    }
    @Get('search')
    search() {
        return 'search songs';
    }
    @Get('popular')
    popular() {
        return 'fetch popular songs';
    }
    @Get('recent')
    recent() {
        return 'fetch recent songs';
    }
    @Get('top')
    top() {
        return 'fetch top songs';
    }
    @Get(':id')
    findOne(@Param('id', new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND
    })) id: number) {
        return `fetch song by ${id}`;
    }
    @Put(':id')
    update() {
        return 'update song by id';
    }
    @Delete(':id')
    remove() {
        return 'delete song by id';
    }
    @Patch(':id')
    patch() {
        return 'patch song by id';
    }
    @Get('genre/:genre')
    findByGenre() {
        return 'fetch songs by genre';
    }
    @Get('artist/:artist')
    findByArtist() {
        return 'fetch songs by artist';
    }
    @Get('album/:album')
    findByAlbum() {
        return 'fetch songs by album';
    }
}
