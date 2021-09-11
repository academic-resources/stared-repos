class MyQueue
    def initialize(store = [])
      @store = store
    end
    
    def peek
        @store.last
      end
    
      def size
        @store.size
      end
  
      def empty?
          @store.empty?
      end

    def enqueue(val)
        @store.push(val)
    end
    
    def dequeue
        @store.shift
    end
  end
  