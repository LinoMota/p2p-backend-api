import User from '../../src/domain/entities/User'
import EmailExistsException from '../../src/domain/exception/EmailExistsException'
import CreateUser from '../../src/domain/use-cases/CreateUser'
import { UserRepositoryMock, EncryptionMock, defaultUser, CreateUserValidationMock } from '../mocks/CreateUserMocks'

interface SutTypes {
  sut: CreateUser
  repository: UserRepositoryMock
  encryption: EncryptionMock
  validation: CreateUserValidationMock
}

const makeSut = (): SutTypes => {
  const repository = new UserRepositoryMock()
  const encryption = new EncryptionMock()
  const validation = new CreateUserValidationMock(repository)
  const sut = new CreateUser(repository, encryption, validation)
  return {
    sut,
    repository,
    encryption,
    validation,
  }
}

describe('CreateUser use-case tests', () => {
  test('Should return a user with encrypted password', async () => {
    const { sut, encryption } = makeSut()
    const res = (await sut.create(defaultUser) as User)
    expect(res.password).toBe(encryption.encrypt((defaultUser as User).password))
  })

  test('Should return a user with id', async () => {
    const { sut } = makeSut()
    const res = (await sut.create(defaultUser) as User)
    expect(res.id).toBeTruthy()
  })

  test('Should return an EmailExistsException if email already exists', async () => {
    const { sut } = makeSut()
    const res = await sut.create({ ...defaultUser, email: 'existing_email@mail.com' })
    expect(res).toBeInstanceOf(EmailExistsException)
  })

  test('Should call repository.createUser with correct params', async () => {
    const { sut, repository } = makeSut()
    const spy = jest.spyOn(repository, 'createUser')
    await sut.create(defaultUser)
    expect(spy).toHaveBeenCalledWith(defaultUser)
  })

  test('Should call encryption.encrypt with correct params', async () => {
    const { sut, encryption } = makeSut()
    const spy = jest.spyOn(encryption, 'encrypt')
    await sut.create(defaultUser)
    expect(spy).toHaveBeenCalledWith((defaultUser as User).password)
  })

  test('Should call validation.emailExists with correct params', async () => {
    const { sut, validation } = makeSut()
    const spy = jest.spyOn(validation, 'emailExists')
    await sut.create(defaultUser)
    expect(spy).toHaveBeenCalledWith(defaultUser)
  })
})
