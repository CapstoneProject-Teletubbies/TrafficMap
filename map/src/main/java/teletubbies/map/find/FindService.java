package teletubbies.map.find;

import java.util.List;

public interface FindService {
    List<FindDto> findAddressByTmapAPI(String name); // 티맵 API로 명칭 검색
    String  findElevatorByAPI(String address); // 엘리베이터 API로 엘리베이터 정보 가져오기
}
