package teletubbies.map.way;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.net.URLEncoder;

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
//    @RequestMapping(value="way/trans", method = {RequestMethod.POST})
    public String FindTransWay(){
        //테스트용
      /**
      * rt :
      * rt1 :
      * rt2 :
       * rtIds :
      */

        String url="https://map.kakao.com/?map_type=TYPE_MAP&target=car&" + "rt=501139,1109250,495285,1129803&rt1=대법원&rt2=서울시청&rtIds=,8430129";
        return url;
    }

    /**
     * 테스트 중입니다 ^^...
     */
//    @GetMapping("way/trans2")
    @SneakyThrows
    @RequestMapping(value="way/trans2", method = {RequestMethod.POST})
    public String FindTransWay2(String name, Number latitude, Number longitude){ // 도착지, 도착지 위도, 경도만 입력하는 방법
        String encodedName = URLEncoder.encode(name, "UTF-8");
        String url="https://map.kakao.com/link/to/" + encodedName + "," + latitude + "," + longitude;
        System.out.println("url = " + url);
        return url;
    }

    @SneakyThrows
    @RequestMapping(value="way/trans3", method = {RequestMethod.POST})
    public String FindTransWay3(String sName,String eName){ // 출발지, 도착지 이름만 입력하는 방법
        String encodedsName = URLEncoder.encode(sName, "UTF-8");
        String encodedeName = URLEncoder.encode(eName, "UTF-8");
        String url="https://map.kakao.com/?sName=" + encodedsName +"&eName="  + encodedeName ;
        System.out.println("url = " + url);
        return url;
    }


    //테스트용
    @RequestMapping(value="way/trans4", method = {RequestMethod.POST})
    public String FindTransWay4(String sName,String eName){ // 출발지, 도착지 이름만 입력하는 방법

        return wayService.findTransWay(sName, eName);
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
