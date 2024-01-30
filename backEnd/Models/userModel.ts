export class UserModel {
  public userId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  private userPass: string;
  public type: string;

  public belonging: number;

  constructor(
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    userPass: string,
    type: string,

    belonging: number
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.userPass = userPass;
    this.type = type;

    this.belonging = belonging;
  }

  // Getter for userPassword
  public set _userPass(pass: string) {
    this.userPass = pass;
  }

  public get _userPass(): string {
    return this.userPass;
  }
}