package teletubbies.map.way;

public interface WayService {
    Object findWay(double startX, double startY, double endX, double endY, String startName, String endName);
}
