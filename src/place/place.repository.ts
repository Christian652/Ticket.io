import { Repository, EntityRepository } from 'typeorm';
import { Place } from './place.entity';
import { PlaceDTO } from './dto/place.dto';
import { GetPlaceFilterDTO } from './dto/getPlaces.filter.dto';

@EntityRepository(Place)
export class PlaceRepository extends Repository<Place> {

  public async savePlace(
    dto: PlaceDTO,
  ): Promise<Place> {
    const {
      id, title, city, cep, street, status
    } = dto;

    const instance = this.create();
    instance.id = id !== null ? id : null;
    instance.title = title;
    instance.city = city;
    instance.cep = cep;
    instance.street = street;
    instance.status = status == false ? false : true;
    
    return await instance.save();
  }

  public async getAll(parameters: GetPlaceFilterDTO) {
    const { sort, like } = parameters;

    const query = this.createQueryBuilder('places');

    if (like) {
      query.orWhere(
        'places.city LIKE :like',
        { like: `%${like}%` }
      );
      query.orWhere(
        'places.street LIKE :like',
        { like: `%${like}%` }
      );
      query.orWhere(
        'places.cep LIKE :like',
        { like: `%${like}%` }
      );
      query.orWhere(
        'places.title LIKE :like',
        { like: `%${like}%` }
      );
    }
      
    if (sort) {
      query.orderBy('id', sort);
    } else {
      query.orderBy('id', 'DESC')
    }
    return await query.getMany();
  }

  public async disable(id: number) {
    const register = await this.findOne(id);

    if (register) {
      register.status = false;
      register.save();
    }
  }



}