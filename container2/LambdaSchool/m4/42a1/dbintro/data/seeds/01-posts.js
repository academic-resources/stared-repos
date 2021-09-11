
exports.seed = function(knex, Promise) {
  return knex('posts').truncate()
    .then(function () {
      return knex('posts').insert([
        { title: "post-01", contents: "Let your workings remain a mystery. Just show people the results." },
        { title: "post-02", contents: "True mastery can be gained by letting things go their own way. It can't be gained by interfering." },
        { title: "post-03", contents: "Not-knowing is true knowledge. Presuming to know is a disease." },
        { title: "post-04", contents: "Success or failure: which is more destructive?" },
        { title: "post-05", contents: "When two great forces oppose each other the victory will go to the one that knows how to yield." },
        { title: "post-06", contents: "Things arise and she let's them come; things disappear and she let's them go." },
        { title: "post-07", contents: "A good travel has no fixed plans and is not intent upon arriving. A good artist lets his intuition lead him where ever it wants." },
        { title: "post-08", contents: "When you look for it, there is nothing to see. When you listen for it, there is nothing to hear. When you use it, it is inexhaustible." },
        { title: "post-10", contents: "She acts without expectation, succeeds without taking credit and doesn't think she is better than anyone else." },
        { title: "post-11", contents: "Act without doing; work without effort." },
        { title: "post-12", contents: "Do you have the patience to wait until your mud settles and the water is clear? Can you remain unmoving until the right action arises by itself?" },
        { title: "post-13", contents: "He who tries to shine dims his own light. He who defines himself can't know who he really is. He who clings to his work will do nothing that endures. Just do your job, then let go." }
      ]);
    });
};
