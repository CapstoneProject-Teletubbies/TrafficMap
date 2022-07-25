
//package teletubbies.map.way;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import teletubbies.map.subway.SubwayDto;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api")
//public class WayController {
//    @Autowired
//    WayServiceImpl wayService;
//
//    @GetMapping("/way")
//    public String FindWay() { //(String name, double latitude, double langitude)) {
//        double latitude = 37.402056;
//        double langitude = 127.108212;
//        String name = "카카오판교오피스";
//        return wayService.findWay(name, latitude, langitude);
//    }
//}
