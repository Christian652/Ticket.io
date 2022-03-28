import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './place.entity';
import { PlaceDTO } from './dto/place.dto';
import { PlaceRepository } from './place.repository';
import { GetPlaceFilterDTO } from './dto/getPlaces.filter.dto';

@Injectable()
export class PlaceService {
  private readonly logger = new Logger(PlaceService.name);
  
  constructor(
    @InjectRepository(PlaceRepository)
    private repository: PlaceRepository,
  ) { }

  public async save(
    dto: PlaceDTO,
  ): Promise<Place> {
    try {
      return await this.repository.savePlace(dto);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(parameters: GetPlaceFilterDTO): Promise<Place[]> {
    return await this.repository.getAll(parameters);
  }

  public async getOne(id: number): Promise<Place> {

    const foundPlace = await this.repository.findOne(id);
    if (!foundPlace) {
      this.logger.warn(` Can't Found Place With Id : ${id} `);
      throw new NotFoundException(`Não Existe Lugar Com o Id: ${id}`);
    }
    return foundPlace;
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.repository.disable(id);
    } catch (e) {
      throw new HttpException(e.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}