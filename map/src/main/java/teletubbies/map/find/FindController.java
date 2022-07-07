package teletubbies.map.find;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api")
@ComponentScan
public class FindController {

    @Autowired
    private FindServiceImpl findService;

    //(티맵) 명칭(POI) 통합 검색, 엘리베이터 검색을 위한 API 컨트롤러
    @GetMapping("/find/address")
    public FindDto FindByAPI() {
        String name = "모다백화점"; //일단 테스트용
        String address = "인천광역시 부평구 부평문화로 35"; //일단 테스트용

        findService.findElevatorByAPI(address); //엘리베이터 api
        findService.findAddressByTmapAPI(name); //티맵 api
        return findService.resultDto();
    }

}
