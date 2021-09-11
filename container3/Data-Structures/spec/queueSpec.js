describe("queue", function() {
  var queue;

  // TODO: give this responsability to the student
  var refreshQueue = function() {
    // Before each test runs, create a new Queue
    if (skipper.variant == 'functional' || skipper.variant == 'functional-shared') {
      queue = makeQueue();
    } else if (skipper.variant == 'prototypal') {
      queue = Queue();
    } else if (skipper.variant == 'pseudoclassical') {
      queue = new Queue();
    }
  }
  beforeEach(refreshQueue);

  // Any queue implementation should have the following methods
  it('should have "enqueue", "dequeue", and "size" methods', function() {
    expect(queue.enqueue).to.be.a('function');
    expect(queue.dequeue).to.be.a('function');
    expect(queue.size).to.be.a('function');
  });

  it('should not error when dequeuing from an empty queue', function() {
    expect(function(){queue.dequeue()}).not.throws();
  });

  it('should report its size correctly', function() {
    var a = 'a', b = 'b', c = 'c';

    queue.enqueue(a);
    queue.enqueue(b);
    queue.enqueue(c);
    expect(queue.size()).equal(3);

    queue.dequeue();
    expect(queue.size()).equal(2);

    queue.dequeue();
    queue.dequeue();
    queue.dequeue(); // make sure we don't get to -1
    expect(queue.size()).equal(0);
  });

  it('should dequeue items in the FIFO order', function() {
    var a = 'a', b = 'b', c = 'c', d = 'd';

    queue.enqueue(a);
    queue.enqueue(b);
    queue.enqueue(c);
    expect(queue.dequeue()).equal(a);
    expect(queue.dequeue()).equal(b);

    queue.enqueue(d);
    expect(queue.dequeue()).equal(c);
    expect(queue.dequeue()).equal(d);
  });

  // instantiation-style-specific tests
  if (skipper.variant != 'functional'  ){
    it('should have its own storage property', function(){
      expect(queue.hasOwnProperty('storage')).to.exist;
    });

    it('should share methods with other instances', function(){
      var oldQueue = queue;
      refreshQueue();
      expect(oldQueue.push).to.be.equal(queue.push);
    });
    
    // TODO: test for prototypal vs pseudoclassical
    if (skipper.variant != 'functional-shared'){
      it('should inherit its methods ', function(){
        expect(queue.__proto__).to.be.a('object');
        expect(queue.__proto__.enqueue).to.be.a('function');
        expect(queue.__proto__.dequeue).to.be.a('function');
        expect(queue.__proto__.size).to.be.a('function');
      });
    }
  }

});
