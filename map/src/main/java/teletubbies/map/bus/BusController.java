package teletubbies.map.bus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@ComponentScan
public class BusController {
    @Autowired
    private BusServiceImpl busService;

    @RequestMapping(value="/bus/busStop", method = {RequestMethod.POST})
    public List<BusStopDto> GetBusStop(String busStopName) { // 버스정류소 명으로 정류장 검색
        return busService.findBusStopByBusStopName(busStopName);
    }

    @RequestMapping(value="/bus/location", method = {RequestMethod.POST})
    public List<BusLocationDto> GetBusLocation(Integer routeId) { // RouteID로 버스 위치
        return busService.findBusLocationtByRouteId(routeId);
    }

    @RequestMapping(value="/bus/route/detail", method = {RequestMethod.POST})
    public List<BusRouteDetailDto> GetBusRouteDetailDtos(Integer routeId) { // RouteID로 상세 정보
        return busService.findBusRouteDetailByRouteId(routeId);
    }

    @RequestMapping(value="/bus/route", method = {RequestMethod.POST})
    public List<BusRouteListDto> GetBusRoute(Integer routeId) { // RouteID로 버스 노선
        return busService.findBusRouteListByRouteId(routeId);
    }

   @RequestMapping(value="/bus/busInfo", method = {RequestMethod.POST})
    public List<BusInfoDto> GetBusInfo(String busName) {//버스 번호로 버스 정보
        return busService.findBusInfoByBusNum(busName);
    }

    @RequestMapping(value="/bus/busArrival", method = {RequestMethod.POST})
    public List<BusArrivalDto> GetBusArrivalList(int busStopId) { // 버스정류장
        return busService.findBusArrivalByBusStopId(busStopId);
    }

}
