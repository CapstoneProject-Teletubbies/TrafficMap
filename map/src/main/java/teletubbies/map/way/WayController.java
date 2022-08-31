package teletubbies.map.way;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.net.URLEncoder;
import java.util.List;

@RestController
@RequestMapping("/api")
public class WayController {
    @Autowired
    WayServiceImpl wayService;

//    @GetMapping("/way")
    @RequestMapping(value="/way", method = {RequestMethod.POST})
    public List<WayDto> FindWay(double startX, double startY, double endX, double endY, String startName, String endName, Number option) {
        //테스트용
//        double startX = 127.108212;
//        double startY = 37.402056;
//        double endY = 37.49159726;
//        double endX = 126.72449073;
//        String startName = "카카오판교오피스";
//        String endName = "스타벅스부평";
//        Number option = 0;
        return wayService.findWay(startX, startY, endX, endY, startName, endName, option);
    }

    @RequestMapping(value="/way/trans", method = {RequestMethod.POST})
    public String FindTransWay4(String sName,String eName){ // 카카오 대중교통 길찾기 연결 -> 출발지, 도착지 이름or 주소 입력하는 방법
        return wayService.findTransWay(sName, eName);
    }

//    @GetMapping("way/transTest")
//    @RequestMapping(value="way/transTest", method = {RequestMethod.POST})
//    public String FindTransWay(){
//        //테스트용
//        String url="https://map.kakao.com/?map_type=TYPE_MAP&target=car&" + "rt=501139,1109250,495285,1129803&rt1=대법원&rt2=서울시청&rtIds=,8430129";
//        return url;
//    }
}
