const Parallel           = require('async-parallel');
const Configuration      = require('../configuration');
const Task               = require('./task');

const config = Configuration.Build();

const concurrency = config.get('CONCURRENCY') || 1;

console.log(`Setting up request queue with concurrency of ${concurrency}`);

Parallel.setConcurrency(concurrency);

class Workflow {
    constructor() {
        this.tasks = [];
    }

    /**
     * Adds a parallel task to the workflow
     * @param input
     * @param callback
     * @param retries
     */
    addParallelTask(input, callback, retries) {
        var task = Task.Build(input, callback, retries);

        this.tasks.push(task);

        return this;
    }

    /**
     * Returns where there exist pending tasks
     * @return bool
     */
    pendingTasks() {
        return this.tasks.length > 0;
    }

    /**
     * Pops the front task and returns it
     * @return task
     */
    popFrontTask() {
        var task = this.tasks[0];

        this.tasks.splice(0, 1);

        return task;
    }

    /**
     * Runs a pending task
     * @param task
     * @return bool
     */
    async runTask(task) {
       var elems = task.getInput();

       var numTry = task.getRetries();

       var method = task.getCallback();

       while (numTry > 0) {

            try {
                await Parallel.map(elems, (elem) => this.deps[method](elem));

                return true;
            } catch (e) {
                console.log(`Task failed`);
                // Use a retry
                numTry--;
            }
       }

       console.log(`Unable to run task`);

       // Some / all of the input urls were not crawled, and
       // therefore must be added back to the discovered queue
       this.deps['reQueue'](elems);

       return false;
    }

    /**
     * Recursively runs the set of pending tasks
     * @return bool
     */
    async runTasks() {
        if (!this.pendingTasks()) return;

        var task = this.popFrontTask();

        await this.runTask(task);

        await this.runTasks();

        return true;
    }

    /**
     * Builds a workflow instance and returns it
     * @param deps
     * @return Workflow
     */
    static Build(deps) {
        const workflow = new Workflow();

        workflow.setDependency(deps);

        return workflow;
    }

    /**
     * Sets the dependency object that is using this workflow
     * @param deps
     */
    setDependency(deps) {
        this.deps = deps;
    }
};

module.exports = Workflow;