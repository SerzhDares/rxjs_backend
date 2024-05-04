const {faker} = require('@faker-js/faker');

class MessagesGenerator {
    constructor() {
        this.messages = [];
    }

    newMessage() {
        return {
            id: faker.string.uuid(),
            from: faker.internet.email(),
            subject: `Hello from ${faker.internet.userName()}`,
            body: `${faker.word.words(({ count: { min: 5, max: 20 } }) )}`,
            recieved: new Date().toLocaleString()
        }
    }

    createMessage() {
        this.messages = [];
        const random = Math.floor(Math.random() * 4);

        while(this.messages.length < random) {
            this.messages.push(this.newMessage());
        }

        console.log(this.messages);

        return {
            status: 'ok',
            timestamp: Date.now(),
            messages: this.messages
        }
    }
}

module.exports = MessagesGenerator;