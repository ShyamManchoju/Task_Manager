class Task {
    constructor(id, title){
        this.id= id;
        this.title = title; 
        this.completed = false; 
        this.date = new Date();
    }
}

module.exports = Task;