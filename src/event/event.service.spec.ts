import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { EventRepository } from './event.repository';
import { NotFoundException } from '@nestjs/common';

describe('EventService', () => {
  let eventService;
  let eventRepository;

  const mockEventRepository = () => ({
    saveEvent: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: EventRepository,
          useFactory: mockEventRepository,
        },
      ],
    }).compile();
    eventService = await module.get<EventService>(EventService);
    eventRepository = await module.get<EventRepository>(EventRepository);
  });

  describe('createEvent', () => {
    it('should save a event in the database', async () => {
      eventRepository.saveEvent.mockResolvedValue('someEvent');
      expect(eventRepository.saveEvent).not.toHaveBeenCalled();
      
      const createEventDto = {
        name: "Blusa de Manga Longa",
        description: "uma peça de roupa bem casual",
        unitPrice: 15.75
      }	;
      
      const result = await eventService.save(createEventDto);
     
      expect(eventRepository.saveEvent).toHaveBeenCalledWith(createEventDto);
      expect(result).toEqual('someEvent');
    });
  });

  describe('getEvents', () => {
    it('should get all events', async () => {
      eventRepository.find.mockResolvedValue('someEvents');
      expect(eventRepository.find).not.toHaveBeenCalled();
      const result = await eventService.getAll();
      expect(eventRepository.find).toHaveBeenCalled();
      expect(result).toEqual('someEvents');
    });
  });

  describe('getEvent', () => {
    it('should retrieve a event with an ID', async () => {
      const mockEvent = {
        id: 1,
        name: "Blusa de Manga Longa",
        description: "uma peça de roupa bem casual",
        unitPrice: 15.75
      };

      eventRepository.findOne.mockResolvedValue(mockEvent);
      
      const result = await eventService.getOne(1);
      
      expect(result).toEqual(mockEvent);
      expect(eventRepository.findOne).toHaveBeenCalledWith(1);
    });

    it('throws an error as a event is not found', () => {
      eventRepository.findOne.mockResolvedValue(null);
      expect(eventService.getOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteEvent', () => {
    it('should delete event', async () => {
      eventRepository.delete.mockResolvedValue(1);
      expect(eventRepository.delete).not.toHaveBeenCalled();
      await eventService.delete(1);
      expect(eventRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});