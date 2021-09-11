package transport;

public abstract class AbstractAnimals {

    private static int maxID = 0;
    public int id;
    public String name;
    public int year;

    public void AbstractAnimal(String name, int year) {
        maxID++;
        this.id = maxID;
        this.name = name;
        this.year = year;
    }

    public abstract String getName();

    public abstract int getYear();

    public abstract String getAnimalClass();

    public abstract String move();

    public abstract String breathe();

    public abstract String reproduce();

}