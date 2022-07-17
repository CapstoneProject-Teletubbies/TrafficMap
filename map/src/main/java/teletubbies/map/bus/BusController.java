package teletubbies.map.bus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;

@RestController
@RequestMapping("/api")
public class BusController {
    @Autowired
    private BusServiceImpl busService;

    @GetMapping(value = "/bus",produces="text/plain;charset=UTF-8")
    public Object GetBusInfo() {
        // 아직 테스트용
        String busStopName = "부평역"; // 정류소 이름
        Integer bStopId = 166000197; //버스정류소 고유 ID
        Integer routeId = 165000001; //노선 ID

        //출력해보려고 하는 test
        String a = (String) busService.findBusArrivalByBusStopId(bStopId);
        String b = (String) busService.findBusStopByBusStopName(busStopName);
        String c = (String) busService.findBusByRouteId(routeId);
        String d = (String) busService.findBusStopNameByRouteId(routeId);
        return c + d;

    }
}
