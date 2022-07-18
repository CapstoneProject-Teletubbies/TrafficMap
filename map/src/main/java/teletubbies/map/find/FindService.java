package teletubbies.map.find;

import org.json.simple.parser.ParseException;

import java.util.ArrayList;
import java.util.List;

public interface FindService {
    List<FindDto> findAddressByTmapAPI(String name); // 티맵 API로 명칭 검색
    Object  findElevatorByAPI(String address); // 엘리베이터 API로 엘리베이터 정보 가져오기
//    Object resultDto();
}
