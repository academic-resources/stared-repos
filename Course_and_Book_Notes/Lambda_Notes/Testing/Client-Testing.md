How can we verify that our code is correct?

Mocha and Chai - still probably the most widely used library
New library people are liking a lot more

LambdaSchool - Testing

You're going to have a couple of folders
In the folders, some boilerplate code written

This is not a test-driven approach, it's unit testing
You'll take some code that's already there and write unit tests.

We'll use Jest (a library)

LambdaSchool creating a council made of industry experts and hiring partners
Every three months, check curriculum against what the partners need

Start with Basic Javascript
You're going to work inside the spec folder to test the functionality of the particular file you're testing

It's not just about writing tests, it's about getting familiar with a code base you didn't write

## Edge cases: What if someone uses this code not in the right way?

- Verifying correctness when function used the right way
- Verifying correctness when function is not used correctly (someone enters a string instead of a number, etc)

As part of this, if you see that there's some edge cases a function doesn't take into account, you could ask the client and ask 'What happens if someone tries to add 10 to something that is empty?" I know this is undefined, but I ask them "Do you want to return 0 or do you want it to be empty?" "Well, if it's undefined, I want a 0." Now you have a new spec.
If you want to, feel free to make the code you see more correct

In C#, never have to check if something is a number because it's a strongly typed language

## (Automated) Testing

- Why?
- How?
- What? - Comes from experience of the developer (or team) and the system we're testing and even the tech stack.
- When? - Test first or test after.

Confidence ( in the sense of trusting your code )
Verifying correctness

We write code to test our code.

Writing code to check our code is something we know how to do.

### Why do you want to learn to test?

- good for resume
- you can work on QA (which is paying a lot more than before) and DevOps
- helps you understand how an application works
- prevents regressions (regression is when you break something not related to your feature)
- safety net (you now feel more empowered to make changes to your code base because you know if you broke something, you can test)

Which libraries should I use for testing?

### Tooling:

- Test runner (Mocha) + assertion library (Chai)
- Mocha - software that runs the test, Chai - the way you check for correctness(the syntax and how you check the values are correct)

We are using Jest.

### Other testing stacks/tools:

- Jasmine
- Cue Union
- Enzyme by airbnb
- Super Test - back-end testing
- React testing library

### Satallite to testing

- How do I know how much of my app is being testing?  
  Coverage: - Instanbul - Karma

Automated testings mean you don't have to manually test everything, you can let the system run and test for you and call your attention to things that failed

### What if I don't have tests?

- test manually - as the app grows, the time needed will not scale
- regressions, code that used to work breaks
- you just don't know if the code is correct for all cases
- adding new features becomes slow

If you have automated tests, even if it's a large code-base, you can run tests before deploying to production

### Types

- unit tests (fastest)
  - Our job, as developers, are required to write unit tests (most companies require it).
  - run on every change when you're doing development and on deployment
- integration tests
  - You not only need to test each unit in isolation, you have to make sure that two separate units that are well tested also interact correctly. When you compose them together do they still do what the system is supposed to do?
  - running on deployment
    - can be run on every commit that is not a deployment to the repository but not while making changes locally to your computer because they're slow.
