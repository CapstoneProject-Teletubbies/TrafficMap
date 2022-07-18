package teletubbies.map.find;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@ComponentScan
public class FindController {

    @Autowired
    private FindServiceImpl findService;

    //(티맵) 명칭(POI) 통합 검색, 엘리베이터 검색을 위한 API 컨트롤러
    @RequestMapping(value="/find/address", method = {RequestMethod.POST})
    public Object FindByAPI(String keyword) {

//        return findService.findElevatorByAPI(address); //엘리베이터 api
        return findService.findAddressByTmapAPI(keyword); //티맵 api
    }
}
