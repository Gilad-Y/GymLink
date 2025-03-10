export class Column {
  _id: string;
  title: string;
  dataType: string;
  options?: string[];
  data: any;
  isPrivate: boolean;
  stats?: string;
  createdBy: string;

  constructor(
    _id: string,
    title: string,
    dataType: string,
    data: any,
    isPrivate: boolean,
    createdBy: string,
    options?: string[],
    stats?: string
  ) {
    this._id = _id;
    this.title = title;
    this.dataType = dataType;
    this.data = data;
    this.isPrivate = isPrivate;
    this.stats = stats;
    this.createdBy = createdBy;
    this.options = options;
  }
}
