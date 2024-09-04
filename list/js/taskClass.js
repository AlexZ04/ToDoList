export class Task {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }

    changeStatus() {
        this.completed = !this.completed;
    }

    getDescription() {
        return this.description;
    }
}
