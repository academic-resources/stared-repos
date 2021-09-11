Project table
- increment()
- table.string('project_name').notNullable().unique()
- table.string('project_description').notNullable()
- table.boolean('completed')


Action table
- increment()
- table.string('action_description').notNullable();
- table.string('action_notes')
- table.boolean('completed')
- table.integer().unsigned()
- table.foreign('project_id').references('id').on('projects')


Context Table
- increment()
- table.string('context').notNullable()
- table.integer().unsigned()
- table.foreign('action_id').references('id').on('actions')



Project: Action
1: Many

Action : Contexts
Many : Many


Seed Data:

Projects
[
    {project_name: "Build chicken coop", project_description: "Create a fortified home for the precious birds", completed: 0},
    {project_name: "Bake a cake", project_description: "Make grandma happy by giving her a cake for her 71st birthday", completed: 0},
    {project_name: "Learn piano", project_description: "Gain a useful life skill to show off at parties", completed: 0},
]

[
    {action_description: "Dig a hole", action_notes: "6 ft deep, 10x10, fortify with wire", completed: 1, project_id: 1},
    {action_description: "Build the coop", action_notes: "Follow designs and paint with enthusiasm", completed: 0, project_id: 1},
    {action_description: "Setup night cameras", action_notes: "Order from amazon", completed: 0, project_id: 1},
    {action_description: "Purchase ingredients", action_notes: "", completed: 0, project_id: 2},
    {action_description: "Bake and decorate", action_notes: "Channel your inner Martha", completed: 0, project_id: 2},
    {action_description: "Get a piano teacher", action_notes: "Setup weekly lessons", completed: 1, project_id: 3},
    {action_description: "Practice", action_notes: "At least 30 min daily", completed: 0, project_id: 3},
]

[
    {context: "Errands", action_id: 4},
    {context: "Online", action_id: 3},
    {context: "At home", action_id: 5},
    {context: "At the farm", action_id: 1},
    {context: "At the farm", action_id: 2},
    {context: "At home", action_id: 7 },
]



//In an ideal world, each context would only be listed once and could list as many action ids as pertains to each project, keeping contexts unique. How do you set this up?


Postman Test Data

{
    "project_name": "Make the perfect cup of coffee",
    "project_description": "People will flock to your side in search of short term happiness"
}

{
        "project_name": "Learn web development",
        "project_description": "Become a geeky badass and rule the world",
        "completed": 1
}

{
    "action_description": "Purchase ingredients",
    "action_notes": "",
    "project_id": 2
}