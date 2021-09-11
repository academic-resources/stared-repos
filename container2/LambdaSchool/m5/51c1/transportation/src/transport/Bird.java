package transport;

public class Bird extends AbstractAnimals {
    public String name;
    public int year;

    public Bird(String name, int year) {
        this.name = name;
        this.year = year;
    }

    public String setName(String name) {
        this.name = name;
        return name;
    }

    public String getName() {
        return name;
    };

    public int setYear(int year) {
        this.year = year;
        return year;
    }

    public int getYear() {
        return year;
    };

    public String getAnimalClass() {
        return "Bird";
    };

    public String move() {
        return " moves by flying.";
    };

    public String breathe() {
        return "lungs";
    };

    public String reproduce() {
        return "eggs";
    };

}