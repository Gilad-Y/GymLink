export class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  private userPass: string;
  public type: string;
  public belonging: number;
  public notes: string;
  public startingDate: Date | null; // You may want to use Date if needed
  public endingDate: Date | null; // Same as above
  public paymentMethod: string;
  public paymentNo: number;
  public paymentDone: boolean;
  public packageType: string;
  public price: number;
  public status: string;
  public cId: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    userPass: string,
    type: string,
    belonging: number,
    notes: string,
    startingDate: Date | null,
    endingDate: Date | null,
    paymentMethod: string,
    paymentNo: number,
    paymentDone: boolean,
    packageType: string,
    price: number,
    status: string,
    cId: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.userPass = userPass;
    this.type = type;
    this.belonging = belonging;
    this.notes = notes;
    this.startingDate = startingDate;
    this.endingDate = endingDate;
    this.paymentMethod = paymentMethod;
    this.paymentNo = paymentNo;
    this.paymentDone = paymentDone;
    this.packageType = packageType;
    this.price = price;
    this.status = status;
    this.cId = cId;
  }

  // Getter for userPassword
  public set _userPass(pass: string) {
    this.userPass = pass;
  }

  public get _userPass(): string {
    return this.userPass;
  }

  // Example method to check if payment is done
  public isPaymentCompleted(): boolean {
    return this.paymentDone;
  }
}
