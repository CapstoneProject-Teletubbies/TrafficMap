package teletubbies.map.bus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@ComponentScan
public class BusController { // 버스노선, 버스 위치 2개
    @Autowired
    private BusServiceImpl busService;

    @GetMapping(value = "/bus/busInfo/{busName}")
//    @RequestMapping(value="/bus/busInfo", method = {RequestMethod.POST})
    public List<BusInfoDto> GetBusInfo(@PathVariable("busName")String busName) {//(String name) { //버스 번호로 버스 정보
        //Object name ="564"; // 버스 번호 테스트
        Object name = (Object)busName;
        return busService.findBusInfoByBusNum(name);
    }

//    @GetMapping(value="/bus/route")
    @RequestMapping(value="/bus/route", method = {RequestMethod.POST})
    public List<BusRouteListDto> GetBusRoute(Integer routeId) { // RouteID로 버스 노선
//        Integer routeId = 165000110; //노선 ID(564번 버스) 테스트
//        Integer routeId = 167465;
        return busService.findBusRouteListByRouteId(routeId);
    }

    @GetMapping(value="/bus/location")
//    @RequestMapping(value="/bus/location", method = {RequestMethod.POST})
    public List<BusLocationDto> GetBusLocation() { //(Integer routeId) { // RouteID로 버스 위치
        Integer routeId = 165000511; //165000055; //165000110; //노선 ID(564번 버스) 테스트
//        Integer routeId = 38492;
        return busService.findBusLocationtByRouteId(routeId);
    }

//    @GetMapping(value="/bus/route/detail")
    @RequestMapping(value="/bus/route/detail", method = {RequestMethod.POST})
    public List<BusRouteDetailDto> GetBusRouteDetail(Integer routeId) { // RouteID로 상세 정보
//        Integer routeId = 165000110; //노선 ID(564번 버스) 테스트
//        Integer routeId = 38492;
        return busService.findBusRouteDetailByRouteId(routeId);

    }

//    @GetMapping(value="/bus/busStop")
    @RequestMapping(value="/bus/busStop", method = {RequestMethod.POST})
    public List<BusStopDto> GetBusStop(String busStopName) {//() { // 버스정류장
//        String busStopName = "신한일전기";
        return busService.findBusStopByBusStopName(busStopName);

    }


}
