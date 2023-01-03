
import AuthenticateUser from '../../src/domain/use-cases/AuthenticateUser'
import { JwtHelperMock, userDb } from '../mocks/AuthenticateUserMock'
import { EncryptionMock, UserRepositoryMock } from '../mocks/CreateUserMocks'

interface SutTypes {
  sut: AuthenticateUser
  repository: UserRepositoryMock
  jwtHelper: JwtHelperMock
  encryption: EncryptionMock
}

const makeSut = (): SutTypes => {
  const repository = new UserRepositoryMock()
  const jwtHelper = new JwtHelperMock()
  const encryption = new EncryptionMock()
  const sut = new AuthenticateUser(repository, encryption, jwtHelper)
  return {
    sut,
    encryption,
    repository,
    jwtHelper,
  }
}

describe('Authenticate user use-case tests', () => {
  test('Should authenticate a valid user', async () => {
    const { sut } = makeSut()
    const res = await sut.authenticate(userDb[0])
    expect(res).toBeTruthy()
  })
})
