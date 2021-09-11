package transport;

// fields
// methods
// "abstract" methods

public abstract class AbstractVehicle {
    protected int fuel;

    public AbstractVehicle(int fuel) {
        this.fuel = fuel;
    }

    public AbstractVehicle() {
        fuel = 1;
    }

    public abstract String getPath();

    public abstract String getName();

    public void move() {
        fuel--;
    }

    public void move(int steps) {
        fuel = fuel - steps;
    }

    public int getFuelLevel() {
        return fuel;
    }

    public void addFuel(int i) {
        fuel += i;
    }
}