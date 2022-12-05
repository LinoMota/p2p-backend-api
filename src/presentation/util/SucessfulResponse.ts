export class SucessfulResponse {
  data?: object
  code: number

  constructor(data?: object, code?: number) {
    this.data = data || undefined
    this.code = code === undefined ? 200 : code
  }
}
