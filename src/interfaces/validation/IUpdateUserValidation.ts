export default interface IUpdateUserValidation {
  userExists(id: string): Promise<boolean>
}
