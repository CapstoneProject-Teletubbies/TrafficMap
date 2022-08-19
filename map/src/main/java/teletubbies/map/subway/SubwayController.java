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

//    @GetMapping("/subway")
    @RequestMapping(value="/subway", method = {RequestMethod.POST})
    public List<SubwayDto> GetSubwayInfo(String name) { // 지하철 관련 컨트롤러
        //테스트
//        String name = "서울";
        return subwayService.findSubwayByStopName(name);
    }

//        @GetMapping("/subway/wheelchair")
    @RequestMapping(value="/subway/wheelchair", method = {RequestMethod.POST})
    public Integer findWheelchair(int lnCd, int stinCd, String railOprIsttCd) { // 휠체어리프트 관련 컨트롤러
        // 테스트용
//        int lnCd = 1;  // 선코드
//        int stinCd= 133; // 역코드
//        String railOprIsttCd = "S1";  //철도운영기관코드
        return subwayService.findWheelchair(lnCd, stinCd, railOprIsttCd); // 개수 반환함
    }

//    @GetMapping("/subway/toilet")
    @RequestMapping(value="/subway/toilet", method = {RequestMethod.POST})
    public Integer findToilet(int lnCd, int stinCd, String railOprIsttCd) { // 장애인화장실 관련 컨트롤러
        //테스트용
//        int lnCd = 1;  // 선코드
//        int stinCd= 133; // 역코드
//        String railOprIsttCd = "S1";  //철도운영기관코드
        return subwayService.findToilet(lnCd, stinCd, railOprIsttCd);
    }


    //인천 1.2호선 내부지도
    @RequestMapping(value="/subway/photo",method = {RequestMethod.POST})
    //@RequestMapping(value="subway/photo")
    public List<String> GetSubwayPhoto(String name){
        //String name = "인천시청";
        return subwayService.findSubwayPhotoByStopName().get(name);
    }

    // 1~9호선 내부지도(비상대피안내도로 대체)
//        @GetMapping("/subway/photo2")
    @RequestMapping(value="/subway/photo2",method = {RequestMethod.POST})
    public String GetSubwayPhoto2(String line,String name){
//        String line = "2";
//        String name = "홍대입구역";
        return subwayService.findSubwayPhoto2(line, name);
    }


}
