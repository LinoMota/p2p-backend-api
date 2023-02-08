import { Injectable } from '@nestjs/common';
import { CreateNegotiationDto } from './dto/create-negotiation.dto';
import { UpdateNegotiationDto } from './dto/update-negotiation.dto';

@Injectable()
export class NegotiationService {
  create(createNegotiationDto: CreateNegotiationDto) {
    return 'This action adds a new negotiation';
  }

  findAll() {
    return `This action returns all negotiation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} negotiation`;
  }

  update(id: number, updateNegotiationDto: UpdateNegotiationDto) {
    return `This action updates a #${id} negotiation`;
  }

  remove(id: number) {
    return `This action removes a #${id} negotiation`;
  }
}
