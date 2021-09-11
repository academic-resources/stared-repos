package transport;

public interface Vehicle {
    String getPath();

    void move();

    int getFuelLevel();

    void addFuel(int i);
}