export class File {
    constructor(file,data) {
        this.file = file
        this.data = data
    }
    getData() {
        return {
            file: this.file,
            data: this.data
        }
    }
}