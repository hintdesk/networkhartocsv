export class Column {
    constructor(id: string, name: string) {
        this.Id = id;
        this.Name = name;
    }
    Id: string;
    Name: string;
    IsVisible: boolean;
}