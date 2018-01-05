const winston = require('winston')

const defaultWinstonOptions = {
    level: 'info',
    transports: [
        new (winston.transports.Console)()
    ]
}

class Newman {
    constructor(emitter, reporterOptions, options) {
        const newmanCollection = options.collection;

        // overwrite default options for winston with reporterOptions
        const winstonOptions = Object.assign(defaultWinstonOptions, reporterOptions)
        // initialize new winston logger
        this.logger = new (winston.Logger)(winstonOptions)

        emitter.on('start', () => {
            this.logger.info(`Start collection run for collection "${newmanCollection.name}" (${newmanCollection.id})`)
            this.count = 1;
        });

        emitter.on('beforeItem', (err, o) => { });

        emitter.on('beforeRequest', (err, o) => { });

        emitter.on('request', (err, o) => { });

        emitter.on('script', (err, o) => { });

        emitter.on('assertion', (err, o) => {
            if (err) {
                this.logger.error(`✗ Assertion failed! [${this.count} / ${o.item.name}]: "${o.assertion}"`, err.message);
            } else {
                this.logger.info(` ✔ Assertion passed! [${this.count} / ${o.item.name}]: "${o.assertion}"`)
            }

            this.count++;
        });

        emitter.on('done', () => {
            this.logger.info(`Collection run completed for collection "${newmanCollection.name}" (${newmanCollection.id}):  ${this.count} tests executed`);
        });
    }
}

module.exports = Newman;