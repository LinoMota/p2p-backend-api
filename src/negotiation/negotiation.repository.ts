/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { HttpService } from 'nestjs-http-promise'
import { CreateNegotiationDto } from './dto/create-negotiation.dto'
import { NegotiationFilterDto } from './dto/negotiation-filter.dto'

@Injectable()
export default class NegotiationRepository {
    constructor(private readonly httpService: HttpService) { }

    async create(createNegotiationDto: Partial<CreateNegotiationDto>) {

        const { data } = await this.httpService.post(`/negotiation/`,
            createNegotiationDto,
        )
        return data
    }

    async find(negotiationFilterDto: NegotiationFilterDto) {
        const { data } = await this.httpService.get(`/negotiation/`, {
            params: negotiationFilterDto,
        })
        return data
    }

    async update(id: string, negotiationFilterDto: NegotiationFilterDto) {
        console.log("adasda", negotiationFilterDto, id);

        const { data } = await this.httpService.patch(`/negotiation/${id}`,
            negotiationFilterDto
        );
        return data
    }


}
