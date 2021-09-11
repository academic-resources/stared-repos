// CODE here for your Lambda Classes

class Person {
    constructor(obj){
        this.name = obj.name;
        this.age = obj.age;
        this.location = obj.location;
        this.gender = obj.gender;
    }

    speak(){
        return `Hello! My name is ${this.name}. I am from ${this.location}.`;
    }
}

class Instructor extends Person {
    constructor(obj){
        super(obj)
        this.specialty = obj.specialty;
        this.favLanguage = obj.favLanguage;
        this.catchPhrase = obj.catchPhrase;
    }
    demo(subject){
        return `Today we are learning about ${subject}.`;
    }
    grade(student, subject){
        return `${student.name} received a perfect score on ${subject}.`
    }
    toughGrader(student){
        let randomAmount = Math.floor(Math.random() * (10)) + 1; //ensures it adds/subtracts a whole integer
        let odds = randomAmount; //gives us a randomizer to make add or subtract 50/50 chances
        if (odds %2 === 0) {
          if (student.grade - randomAmount <= 0) {
            student.grade = 0;
          } student.grade = (student.grade - randomAmount);

        } else if (odds%2 !== 0) {
          if ((student.grade*1) + (randomAmount*1) > 100) {
            student.grade = 100;
          } else { 
          student.grade = ((student.grade*1) + (randomAmount*1));
          }
        } return `After ${this.name} graded ${student.name}'s assignment, ${student.name}'s new score is ${student.grade}.`;
    } 
}

class Student extends Person {
    constructor(obj){
        super(obj)
        this.previousBackground = obj.previousBackground;
        this.className = obj.className;
        this.favSubjects = obj.favSubjects;
        this.grade = obj.grade; //grade must be an array
    }
    listsSubjects(){
        return this.favSubjects;
    }
    PRAssignment(subject){
        return `${this.name} has submitted a PR for ${subject}.`
    }
    sprintChallenge(subject){
        return `${this.name} has begun sprint challenge on ${subject}.`
    }
    graduate(Instructor){
        for (let i=0; i >= 0; i++) {
          if (this.grade > 69) {
            return `${this.name} has graduated with a score of ${this.grade}!`
          } else {
            if (Instructor.toughGrader(this) > 69) {
              return `${this.name} has graduated with a score of ${this.grade}!`;
            } else {
            console.log(`${Instructor.name} gave ${this.name} a score of ${this.grade}. ${this.name} needs to keep working hard to graduate.`)
            }
          }
        }
    }
}

class ProjectManager extends Instructor {
    constructor(obj){
        super(obj)
        this.gradClassName = obj.gradClassName;
        this.favInstructor = obj.favInstructor;
    }
    standUp(channel){
        return `${this.name} announces to ${channel}, "@channel standup time!"`
    }
    debugsCode(Student, subject){
        return `${this.name} debugs ${Student.name}'s code on ${subject}.`
    }
}


const Fred = new Instructor({
    name: 'Fred',
    location: 'Bedrock',
    age: 37,
    gender: 'Male',
    favLanguage: 'JavaScript',
    specialty: 'Front-end',
    catchPhrase: `Don't forget the homies`
  });

const Amber = new Instructor ({
    name: 'Amber',
    location: 'Venus',
    age: 42,
    gender: 'Female',
    favLanguage: 'Python',
    specialty: 'UI/UX',
    catchPhrase: 'Bloop, bloop, bloop!'
});

  const Raymond = new ProjectManager ({
    name: 'Raymond',
    age: 'Wise',
    location: 'Texas',
    gender: 'Male',
    specialty: 'Helping students',
    favLanguage: 'Javascript',
    catchPhrase: '@here Get in here!',
    gradClassName: 'cs11',
    favInstructor: 'Dan',
});

const Grendal = new ProjectManager ({
    name: 'Grendal',
    age: 9,
    location: 'Eugene, Oregon',
    gender: 'Male',
    specialty: 'Growling',
    favLanguage: 'Ruby',
    catchPhrase: 'Is that your final answer?',
    gradClassName: 'cs21',
    favInstructor: 'Amber',
});

  const Julie = new Student({
    name: 'Julie',
    age: 25,
    location: 'Houston',
    gender: 'Female',
    previousBackground: 'Event planner',
    className: 'cspt2',
    favSubjects: ['English', 'World Geography', 'CSS',],
    grade: [75],
});

const Andy = new Student ({
    name: 'Andy',
    age: 38,
    location: 'Houston',
    gender: 'Male',
    previousBackground: 'ATT',
    className: 'Unenrolled',
    favSubjects: ['Volleyball', 'Eating'],
    grade: [21],
}); 

const Bethany = new Student ({
    name: 'Bethany',
    age: 25,
    location: 'Killeen',
    gender: 'Female',
    previousBackground: 'Music Teacher',
    className: 'cs18',
    favSubjects: ['Music', 'Choir', 'Singing', 'Yoga',],
    grade: [56],
})


console.log(Amber.demo('CSS Grid'));
console.log(Amber.grade(Julie, 'React'));


  
console.log(Raymond.debugsCode(Julie, 'HTML'))
console.log(Julie.PRAssignment('HTML'));

console.log(Fred.toughGrader(Julie))
console.log(Fred.toughGrader(Julie))
console.log(Fred.toughGrader(Julie))

console.log(Julie.graduate(Fred));

console.log(Grendal.toughGrader(Andy))

console.log(Bethany.graduate(Raymond))

console.log(Julie.PRAssignment('Javascript'));
console.log(Andy.listsSubjects());
console.log(Bethany.sprintChallenge('React'));

console.log(Grendal.standUp('cspt2Grendal'));
console.log(Raymond.debugsCode(Julie, 'Javascript'));