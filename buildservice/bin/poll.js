function findTask() {
}
function build() {
}
function Poll() {
    this.interval = null;
    this.busy = false;
}
Poll.prototype = {
    start() {
        this.busy = true;
        this.interval = setInterval(() => { this.monitor(); }, 5 * 1000);
    },
    stop() {
        clearInterval(this.interval);
    },
    monitor() {
        if (this.busy) {
            return;
        }
        // find task
        findTask();
        // build
        build();
        this.busy = false;
    },
};
Poll.prototype.constructor = Poll;
export default Poll;
