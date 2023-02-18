export class Task {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public expiration: Date,
    public done: boolean,
  ) { }
}
