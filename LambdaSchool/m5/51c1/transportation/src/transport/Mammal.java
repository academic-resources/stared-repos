package transport;

public class Mammal extends AbstractAnimals {
    public String name;
    public int year;

    public String animalClass;

    public Mammal(String name, int year) {
        this.name = name;
        this.year = year;
    }

    public String getName() {
        return name;
    };

    public void setName(String name) {
        this.name = name;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getAnimalClass() {
        return "Mammal";
    };

    public int getYear() {
        return year;
    }

    public String move() {
        return " moves by walking.";
    };

    public String breathe() {
        return "lungs";
    };

    public String reproduce() {
        return "live births";
    };

}