package teletubbies.map.bus;

import java.util.List;

public interface BusService {
    List<BusStopDto> findBusStopByBusStopName(String name); //정류소명으로 정류소(ID) 검색
    List<BusLocationDto> findBusLocationtByRouteId(int routeId); //RouteID로 버스 위치 조회
    List<BusRouteDetailDto> findBusRouteDetailByRouteId(int routeId); //RouteID로 버스 상세 정보 조회
    List<BusRouteListDto> findBusRouteListByRouteId(int routeId); //RouteID로 버스 노선 조회
    List<BusInfoDto> findBusInfoByBusNum(Object busNum); //버스 번호로 버스 정보 조회
    List<BusArrivalDto>  findBusArrivalByBusStopId(int bStopId); // 정류소ID로 도착예정인 버스 조회


}
