export class Column {
  _id: string;
  title: string;
  dataType: string;
  data: any;
  createdBy: string;

  constructor(
    _id: string,
    title: string,
    dataType: string,
    data: any,
    createdBy: string
  ) {
    this._id = _id;
    this.title = title;
    this.dataType = dataType;
    this.data = data;
    this.createdBy = createdBy;
  }
}
