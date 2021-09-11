const expect  = require('expect');
const request = require('supertest');

const Workflow = require('../workflow');
const Deps     = require('./dummy-deps');

var d = Deps.Build();

const workflow = Workflow.Build(d);

describe('Tests workflow class', () => {

    it ('Creates a workflow with no tasks', (done) => {

        expect(workflow.pendingTasks()).toEqual(false);

        done();
    });

    it ('Pops the first task in the task queue', (done) => {

        var task1 = {
            input: 'Mayank',
            callback: 'Some callback',
            retries: 3
        };

        var task2 = {
            input: 'Amencherla',
            callback: 'New callback',
            retries: 3
        };

        workflow.addParallelTask(task1.input, task1.callback, task1.retries);

        expect(workflow.pendingTasks()).toEqual(true);

        workflow.addParallelTask(task2.input, task2.callback, task2.retries);

        var popped = workflow.popFrontTask();

        expect(task1).toEqual(popped);

        expect(workflow.pendingTasks()).toEqual(true);

        popped = workflow.popFrontTask();

        expect(task2).toEqual(popped);

        expect(workflow.pendingTasks()).toEqual(false);

        done();
    });

    it ('Processes the tasks in the queue', async () => {

        var urls = ['https://www.monzo.com', 'https://www.manutd.com', 'https://www.uiuc.com'];

        var task1 = {
            input: urls,
            callback: 'dummy',
            retries: 3
        };

        workflow.addParallelTask(task1.input, task1.callback, task1.retries);

        var res = await workflow.runTasks();

        expect(res).toEqual(true);
    });
});