- component testing (for component based frameworks, like React, Angular, Vue, etc.
- end to end (slow)
  - Client to database.
  - run once a day or maybe on deployment
  - run on commits and on deployments - going to test a lot more than integration and unit testing because it hits a database
- snapshot testing (unique to our stack/tools)
- coverage test
- functional testing
  - Is the system as a whole working as the specifications say it should work
- performance (developers don't do a lot of this - operations team generally do)
- acceptance test
  - Conditions under which you say the system is correct

### So integration tests mean that all unit ones combined in one package?

- That they work together well.
- Ex: Think you're building hardware instead of software and you build a TV
  - TV works perfectly with controls and all that
  - You add a sensor so you could control the TV from the couch with a remote control, so add a receiver
  - Someone else works on the remote control, everything on the remote control works
  - Until you put them together, you don't know if it works or not. That's the integration test.

### We'll concentrate on:

- unit
- component
- snapshot

When you're installing Jest, it could be a dev dependency but what happens in some companies is your tests get run as part of the build process.

- So when your code gets deployed into production, it'll go through a build process and needs to run the tests there
- So you need to have Jest as a dependency so that the automated process on the server can also get the package
  - If you add it as a devDependency, it'll work fine, but when you go to production, it won't be there.
- In Jest, jest is going to run tests two ways (common ways)
  - If you have a **tests** folder
    - index.js file
  - If you don't have any tests in the file, your test will fail because 'Your test suite must contain at least one test'

Jest has a few Globals

```
it('run the tests', () => {})
```

As long as second argument is a function, this is a valid function

- Naming is very important

```
"scripts": {
    "test": "jest" // does not subscribe to changes
}

yarn start
```

```
function add(a, b) {
    return a + b;
}

module.export = {
    add: add,
};
```

Since we're usiung Node, we need to export functions from other files

If you were doing everything on create-react-app, it would be transpiled and work

```
it('should add two numbers', () => {
    // arrange (where you set up environment)
    const expected = 5
    const add = require('../index').add;
    // act
    const actual = add(3, 4);
    // assert - jest matchers/assertions
    expect(actual).toBe(expected) // result: fail
})
```

Another way to import function:

```
const sut = require('../index)
```

```
const utilities = require('../index');
it ('should add two numbers', () => {
    const expected = 7
    const add = utilities.add;
    const actual = add(3,4);
    expected(actual).toBe(expected)
})
```

sut = system under test
refers to something you're testing

Always fail first

- You want to see if your test is checking values
- Even if you're not doing TDD, you should see a test fail first

```
"scripts": {
    "tests": "jests --watchAll" // updates on save
}
```

```
Watch Usage:
> Press f to run only failed tests
> Press o to only run tests related to changed files
> Press p to filter by a filename regex pattern
> Press t to filter by a test name regex pattern
> Press q to quit watch mode
> Press Enter to trigger a test run
```

#### Can I do module.exports.add = add?

- Yes, but that would mean you'd only be exporting that function.
- If you're only doing one function, you can just do module.exports = add

### Something about the syntax:

Some people do:

```
it('should add two numbers', () => {
    const expected = 7;
    const add = utilities.add;
    const actual = add(3, 4);
    expect(actual).toBe(7)
})
```

Don't do this:

```
it('should add two numbers', () => {
    const expected = 7
    const add = utilities.add;
    const actual = add(3,4);
    expected(add(3,4)).toBe(7)
});
```

Don't in-line the execution of the code of the system under test into the expected

- Extract it out always
- Don't have to call it actual (can call it any other name), but separate the act from the assert

You want your code to be easier to read for people

This is a simple example, but sometimes executing the function will require a lot more than that and if you in-line it ...

- Cognitive load: Things you need to deal with to understand something
- Making it not inline lessens the cognitive load
  For Luis it's easier to read

Facebook has it inline to save space maybe?

In reality, you'll be testing React applications so instead of using require, you'll be using import and export
This is a problem that's going to go away, so don't worry too much about this (requiring the file)

#### How do you feel about multiple expect statements in a single test definition?

- I feel okay. You're going to hear a lot of opinion this week. Doesn't really matter.

  - It's not about the instructor. Teaching this requires a lot of opinion because there is not one voice on the internet about any of that stuff
    - The way I approach it, I am testing a bit of functionality.
      - Sometimes to make sure that that piece of functionality works correctly, you need to test more than one thing.
      - When that is the case, that I have to test for three or four things to make sure that unit is working correctly, I want to see them all here.
        - I don't want to have create five functions when I could have one with all the setup and then have a few more expects.
          - In those cases, I'm okay with not having 'expected' in 'toBe'. Because it may be that what you want to do, you want to have to call a few of those (acts), have a few values, give it a few names, and then have a few 'expect's that are different.
          - Some people say if it's not too complicated, they'll inline the acts into the expect. I still like to extract out variables or constants and test against the constant and the value I expect out of that.
          - You'll hear people that will write blog posts with really good examples about why you should only have one expect per it function.

- I'm okay with something like this:

```
it('should add two numbers', () => {
    const add = utilities.add;

    const seven = add(3,4)
    const four = add(0,4)
    const minusthree = add(1,-4);

    expect(seven).toBe(7);
    expect(four).toBe(4);
    expect(minusthree).toBe(-3);
})
```

When you don't have a git repository, you need to use --watchAll

- If it's a git repository, you can use --watch
  - To make it a git repository if it isn't already, git init

Jest is really smart. It will only run when the test or the code changes. If you change code and there's no test associated with it, it won't run.
It will auto-test if you have the --watch or --watchAll

Quick Intro of what Matchers are:
https://facebook.github.io/jest/docs/en/using-matchers.html

API on Matchers:
https://facebook.github.io/jest/docs/en/expect.html#methods

Globals:
https://facebook.github.io/jest/docs/en/api.html

Options for the CLI:
https://facebook.github.io/jest/docs/en/cli.html

You can group tests by whatever you're testing.

```
const utilities = require('../index');

describe('default', () => {
    it('run the tests', () => {})
});

describe('add function, () => {
    it('should add two numbers', () => {
        // arrange
        const add = utilities.add;
        //act
        const seven = add(3,4);
        const four = add(0, 4);
        const minusThree = add(1, -4);
        //assert
        expect(seven).toBe(7);
        expect(four).toBe(4);
        expect(minusThree).toBe(-3);
    });
});
```

**_Describe_**:
A global that's a way for you to organize pieces of code and the display of the code.

```
it('checks identity', () => {
    const numbers = [1, 2, 3];

    const actual = [1, 2, 3]; // comes from executing code
    expect(numbers).toBe(actual) <---fails test
})
```

```
it('checks identity', () => {
    const numbers = [1, 2, 3];

    const actual = [1, 2, 3];
    expect(numbers).toEqual(actual); <---passes tests
})
```

##### Is it because of pointers?

- Yes. This is why I called it checks identity, because one of them will check not only is the content equal, but it will check for the content. It's a deep equal, so it'll check if all the values and properties are the same.
  - Equal checks if it quacks like a duck and walks like a duck, it's a duck. It may not be the same duck, but it's a duck.
  - toBe checks if it's the same identity, if it's the same array. It's not the same array.

```
it('checks identity', () => {
    const numbers = [1, 2, 3];

    const actual = numbers; // actual is now a reference to numbers
    expect(numbers).toBe(actual);
    // passes tests because they have the same identity, the same reference, the same pointer
})
```

People tend to use toBe and toEqual and they sometimes feel the same, but they're not really the same.

What if I want to check the type of something?

```
it('checks that it is an array', () => {
    const numbers = [1, 2, 3];
    const expected = 'array'
    const actual = typeof numbers
    expect(numbers).toBe(expected) // failed - expected value to be 'array', received 'object'
})
```

You want to do checks as specialized as you can. Do not rely on toBe or toEqual to do all of your tests.

- If you want to check for the values in an array, instead of toEqual, there is a 'contains'
- There is a 'toHaveLength for the array. Instead of checking for the length, you check for the toHaveLength'

Take a look at the Methods
Go with whatever makes the code more readable.
