
- [X] Why would you use class component over function components (removing hooks from the question)?

    Because some companies still use class components and don't want to switch their millions of dollars' worth of code over to all functional hooks, and also there's currently a lot more troubleshooting content out there for classes that isn't out there for hooks.  Also, functional components are better when you don't need state, presentational components

- [X] Name three lifecycle methods and their purposes.

	componentDidMount = do the stuff inside this 'function' after the component mounted
	componentDidUpdate = do the stuff inside this function after the component updated
    componentWillUnmount = clean-up in death/unmounting phase

- [X] What is the purpose of a custom hook?

    allow you to apply non-visual behavior and stateful logic throughout your components by reusing the same hook over and over again

- [X] Why is it important to test our apps?

    Gets bugs fixed faster, reduces regression risk, makes you consider/work out the edge cases, acts as documentation, acts as safety net when refactoring, makes code more trustworthy

