import Brand from '@entities/Brand'

export default interface IBrandRepository {
  getAll(): Promise<Brand[] | undefined>
}
