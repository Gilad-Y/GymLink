export class Column {
  _id: string;
  data: any;
  belongsTo: string;
  createdAt: Date;

  constructor(_id: string, data: string, belongsTo: string, createdAt: Date) {
    this._id = _id;
    this.data = data;
    this.belongsTo = belongsTo;
    this.createdAt = createdAt;
  }
}
