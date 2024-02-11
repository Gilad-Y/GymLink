export class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  private userPass: string;
  public type: string;

  public belonging: number;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    userPass: string,
    type: string,
    belonging: number
  ) {
    this.id = id;
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

export class trainee extends UserModel {
  public card: number;
  public subscription: Date;
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    userPass: string,
    type: string,
    belonging: number,
    card: number,
    subscription: Date
  ) {
    super(id, firstName, lastName, email, phone, userPass, type, belonging);
    this.card = card;
    this.subscription = subscription;
  }
}
