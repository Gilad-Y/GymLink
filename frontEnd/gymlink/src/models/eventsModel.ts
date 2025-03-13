export class EventModel {
  public _id: string;
  public start: Date;
  public end: Date;
  public title: string;
  public from: string;
  public to: string;

  constructor(
    _id: string,
    start: Date,
    end: Date,
    title: string,
    from: string, // user id
    to: string // trainee id
  ) {
    this._id = _id;
    this.start = start;
    this.end = end;
    this.title = title;
    this.from = from;
    this.to = to;
  }
}

export default EventModel;
