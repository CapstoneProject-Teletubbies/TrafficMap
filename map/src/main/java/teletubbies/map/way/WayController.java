package teletubbies.map.way;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.net.URLEncoder;
import java.util.List;

@RestController
@RequestMapping("/api")
public class WayController {
    @Autowired
    WayServiceImpl wayService;

    @RequestMapping(value="/way", method = {RequestMethod.POST})
    public List<WayDto> FindWay(double startX, double startY, double endX, double endY, String startName, String endName, Number option) {
        return wayService.findWay(startX, startY, endX, endY, startName, endName, option);
    }

    @RequestMapping(value="/way/trans", method = {RequestMethod.POST})
    public String FindTransWay4(String sName,String eName){ // 카카오 대중교통 길찾기 연결 -> 출발지, 도착지 이름 or 주소 입력하는 방법
        return wayService.findTransWay(sName, eName);
    }


}
