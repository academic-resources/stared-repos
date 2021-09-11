package transport;

public class Fish extends AbstractAnimals {
    public String name;
    public int year;

    public Fish(String name, int year) {
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

    public int getYear() {
        return year;
    }

    public String getAnimalClass() {
        return "Fish";
    };

    public String move() {
        return " moves by swimming.";
    };

    public String breathe() {
        return "gills";
    };

    public String reproduce() {
        return "eggs";
    };

}