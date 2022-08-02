package teletubbies.map.subway;

import java.util.List;

public interface SubwayService {
    List<SubwayDto> findSubwayByStopName(int start, int end, String name);
    Integer findWheelchair(int lnCd, int stinCd, String railOprIsttCd);
    List<ToiletDto> findToilet(int lnCd, int stinCd, String railOprIsttCd);
}
