package teletubbies.map.find;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@ComponentScan
public class FindController {

    @Autowired
    private FindServiceImpl findService;

    //(티맵) 명칭(POI) 통합 검색, 엘리베이터 검색을 위한 API 컨트롤러
    @RequestMapping(value="/find/address", method = {RequestMethod.POST})
    public List<FindDto> FindByAPI(String keyword, double longitude, double latitude) {
        return findService.findAddressByTmapAPI(keyword, longitude, latitude); //티맵 api
    }

    /**
     * 엘리베이터만 있는 컨트롤러 추가
     */
    //    @GetMapping("/find/elevator")
//    @RequestMapping(value="/find/elevator", method = {RequestMethod.POST})
//    public Object ElevatorByAPI(String address) {
//        return findService.findElevatorByAPI(address); //엘리베이터 api
//    }


    //데이터가 무려 1996개!
    @RequestMapping(value="/find/stair", method = {RequestMethod.POST})
    public List<StairDto> StairByAPI() { //계단 api
        return findService.findStairs();
    }

    // 데이터 개수 167개
    @RequestMapping(value="/find/incheonElevator", method = {RequestMethod.POST})
    public List<ElevatorDto> ElavatorsByAPI() { // 엘리베이터 위치 가져올 엘리베이터 api
        return findService.findElevators();
    }

    @RequestMapping(value="/find/reverseGeo", method = {RequestMethod.POST})
    public String reverseGeocoding(String lat, String lon) { // 엘리베이터 위치 가져올 엘리베이터 api
        return findService.tMapReverseGeoCoding(lat, lon);
    }
}
