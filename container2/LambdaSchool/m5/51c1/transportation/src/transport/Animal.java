package transport;

public class Animal {
    private static int maxID = 0;
    public int id;
    public String name;
    public int year;

    public Animal(String name, int year) {
        maxID++;
        this.id = maxID;
        this.name = name;
        this.year = year;
    }

    public String setAction() {
        return name + " ";
    };

    public String sayAction() {
        return name + " ";
    };

    public void setModel(String name) {
        this.name = name;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getYear() {
        return year;
    }
}