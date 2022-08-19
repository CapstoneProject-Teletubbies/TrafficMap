package teletubbies.map.subway;

import org.springframework.util.MultiValueMap;

import java.util.List;

public interface SubwayService {
    List<SubwayDto> findSubwayByStopName(String name);
    Integer findWheelchair(int lnCd, int stinCd, String railOprIsttCd);
    Integer findToilet(int lnCd, int stinCd, String railOprIsttCd);
    MultiValueMap<String, String> findSubwayPhotoByStopName();

    String findSubwayPhoto2(String line, String name);
}
