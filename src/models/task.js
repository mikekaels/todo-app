const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        min: Date.now(),
        required: true,
    },
    importanceLevel: {
        type: Number,
        enum: [1, 2, 3], // 1=Low, 2=Normal, 3=High
        default: 2
    },
    importance: {
        type: String,
    },
    completion: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
},
    {
        versionKey: false,
        timestamps: true,
    }
);


class Task extends mongoose.model('Task', taskSchema) {
    static newTask({ title, dueDate, owner }) {
        return new Promise ((resolve, reject) => {
            this.create({
                title, dueDate, owner
            })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    static findTask(owner) {
        return new Promise ((resolve, reject) => {
            this.find({owner: owner})
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    static updateTask(id, {title, dueDate, importance, completion,}) {
        return new Promise ((resolve, reject) => {
            this.findByIdAndUpdate(id, {title, dueDate, importance, completion})
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}

module.exports = Task;