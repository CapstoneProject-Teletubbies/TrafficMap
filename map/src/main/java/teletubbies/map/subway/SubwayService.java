package teletubbies.map.subway;

import org.springframework.util.MultiValueMap;

import java.util.List;

public interface SubwayService {
    List<SubwayDto> findSubwayByStopName(String name);
    List<WheelchairDto> findWheelchair(String subwayName);
    List<ToiletDto>  findToilet(String subwayName);
    MultiValueMap<String, String> findSubwayPhotoByStopName();

    String findSubwayPhoto2(String line, String name);
}
