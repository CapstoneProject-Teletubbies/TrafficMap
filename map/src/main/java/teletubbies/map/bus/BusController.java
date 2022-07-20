package teletubbies.map.bus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BusController { // 버스노선, 버스 위치 2개
    @Autowired
    private BusServiceImpl busService;

    @GetMapping(value = "/bus/busInfo",produces="text/plain;charset=UTF-8")
    public Object GetBusInfo() { //버스 번호로 버스 정보
        Object name = 564; // 버스 번호 테스트
        return busService.findBusInfoByBusNum(name);
    }

    @GetMapping(value="/bus/route")
    public Object GetBusRoute() { // RouteID로 버스 노선
        Integer routeId = 165000110; //노선 ID(564번 버스) 테스트

        return busService.findBusRouteListByRouteId(routeId);
    }

    @GetMapping(value="/bus/location")
    public Object GetBusLocation() { // RouteID로 버스 위치
        Integer routeId = 165000110; //노선 ID(564번 버스) 테스트

        return busService.findBusLocationtByRouteId(routeId);

    }

    /**
     *
     * 나중에 추가
     */
    @GetMapping(value="/busStop")
    public Object GetBusStop() { // 버스정류장

        return null;

    }


}
