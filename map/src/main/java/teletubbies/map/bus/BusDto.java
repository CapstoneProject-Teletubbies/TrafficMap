package teletubbies.map.bus;

import lombok.Data;

@Data
public class BusDto {
    //버스
    public int busId; //버스 고유 ID
    public String busName; //버스 번호
    public String busStart; //버스 출발지
    public String busEnd; //버스 도착지

    public int orderNum; // 이거 뭐였지?

    //실시간 정보
    public boolean isLowFloor; //저상버스인지
    public int where; //몇 전에 있는지?
    public String busNumPlate; //버스 번호판 번호 4자리

    //버스 정류장
    public int busStopId; //버스정류장 고유 ID
    public String busStopName; //버스정류장 이름
    public String busStopDestination; //ex)신한일전기 방면

    //Buses
    public int busType; //버스 종류
    public String busZone; //이거 뭐였지? ex)부천
}
