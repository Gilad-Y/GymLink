export class UserModel {
  public _id: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  private password: string;
  public role: "admin" | "coach";
  public brand?: any;
  public coaches: string[];
  public trainees: [];
  public belongsTo?: string;
  public profile?: string;
  public stats: string[];

  constructor(
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: "admin" | "coach",
    stats: string[],
    coaches: string[],
    trainees: [],
    brand?: any,
    belongsTo?: string,
    profile?: string
  ) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
    this.brand = brand;
    this.coaches = coaches;
    this.trainees = trainees;
    this.belongsTo = belongsTo;
    this.profile = profile;
    this.stats = stats;
  }

  // Method to check if stats has a length
  public hasStatsLength(): boolean {
    return this.stats.length > 0;
  }

  // Getter for password
  public get _password(): string {
    return this.password;
  }

  // Setter for password
  public set _password(pass: string) {
    this.password = pass;
  }

  // Example method to check if the user is an admin
  public isAdmin(): boolean {
    return this.role === "admin";
  }

  // Example method to check if the user is a coach
  public isCoach(): boolean {
    return this.role === "coach";
  }
}
