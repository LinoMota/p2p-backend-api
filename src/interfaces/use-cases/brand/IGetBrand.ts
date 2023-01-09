import Brand from '@entities/Brand'

export default interface IGetBrand {
  getAll(): Promise<Partial<Brand[]> | undefined>
}
