package teletubbies.map.find;

import java.util.List;

public interface FindService {
    List<FindDto> findAddressByTmapAPI(String name, double longitude, double latitude); // 티맵 API로 명칭 검색
    String findElevatorByAPI(String address); // 엘리베이터 API로 엘리베이터 정보 가져오기
    List<StairDto> findStairs(); // 계단 API로 계단 정보 가져오기

    List<ElevatorDto> findElevators(); // 엘리베이터 띄울 엘리베이터 정보 가져오기
}
