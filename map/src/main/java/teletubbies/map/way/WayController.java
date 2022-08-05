
package teletubbies.map.way;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import teletubbies.map.subway.SubwayDto;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WayController {
    @Autowired
    WayServiceImpl wayService;

//    @GetMapping("/way")
    @RequestMapping(value="/way", method = {RequestMethod.POST})
    public Object FindWay(double startX, double startY, double endX, double endY,String startName, String endName) {
        //테스트용
//        double startX = 127.108212;
//        double startY = 37.402056;
//        double endY = 37.49159726;
//        double endX = 126.72449073;
//        String startName = "카카오판교오피스";
//        String endName = "스타벅스부평";
        return wayService.findWay(startX, startY, endX, endY, startName, endName);
    }

    @GetMapping("way/trans")
    public String FindTransWay(){
        //테스트용
        String url="https://map.kakao.com/?map_type=TYPE_MAP&target=car&rt=501139,1109250,495285,1129803&rt1=대법원&rt2=서울시청&rtIds=,8430129";
        return url;
    }

//    @GetMapping("/way/transit")
////    @RequestMapping(value="/way/transit", method = {RequestMethod.POST})
//    public Object ConnectWay() { //(latitude, longitude, name)) {
//        //테스트용
//        double longitude = 127.108212;
//        double latitude = 37.402056;
//        String name = "카카오판교오피스";
//        return wayService.findWay(latitude, longitude, name);
//    }

}
