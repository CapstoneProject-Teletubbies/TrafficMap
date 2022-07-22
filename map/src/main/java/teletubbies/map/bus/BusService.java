package teletubbies.map.bus;

import java.util.List;

public interface BusService {
    Object findBusStopByBusStopName(String name);
    Object findBusArrivalByBusStopId(int bStopId);

    List<BusLocationDto> findBusLocationtByRouteId(int routeId); //RouteID로 버스 위치 조회

    List<BusRouteListDto> findBusRouteListByRouteId(int routeId); //RouteID로 버스 노선 조회
    List<BusInfoDto> findBusInfoByBusNum(Object busNum); //버스 번호로 버스 정보 조회

}
