package teletubbies.map.subway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SubwayController {
    @Autowired
    SubwayServiceImpl subwayService;

    @RequestMapping(value="/subway", method = {RequestMethod.POST})
    public List<SubwayDto> GetSubwayInfo(String name) { // 지하철 관련 컨트롤러
        return subwayService.findSubwayByStopName(name);
    }

    @RequestMapping(value="/subway/wheelchair", method = {RequestMethod.POST})
    //@GetMapping(value="/subway/wheelchair")
    public List<WheelchairDto> findWheelchair(String subwayName) { // 휠체어리프트 관련 컨트롤러
        //String subwayName = "1호선 부평";
        return subwayService.findWheelchair(subwayName);
    }

    @RequestMapping(value="/subway/toilet", method = {RequestMethod.POST})
    //@GetMapping(value="/subway/toilet")
    public List<ToiletDto> findToilet(String subwayName) { // 장애인화장실 관련 컨트롤러
    //    String subwayName = "공항철도 서울역";
        return subwayService.findToilet(subwayName);
    }

    //인천 1.2호선 내부지도
    @RequestMapping(value="/subway/photo",method = {RequestMethod.POST})
    public List<String> GetSubwayPhoto(String name){
        return subwayService.findSubwayPhotoByStopName().get(name);
    }

    // 1~9호선 내부지도(비상대피안내도로 대체)
    @RequestMapping(value="/subway/photo2",method = {RequestMethod.POST})
    public String GetSubwayPhoto2(String line,String name){
        return subwayService.findSubwayPhoto2(line, name);
    }


}
