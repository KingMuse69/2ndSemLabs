// Bilash Oleksii || IM-52
// PriorityQueue.js
class LabWork4 {
    constructor() {
        this.queue = [];
        this.counter = 0;
    }

    enqueue(item, priority) {
        const element = { item, priority, id: this.counter++ };
        this.queue.push(element);
    }

    _findIndex(type) {
        if (this.queue.length === 0) return -1;
        let targetIndex = 0;

        for (let i = 1; i < this.queue.length; i++) {
            const current = this.queue[i];
            const target = this.queue[targetIndex];

            switch (type) {
                case 'highest':
                    if (current.priority > target.priority) targetIndex = i;
                    break;
                case 'lowest':
                    if (current.priority < target.priority) targetIndex = i;
                    break;
                case 'oldest':
                    if (current.id < target.id) targetIndex = i;
                    break;
                case 'newest':
                    if (current.id > target.id) targetIndex = i;
                    break;
            }
        }
        return targetIndex;
    }

    
    peek(type) {
        const index = this._findIndex(type);
        return index !== -1 ? this.queue[index].item : null;
    }

    dequeue(type) {
        const index = this._findIndex(type);
        if (index === -1) return null;
        return this.queue.splice(index, 1)[0].item;
    }
}


module.exports = LabWork4;