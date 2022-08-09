package teletubbies.map.find;

import java.util.List;
import java.util.Map;

public interface FindService {
    List<FindDto> findAddressByTmapAPI(String name, double longitude, double latitude); // 티맵 API로 명칭 검색
    Map<Integer,String> findElevatorByAPI(List<ElevatorOrderDto> address); // 엘리베이터 API로 엘리베이터 정보 가져오기
    List<StairDto> findStairs(); // 계단 API로 계단 정보 가져오기
    List<ElevatorDto> findElevators(); // 엘리베이터 띄울 엘리베이터 정보 가져오기
    String tMapReverseGeoCoding(String lat, String lon); // 위도경도 좌표를 주소로 변환
}
