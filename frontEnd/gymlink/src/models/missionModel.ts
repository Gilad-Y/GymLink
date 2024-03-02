export class missionModel {
  public id: number;
  public coachId: number;
  public traineeId: number;
  public content: string;
  public lastDate: Date;
  public status: boolean;

  constructor(
    id: number,
    coachId: number,
    traineeId: number,
    content: string,
    lastDate: Date,
    status: boolean
  ) {
    this.id = id;
    this.coachId = coachId;
    this.traineeId = traineeId;
    this.content = content;
    this.lastDate = lastDate;
    this.status = status;
  }
}
