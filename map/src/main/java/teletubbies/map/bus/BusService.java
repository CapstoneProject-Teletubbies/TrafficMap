package teletubbies.map.bus;

import org.springframework.http.HttpHeaders;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface BusService {
    Object findBusStopByBusStopName(String name);
    Object findBusArrivalByBusStopId(int bStopId);

    List<BusLocationDto> findBusLocationtByRouteId(int routeId); //RouteID로 버스 위치 조회

    List<BusRouteListDto> findBusRouteListByRouteId(int routeId); //RouteID로 버스 노선 조회
    List<BusInfoDto> findBusInfoByBusNum(Object busNum); //버스 번호로 버스 정보 조회

}
