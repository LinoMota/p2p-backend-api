import { Controller, Get, Param } from '@nestjs/common'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { Address } from './entity/address.entity'
import { ViaCepService } from './via-cep.service'

@Controller('zipCode')
@ApiTags('zip-code')
export class ViaCepController {
  constructor(private readonly viaCepService: ViaCepService) {}

  @Get(':cep')
  @ApiParam({
    name: 'cep',
    required: true,
    description: 'Cep que dever ser fornecido para consulta no site via-cep.',
  })
  async findCep(@Param('cep') cep: string) {
    return await this.viaCepService.findCep(cep)
  }
}
