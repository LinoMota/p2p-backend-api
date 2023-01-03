import BaseError from '../../common/BaseError'

export default class NoIdWasProvided extends BaseError {
  constructor() {
    super('NoIdWasProvided: No id was provided!', 401)
  }
}
