package teletubbies.map.bus;

import org.springframework.http.HttpHeaders;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.io.UnsupportedEncodingException;

public interface BusService {
    Object findBusStopByBusStopName(String name);
    Object findBusArrivalByBusStopId(int bStopId);

    Object findBusLocationtByRouteId(int routeId); //RouteID로 버스 위치 조회

    Object findBusRouteListByRouteId(int routeId); //RouteID로 버스 노선 조회
    Object findBusInfoByBusNum(Object busNum); //버스 번호로 버스 정보 조회

}
