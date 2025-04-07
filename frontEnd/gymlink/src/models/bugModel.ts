export class Bug {
  _id: string;
  title: string;
  description: string;
  user: string;
  createdAt: Date;
  img?: any;

  constructor(
    _id: string,
    title: string,
    description: string,
    user: string,
    createdAt: Date,
    img?: any
  ) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.user = user;
    this.createdAt = createdAt;
    this.img = img;
  }
}
