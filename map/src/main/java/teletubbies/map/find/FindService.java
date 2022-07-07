package teletubbies.map.find;

import org.json.simple.parser.ParseException;

public interface FindService {
    FindDto findAddressByTmapAPI(String name); // 티맵 API로 명칭 검색
    FindDto findElevatorByAPI(String address); // 엘리베이터 API로 엘리베이터 정보 가져오기
    public FindDto resultDto();
}
