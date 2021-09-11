const db = require('../data/db-config');

module.exports = {
	getTasks,
	getProjects,
	getResources,
	getProject,
	getFullProject,
	getContexts,
	getContextsForTask,
	getTasksForContext,
	addTask,
	addProject,
	addResource,
	removeProject,
	removeTask,
	updateTask,
	updateProject
};

// retrieving a list of resources
function getResources() {
	return db('resources');
}

// retrieving a list of projects
function getProjects() {
	return db('projects');
}

// retrieving a list of tasks
// The list of tasks should include the project name and project description.
/*
SELECT projects.projectname, projects.projectdescription,tasks.taskdescription,tasks.tasknotes,tasks.taskscompleted
FROM projects 
JOIN tasks ON tasks.projectid=projects.projectid
WHERE projects.projectid=1
ORDER BY projects.projectname;
*/
// or true, the database will return 1 for true and 0 for false, extra code is required to convert a 1 to true and a 0 to false.
function getTasks(projectid) {
	return db('projects')
		.select(
			'projects.projectname',
			'projects.projectdescription',
			'tasks.taskdescription',
			'tasks.tasknotes',
			'tasks.taskcompleted'
		)
		.join('tasks', 'projects.projectid', 'tasks.projectid')
		.where({ 'projects.projectid': projectid });
}

// retrieving a list of contexts
function getContexts() {
	return db('contexts');
}

// retrieving a list of contexts for a task

function getContextsForTask(taskid) {
	return db('contexts')
		.select('contexts.contextname')
		.join('tasks', 'tasks.taskid', 'taskscontexts,taskid')
		.join('taskscontexts', 'taskscontexts.contextid', 'contexts.contextid')
		.where({ 'tasks.taskid': taskid });
}
// retrieving a list of tasks for a context

// or true, the database will return 1 for true and 0 for false, extra code is required to convert a 1 to true and a 0 to false.
function getTasksForContext(contextid) {
	return db('tasks')
		.select('tasks.taskdescription', 'task.tasknotes', 'task.taskcompleted')
		.join('contexts', 'contexts.contextid', 'taskscontexts.contextid')
		.join('taskscontexts', 'taskscontexts.taskid', 'tasks.taskid')
		.where({ 'context.contextid': contextid });
}

// adding resource
async function addResource(resource) {
	const [id] = await db('resources')
		.insert(resource, 'id')
		.then(ids => {
			return getResources();
		});
}
// or true, the database will return 1 for true and 0 for false, extra code is required to convert a 1 to true and a 0 to false.
// retrieve project
function getProject(projectid) {
	return db('projects').where({ 'projects.projectid': projectid });
}

// adding project
// or true, the database will return 1 for true and 0 for false, extra code is required to convert a 1 to true and a 0 to false.
async function addProject(project) {
	const [id] = await db('projects')
		.insert(project)
		.then(ids => {
			return getProject(ids[0]);
		});
}
// adding tasks
/*
SELECT instructions.instruction, instructions.stepnumber
FROM instructions 
JOIN projectsinstructions ON projectsinstructions.instructionsid=instructions.instructionsid
JOIN projects ON projectsinstructions.projectid=projects.projectid
WHERE projects.projectid=1
Order BY instructions.stepnumber

*/
// or true, the database will return 1 for true and 0 for false, extra code is required to convert a 1 to true and a 0 to false.
async function addTask(taskData) {
	const [id] = await db('tasks')
		.insert(taskData)
		.then(ids => {
			return getTasks(taskData.projectid);
		});
}

// retrieve project with full details
/*
SELECT projects.projectname, projects.projectdescription, tasks.taskdescription, tasks.tasknotes, tasks.taskcompleted
FROM projects 
JOIN tasks ON tasks.projectid=projects.projectid
JOIN ProjectsResources on ProjectsResources.projectid=projects.projectid
JOIN Resources ON Resources.resourceid=ProjectsResources.resourceid
WHERE projects.projectid=1
ORDER BY projects.projectname;
*/
function getFullProject(projectid) {
	return db('projects')
		.select(
			'projects.projectname',
			'projects.projectdescription',
			'tasks.taskdescription',
			'tasks.tasknotes',
			'tasks.taskcompleted'
		)
		.join('tasks', 'tasks.projectid', 'projects.projectid')
		.join('ProjectsResources', 'ProjectsResources.projectid', 'projects.projectid')
		.join('Resources', 'Resources.resourceid', 'ProjectsResources.resourceid')
		.where({ 'projects.projectid': projectid })
		.options({ nestTables: true });
}

// update project
function updateProject(newproject, id) {
	db('projects')
		.where({ projectid: id })
		.update(newproject)
		.then(ids => {
			return ids;
		});
}

// update task
function updateTask(newtask, id) {
	db('tasks')
		.where({ taskid: id })
		.update(newtask)
		.then(ids => {
			return ids;
		});
}

// delete project
function removeProject(id) {
	let project = getProject(id);
	db('projects')
		.delete()
		.where({ projectid: id })
		.then(ids => {
			return project;
		});
}

// delete task
function removeTask(projectid, taskid) {
	let project = getProject(projectid);
	db('tasks')
		.delete()
		.where({ taskid: taskid })
		.then(ids => {
			return project;
		});
}

/*
   knex('users')
    .innerJoin('user_emails','users.id','user_emails.user_id')
    .select([
      'users.id as userID',
      'users.name as userName',
      knex.raw('ARRAY_AGG(user_emails.adress) as email')
    ])
    .groupBy('users.id','users.name')
*/
/*
function add(project) {
	db('projects')
		.insert(project)
		.then(ids => {
			return findById(ids[0]);
		});
}
function update(newproject, id) {
	db('projects')
		.where({ id })
		.update(newproject)
		.then(ids => {
			return ids;
		});
}

function remove(id) {
	let project = findById(id);
	db('projects')
		.delete()
		.where({ id: id })
		.then(ids => {
			return project;
		});
}

function update(id, changes) {
	return db('users')
		.where({ id })
		.update(changes);
}
*/
