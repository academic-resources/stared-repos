// CODE here for your Lambda Classes

class Person {
  constructor(name, age, location) {
    this.name = name;
    this.age = age;
    this.location = location;
  }

  speak() {
    return `Hello my name is ${this.name}, I am from ${this.location}`;
  }
}

class Instructor extends Person {
  constructor(name, age, location, specialty, favLanguage, catchPhrase) {
    super(name, age, location);
    this.specialty = specialty;
    this.favLanguage = favLanguage;
    this.catchphrase = catchPhrase;
  }

  speak() {
    return `Hello my name is ${this.name}, I am from ${this.location}`;
  }
  demo(subject) {
    return `Today we are learning about ${subject}`;
  }
  grade(student, sSubject) {
    return `${this.name} took damage.`;
    //receives a student object and a subject string as arguments and logs out '{student.name} receives a perfect score on {subject}'
  }
}

class Student extends Person {
  constructor(name, age, location, previousBackground, className, favSubjects) {
    super(name, age, location);
    this.previousBackground = previousBackground;
    this.className = className;
    this.favSubjects = favSubjects;
  }

  speak() {
    return `${super.speak()}`;
  }
  listsSubjects() {
    return favSubjects.forEach(function(item) {
      console.log(item);
    });
    // a method that logs out all of the student's favoriteSubjects one by one.
  }
  PRAssignment(subject) {
    return `${this.name} has submitted a PR for ${subject}`;
    //a method that receives a subject as an argument and logs out that the student.name has submitted a PR for {subject}
  }
  sprintChallenge(subject) {
    return `${this.name} has submitted sprint challenge on ${subject}`;
    //similar to PRAssignment but logs out student.name has begun sprint challenge on {subject}
  }
  /* stretch:

    Extend the functionality of the Student by adding a prop called grade and setting it equal to a number between 1-100.

    Now that our students have a grade build out a method on the Instructor (this will be used by BOTH instructors and PM's) that will randomly add or subtract points to a student's grade. Math.random will help.

    Add a graduate method to a student.
        This method, when called, will check the grade of the student and see if they're ready to graduate from Lambda School

        If the student's grade is above a 70% let them graduate! Otherwise go back to grading their assignments to increase their score.


    */
}

class ProjectManagers extends Instructor {
  constructor(
    name,
    age,
    location,
    specialty,
    favLanguage,
    catchPhrase,
    gradClassName,
    favInstructor
  ) {
    super(name, age, location);
    this.gradClassName = gradClassName;
    this.favInstructor = favInstructor;
  }

  speak() {
    return `${super.speak()}`;
  }
  standUp() {
    return `${super.speak()}`;
    //a method that takes in a slack channel and logs {name} announces to {channel}, @channel standy times!
  }
  debugsCode() {
    return `${this.name} took damage.`;
    //a method that takes in a student object and a subject and logs out {name} debugs {student.name}'s code on {subject}
  }
}
