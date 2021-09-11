require "animal.rb"

describe Dog do
  
  subject(:lola) { Dog.new('Lola')}  
  
  describe "#initialize" do

    it '#initializes a dog' do
      lola = dog.new('Lola')
      expect(lola).to be_a(dog)
    end

    it 'initializes with a #name' do
      lola = Dog.new('Lola')
      expect(lola.name).to eq ('Lola')
    end

    it "initializes with an empty array of puppies" do
      # predicate methods are methods that end with a question mark
      expect(lola.puppies).to be_empty
    end

  end

  describe "#add_puppy"
    let(:pup) { Dog.new('Pupper') }
    it "adds a puppy to lola's list of puppys" do
      lola.add_puppy(pup)
      expect(lola.puppies).to include(pup)
      expect(lola.puppies).to contain_exactly(pup)
    end
    
  end

  describe "#name=" do
    
    it 'renames the dog' do
      lola.name = 'Lolita'
      expect(lola.name).to eq ('Lolita')
    end

  end

  describe "#encounter_cat)" do

    let(:cat) { double('cat') }

    context "when the cat is friendly" do

      it "should play" do
        allow(cat).to receive(:friendly).and_return(true)
        # cat = double('Cat', friendly?:true)
        # cat = Cat.new(true) #boolean if friendly or not
        expect(lola).to receive(:play)
        expect(lola).to_not receive(:run)
        
        result = lola.encounter_cat(cat)

        expect(result).to eq("I'm playing")
      end

    end
  

    context "when the cat is mean (not friendly)" do
      it "should run" do
        allow(cat).to receive(:friendly).and_return(false)
        # cat = double('Cat', friendly?:true)
        # cat = cat.new(false)
        lola.run
        expect(lola).to receive(:run).and_call_original
        expect(lola).to_not receive(:play)
      end

    end

  # end

  # describe "#unfriendly_encounter" do

  #   it "raises an error" do
  #     expect do
  #       lola.unfriendly_encounter
  #     end.to
  #       raise_error(NoSuchThingAsFriendlyCats, "Woof Woof!")
  #   end

  # end

end